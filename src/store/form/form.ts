import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '@/const';
import {IForm, IFormState, IProductSum} from '@/models/interfaces';
import {data} from '@/mock/data';
import {calculateTotalSum} from '@/utils/calculateTotalSum';

const initialState: IFormState = {
  sum: 486,
  groups: data,
  isSubmitted: false,
  hasUnsubmittedData: true,
};

export const form = createSlice({
  name: NameSpace.FORM,
  initialState,
  reducers: {
    deleteGroup: (state, action: PayloadAction<number | string>) => {
      const handleGroupDelete = state.groups.filter(
        (group) => group.id !== action.payload,
      );
      const result = calculateTotalSum(handleGroupDelete);
      return {
        ...state,
        groups: result.groups,
        sum: result.sum,
      };
    },
    deleteSubGroup: (state, action: PayloadAction<number | string>) => {
      const handleSubGroupDelete = state.groups.map((group) => ({
        ...group,
        subGroups: group.subGroups.filter(
          (subGroup) => subGroup.id !== action.payload,
        ),
      }));
      const result = calculateTotalSum(handleSubGroupDelete);
      return {
        ...state,
        groups: result.groups,
        sum: result.sum,
      };
    },
    deleteProduct: (state, action: PayloadAction<number | string>) => {
      const handleProductDelete = state.groups.map((group) => ({
        ...group,
        subGroups: group.subGroups.map((subGroup) => ({
          ...subGroup,
          products: subGroup.products.filter(
            (product) => product.id !== action.payload,
          ),
        })),
      }));
      const result = calculateTotalSum(handleProductDelete);
      return {
        ...state,
        groups: result.groups,
        sum: result.sum,
      };
    },
    addGroup: (state) => {
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            id: new Date().getTime(),
            sum: 0,
            subGroups: [],
          },
        ],
      };
    },
    addSubGroup: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload) {
            return {
              ...group,
              subGroups: [
                ...group.subGroups,
                {
                  id: new Date().getTime(),
                  sum: 0,
                  products: [],
                },
              ],
            };
          }
          return group;
        }),
      };
    },
    addProduct: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          subGroups: group.subGroups.map((subGroup) => {
            if (subGroup.id === action.payload) {
              return {
                ...subGroup,
                products: [
                  ...subGroup.products,
                  {
                    id: new Date().getTime(),
                    name: `Продукт ${subGroup.products.length + 1}`,
                    sum: 0,
                    count: 0,
                    price: 0,
                  },
                ],
              };
            }
            return subGroup;
          }),
        })),
      };
    },
    setCount: (state, action: PayloadAction<IProductSum>) => {
      const calcSumResult = calculateTotalSum(state.groups, action.payload);
      return {
        ...state,
        groups: calcSumResult.groups,
        sum: calcSumResult.sum,
      };
    },
    handleSubmissionState: (state) => {
      return {
        ...state,
        isSubmitted: !state.isSubmitted,
      };
    },
    setLocalStorage: (state) => {
      if (state.isSubmitted) {
        localStorage.removeItem('form');
      } else {
        const formData = btoa(
          encodeURIComponent(
            JSON.stringify({groups: state.groups, sum: state.sum}),
          ),
        );
        localStorage.setItem('form', formData);
      }
    },
    restoreUnsubmittedValue: (state) => {
      const hasFormValue = localStorage.getItem('form');
      if (hasFormValue) {
        const decodedValue = decodeURIComponent(atob(hasFormValue));
        const {groups, sum} = JSON.parse(decodedValue) as IForm;
        return {
          ...state,
          groups,
          sum,
        };
      }
    },
  },
});

export const {
  deleteGroup,
  deleteSubGroup,
  deleteProduct,
  addGroup,
  addSubGroup,
  addProduct,
  setCount,
  handleSubmissionState,
  setLocalStorage,
  restoreUnsubmittedValue,
} = form.actions;

export default form.reducer;
