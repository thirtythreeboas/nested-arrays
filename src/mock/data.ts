import {IGroup} from '@/models/interfaces';

export const data: IGroup[] = [
  {
    id: 2,
    sum: 486,
    subGroups: [
      {
        id: 3,
        sum: 162,
        products: [
          {
            id: 4,
            name: 'Продукт 1',
            sum: 72,
            count: 8,
            price: 9,
          },
          {
            id: 5,
            name: 'Продукт 2',
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
            name: 'Продукт 1',
            sum: 25,
            count: 5,
            price: 5,
          },
          {
            id: 8,
            name: 'Продукт 2',
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
            name: 'Продукт 1',
            sum: 126,
            count: 7,
            price: 18,
          },
          {
            id: 11,
            name: 'Продукт 2',
            sum: 152,
            count: 8,
            price: 19,
          },
        ],
      },
    ],
  },
];
