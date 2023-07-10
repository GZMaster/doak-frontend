export interface IOrder {
  _id: string;
  userId: string;
  orderId: string;
  orderStatus: string;
  contact: {
    address: {
      name: string;
      email: string;
      address: string;
      city: string;
      phoneNumber: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
  items: [
    {
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }
  ];
  date: Date;
  subtotal: number;
  deliveryFee: number;
  deliveryMethod: string;
  total: number;
}
