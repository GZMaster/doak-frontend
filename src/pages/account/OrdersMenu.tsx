import React, { useState } from "react";
import ViewOrderMenu from "./ViewOrderMenu";
import "./AccountPage.scss";
import orderimg1 from "../../assets/Images/others/orderimg1.png";

const orders = [
  {
    id: 1,
    status: "Cancelled_by_self",
    images: [
      "https://images.unsplash.com/photo-1610398000004-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1610398000004-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1610398000004-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    items: [{ name: "item 1" }, { name: "item 2" }, { name: "item 3" }],
  },
  {
    id: 2,
    status: "Delivered",
    images: [
      "https://images.unsplash.com/photo-1610398000004-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    items: [{ name: "item 1" }],
  },
];

const OrdersMenu = () => {
  const [viewDetails, setViewDetails] = useState(false);

  const handleViewDetails = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div className="ordersmenu">
      {viewDetails ? (
        <ViewOrderMenu handleViewDetail={handleViewDetails} />
      ) : (
        <>
          <div className="ordersmenu__header">
            <h1>All Orders</h1>
          </div>

          <div className="ordersmenu__body">
            {orders.length !== 0 ? (
              orders.map((order) => (
                <div className="ordersmenu__order" key={order.id}>
                  <div className="ordersmenu__order__content">
                    <div className="ordersmenu__order__content__left">
                      <div className="ordersmenu__order__header">
                        <h2>Order No. {order.id}</h2>
                        <h3 className={`${order.status}`}>
                          {order.status.split("_").join(" ")}
                        </h3>
                      </div>

                      <div className="ordersmenu__order__body">
                        <div className="ordersmenu__order__body__left">
                          <div className="ordersmenu__order__images">
                            {order.images.map((image) => (
                              <img
                                src={orderimg1}
                                alt="order image"
                                key={order.id}
                              />
                            ))}
                          </div>

                          <div className="ordersmenu__order__item">
                            {order.items.map(({ name }) => (
                              <p key={order.id}>{name}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ordersmenu__order__content__right">
                      <div>
                        <button
                        // onClick={handleViewDetails}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="ordersmenu__empty">
                <img src="emptylogo" alt="" />

                <div>
                  <h1>You have not placed an order with us yet</h1>
                  <p>
                    Find information and view progress on all your orders here
                  </p>
                </div>

                <button>
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

export default OrdersMenu;
