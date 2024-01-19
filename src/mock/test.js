export const data = {
  id: 1,
  sum: 1,
  groups: [
    {
      id: 2,
      sum: 208,
      subGroups: [
        {
          id: 3,
          sum: 162,
          products: [
            {
              id: 4,
              name: 'Product1',
              sum: 72,
              count: 8,
              price: 9,
            },
            {
              id: 5,
              name: 'Product2',
              sum: 90,
              count: 9,
              price: 10,
            },
          ],
        },
        {
          id: 6,
          sum: 46,
          products: [
            {
              id: 7,
              name: 'Product5',
              sum: 25,
              count: 5,
              price: 5,
            },
            {
              id: 8,
              name: 'Product6',
              sum: 21,
              count: 7,
              price: 3,
            },
          ],
        },
        {
          id: 9,
          sum: 278,
          products: [
            {
              id: 10,
              name: 'Product3',
              sum: 126,
              count: 7,
              price: 18,
            },
            {
              id: 11,
              name: 'Product4',
              sum: 152,
              count: 8,
              price: 19,
            },
          ],
        },
      ],
    },
  ],
};

const generateUniqueId = (form) => {
  // const id = new Date().getTime();
  // const id = new Date().getTime();
  const id = Math.floor(Math.random() * 12);
  const notUnique = form.groups.some((group) => {
    console.log('groups', group.id === id, id);
    if (group.id === id) return true;
    group.subGroups.some((subGroup) => {
      console.log('sub groups', subGroup.id === id, id);
      if (subGroup.id === id) return true;
      subGroup.products.some((product) => {
        console.log('products', product.id === id, id);
        if (product.id === id) return true;
      });
    });
  });
  if (notUnique) {
    console.log('runs again!')
    generateUniqueId(data);
  } else {
    return id;
  }
};

console.log(generateUniqueId(data));
