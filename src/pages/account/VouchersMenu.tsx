import React from "react";
import "./AccountPage.scss";
import copy from "../../assets/Images/icons/copy.svg";

const voucher = [
  {
    id: 1,
    name: "20% OFF all orders over N56,000",
    code: "Code: wan365xy",
    valid: "Valid: 10/25/2021 - 10/24/23",
  },
  {
    id: 2,
    name: "20% OFF all orders over N56,000",
    code: "Code: wan365xy",
    valid: "Valid: 10/25/2021 - 10/24/23",
  },
  {
    id: 3,
    name: "20% OFF all orders over N56,000",
    code: "Code: wan365xy",
    valid: "Valid: 10/25/2021 - 10/24/23",
  },
  {
    id: 4,
    name: "20% OFF all orders over N56,000",
    code: "Code: wan365xy",
    valid: "Valid: 10/25/2021 - 10/24/23",
  },
];

const VouchersMenu = () => {
  return (
    <div className="vouchersmenu">
      <div className="vouchersmenu_header">
        <h1>Vouchers</h1>
      </div>

      <div className="vouchersmenu_body">
        {voucher.map((voucher) => (
          <div className="vouchersmenu_body_voucher" key={voucher.id}>
            <div className="vouchersmenu_body_voucher_details">
              <h4>{voucher.name}</h4>
              <p>{voucher.code}</p>
              <p>{voucher.valid}</p>
            </div>

            <div className="vouchersmenu_body_voucher_actions">
              <img src={copy} alt="" />
              Copy Code
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VouchersMenu;
