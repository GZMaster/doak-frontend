import { IOrder } from "./order";

export interface IDeliveryTab {
  handleTabClick: (key: number) => void;
  setSelectedDelivery: (delivery: IDelivery) => void;
}

export interface ISummaryTab {
  handleTabClick: (key: number) => void;
  setCreatedOrder: (order: IOrder) => void;
  selectedDelivery?: IDelivery;
}

export interface IPaymentTab {
  createdOrder?: IOrder;
}

export interface IAddress {
  userId?: string;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  state: string;
  country: string;
  zipCode?: string;
  _id: string;
}

export interface IDelivery {
  type: string;
  text: string;
  id: number;
  price: number;
}
