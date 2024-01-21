import {IForm, IGroup, IProductSum} from '@/models/interfaces';

export const calculateTotalSum = (groups: IGroup[], action: IProductSum | null = null): IForm => {
  const productResult: IGroup[] = !action ? groups : groups.map((group) => ({
    ...group,
    subGroups: group.subGroups.map((subGroup) => ({
      ...subGroup,
      products: subGroup.products.map((product) => {
        if (action && product.id === action.id) {
          const field = action.type === 'count' ? 'count' : 'price';
          const argument = action.type === 'count' ? 'price' : 'count';
          return {
            ...product,
            [field]: action.value,
            sum: action.value * product[argument],
          };
        }
        return product;
      }),
    })),
  }));
  const subGroupResult: IGroup[] = productResult.map((group) => ({
    ...group,
    subGroups: group.subGroups.map((subGroup) => {
      const sum = subGroup.products.reduce((a, b) => a + b.sum, 0);
      subGroup.sum = sum;
      return subGroup;
    }),
  }));
  const groupResult: IGroup[] = subGroupResult.map((group) => {
    const sum = group.subGroups.reduce((a, b) => a + b.sum, 0);
    group.sum = sum;
    return group;
  });
  const formResult: number = groupResult.reduce((a, b) => a + b.sum, 0)

  return {groups: groupResult, sum: formResult};
};
