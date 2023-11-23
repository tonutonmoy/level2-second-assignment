export interface IOrder {
  productName: {
    type: string;
    required: true;
  };
  price: {
    type: number;
    required: true;
  };
  quantity: {
    type: number;
    required: true;
  };
}
