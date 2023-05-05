import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewOrderMenu from "./ViewOrderMenu";
import "./AccountPage.scss";
import NoOrder from "../../assets/Images/icons/NoOrderIcon.svg";
import shoppingcart from "../../assets/Images/icons/shopping-cart-white.svg";

interface Order {
  userId: string;
  orderId: string;
  orderStatus: string;
  address: string;
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
  total: number;
}

interface MenuProps {
  setIsLoading: (value: boolean) => void;
}

const OrdersMenu: React.FC<MenuProps> = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = useState(false);
  const [orders, setOrders] = useState<Array<Order>>();
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  useEffect(() => {
    setIsLoading(true);
    getOrders();
  }, []);

  const getOrders = async () => {
    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/orders/`,
      // `http://localhost:3000/api/v1/orders/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setOrders(data.data);
    }

    setIsLoading(false);
  };

  const handleViewDetails = () => {
    setViewDetails(!viewDetails);
  };

  const passOrder = (order: Order) => {
    setSelectedOrder(order);
    handleViewDetails();
  };

  return (
    <div className="ordersmenu">
      {viewDetails ? (
        <ViewOrderMenu
          handleViewDetail={handleViewDetails}
          order={selectedOrder}
        />
      ) : (
        <>
          <div className="ordersmenu__header">
            <h1>All Orders</h1>
          </div>

          <div className="ordersmenu__body">
            {orders ? (
              orders.map((order) => (
                <form
                  className="ordersmenu__order"
                  key={order.userId}
                  onSubmit={() => passOrder(order)}
                >
                  <div className="ordersmenu__order__content">
                    <div className="ordersmenu__order__content__left">
                      <div className="ordersmenu__order__header">
                        <h2>Order No. {order.orderId}</h2>
                        <h3 className={`${order.orderStatus}`}>
                          {order.orderStatus}
                        </h3>
                      </div>

                      <div className="ordersmenu__order__body">
                        <div className="ordersmenu__order__body__left">
                          <div className="ordersmenu__order__item">
                            {order.items.map(({ productId, name }) => (
                              <p key={productId}>{name}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ordersmenu__order__content__right">
                      <div>
                        <button type="submit">View Details</button>
                      </div>
                    </div>
                  </div>
                </form>
              ))
            ) : (
              <div className="ordersmenu__empty">
                <img src={NoOrder} alt="no order icon" />

                <div className="ordersmenu__empty__content">
                  <h1>You have not placed an order with us yet</h1>
                  <p>
                    Find information and view progress on all your orders here
                  </p>
                </div>

                <button onClick={() => navigate("/")}>
                  <span>
                    <img src={shoppingcart} alt="shopping cart" />
                  </span>
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersMenu;
