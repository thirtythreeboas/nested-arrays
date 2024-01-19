import {IForm} from '@/models/interfaces';

export const generateUniqueId = (form: IForm): number => {
  // const id = new Date().getTime();
  const id = Math.floor(Math.random() * 1000);
  const isIdUnique = form.groups.some((group) => {
    if (group.id === id) return true;
    group.subGroups.some((subGroup) => {
      if (subGroup.id === id) return true;
      subGroup.products.some((product) => {
        if (product.id === id) return true;
      });
    });
  });
  if (!isIdUnique) {
    generateUniqueId(form);
  } else {
    return id;
  }
};
