/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableColumn {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'center' | 'right';
  field: (row: any) => any;
  format?: (val: string) => string;
  sortable?: boolean;
  sort?: (a: string, b: string) => number;
}

export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}
