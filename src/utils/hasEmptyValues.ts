import {IGroup} from '@/models/interfaces';

export const hasEmptyValues = (groups: IGroup[]): boolean => {
  for (const group of groups) {
    for (const subGroup of group.subGroups) {
      for (const product of subGroup.products) {
        if (product.count === 0 || product.price === 0) {
          return false;
        }
      }
    }
  }
  return true;
};
