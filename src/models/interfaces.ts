export interface IProduct {
  id: string | number;
  name: string;
  sum: number;
  count: number;
  price: number;
}

export interface ISubGroup {
  id: string | number;
  sum: number;
  products: IProduct[];
}

export interface IGroup {
  id: string | number;
  sum: number;
  subGroups: ISubGroup[];
}

export interface IForm {
  sum: number;
  groups: IGroup[];
}

export interface IProductSum {
  type: string;
  id: string | number;
  value: number;
}
