import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backendURL from "../../api";
import ViewOrderMenu from "../account/ViewOrderMenu";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import ArrowRight from "../../assets/Images/icons/arrow-right.svg";

interface Order {
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
  total: number;
}

interface MobilrOrdersMenuProps {
  handleBack: () => void;
  setIsLoading: (value: boolean) => void;
}

const MobileOrdersMenu: React.FC<MobilrOrdersMenuProps> = ({
  handleBack,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = useState(false);
  const [orders, setOrders] = useState<Array<Order>>();
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  useEffect(() => {
    setIsLoading(true);
    getOrders();
  }, []);

  const getOrders = async () => {
    const res = await fetch(`${backendURL}/api/v1/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

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
    <div className="mobileordersmenu">
      {viewDetails ? (
        <ViewOrderMenu
          handleViewDetail={handleViewDetails}
          order={selectedOrder}
        />
      ) : (
        <>
          <div className="mobileprofilemenu__header">
            <button onClick={handleBack}>
              <img src={backbtn} alt="back" />
            </button>
            <h1>All orders</h1>
          </div>

          <div className="mobileordersmenu__body">
            {orders ? (
              Object.values(orders).map((order) => (
                <form
                  className="mobileordersmenu__order"
                  key={order.userId}
                  onSubmit={() => passOrder(order)}
                >
                  <div className="mobileordersmenu__order__content">
                    <div className="mobileordersmenu__order__content__left">
                      <div className="mobileordersmenu__order__header">
                        <h2>Order No. {order.orderId}</h2>
                        <h3 className={`${order.orderStatus}`}>
                          {order.orderStatus}
                        </h3>
                      </div>

                      <div className="mobileordersmenu__order__body">
                        <div className="mobileordersmenu__order__body__left">
                          <div className="mobileordersmenu__order__item">
                            {Object.values(order.items).map(
                              ({ productId, name }) => (
                                <p key={productId}>{name}</p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mobileordersmenu__order__content__right">
                      <div>
                        <button type="submit">
                          <img src={ArrowRight} alt="view" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ))
            ) : (
              <div className="mobileordersmenu__empty">
                <img src="emptylogo" alt="" />

                <div>
                  <h1>You have not placed an order with us yet</h1>
                  <p>
                    Find information and view progress on all your orders here
                  </p>
                </div>

                <button onClick={() => navigate("/")}>
                  <span>
                    <img src="shopicon" alt="" />
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

export default MobileOrdersMenu;
