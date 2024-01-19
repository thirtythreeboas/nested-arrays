import {IGroup, IProductSum} from '@/models/interfaces';

interface sumProps {
  groups: IGroup[];
  action: IProductSum;
}

export const calculateTotalSum = (data: sumProps) => {
  const productResult: IGroup[] = data.groups.map((group) => ({
    ...group,
    subGroups: group.subGroups.map((subGroup) => ({
      ...subGroup,
      products: subGroup.products.map((product) => {
        if (product.id === data.action.id) {
          const field = data.action.type === 'count' ? 'count' : 'price';
          const argument = data.action.type === 'count' ? 'price' : 'count';
          return {
            ...product,
            [field]: data.action.value,
            sum: data.action.value * product[argument],
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

  return groupResult;
};
