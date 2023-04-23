import React, { useState } from "react";
import ViewOrderMenu from "../account/ViewOrderMenu";
import "./MobileAccountPage.scss";
import orderimg1 from "../../assets/Images/others/orderimg1.png";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import ArrowRight from "../../assets/Images/icons/arrow-right.svg";

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

interface MobilrOrdersMenuProps {
  handleBack: () => void;
}

const MobileOrdersMenu: React.FC<MobilrOrdersMenuProps> = ({ handleBack }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const handleViewDetails = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div className="mobileordersmenu">
      {viewDetails ? (
        <ViewOrderMenu handleViewDetail={handleViewDetails} />
      ) : (
        <>
          <div className="mobileprofilemenu__header">
            <button onClick={handleBack}>
              <img src={backbtn} alt="back" />
            </button>
            <h1>All orders</h1>
          </div>

          <div className="mobileordersmenu__body">
            {orders.length !== 0 ? (
              orders.map((order) => (
                <div className="mobileordersmenu__order" key={order.id}>
                  <div className="mobileordersmenu__order__content">
                    <div className="mobileordersmenu__order__content__left">
                      <div className="mobileordersmenu__order__header">
                        <h2>Order No. {order.id}</h2>
                        <h3 className={`${order.status}`}>
                          {order.status.split("_").join(" ")}
                        </h3>
                      </div>

                      <div className="mobileordersmenu__order__body">
                        <div className="mobileordersmenu__order__body__left">
                          <div className="mobileordersmenu__order__images">
                            {order.images.map(() => (
                              <img
                                src={orderimg1}
                                alt="order image"
                                key={order.id}
                              />
                            ))}
                          </div>

                          <div className="mobileordersmenu__order__item">
                            {order.items.map(({ name }) => (
                              <p key={order.id}>{name}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mobileordersmenu__order__content__right">
                      <div>
                        <button
                        // onClick={handleViewDetails}
                        >
                          <img src={ArrowRight} alt="view" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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

export default MobileOrdersMenu;
