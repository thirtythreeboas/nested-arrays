import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '@/const';
import {IForm, IProductSum} from '@/models/interfaces';
import {data} from '@/mock/data';
import {calculateTotalSum} from '@/utils/calculateTotalSum';

const initialState: IForm = {
  sum: 0,
  groups: data,
};

export const form = createSlice({
  name: NameSpace.FORM,
  initialState,
  reducers: {
    deleteGroup: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload),
        // ...state,
        // form: {
        //   ...state.form,
        //   groups: state.form.groups.filter(
        //     (group) => group.id !== action.payload,
        //   ),
        // },
      };
    },
    deleteSubGroup: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          subGroups: group.subGroups.filter(
            (subGroup) => subGroup.id !== action.payload,
          ),
        })),
      };
    },
    deleteProduct: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          subGroups: group.subGroups.map((subGroup) => ({
            ...subGroup,
            products: subGroup.products.filter(
              (product) => product.id !== action.payload,
            ),
          })),
        })),
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
      const groupsTotalSum = calculateTotalSum({groups: state.groups, action: action.payload});
      return {
        ...state,
        groups: groupsTotalSum,
      };
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
} = form.actions;

export default form.reducer;
