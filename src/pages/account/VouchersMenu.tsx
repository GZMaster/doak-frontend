import React from "react";
import "./AccountPage.scss";

const voucher = [
  {
    id: 1,
    name: "Voucher 1",
    code: "Voucher1",
    valid: "2021-01-01",
  },
  {
    id: 2,
    name: "Voucher 2",
    code: "Voucher2",
    valid: "2021-01-01",
  },
  {
    id: 3,
    name: "Voucher 3",
    code: "Voucher3",
    valid: "2021-01-01",
  },
  {
    id: 4,
    name: "Voucher 4",
    code: "Voucher4",
    valid: "2021-01-01",
  },
];

const VouchersMenu = () => {
  return (
    <div className="vouchersmenu">
      <div className="vouchersmenu_header">
        <h2>Vouchers</h2>
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
              <button>
                <span>copylogo</span> Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VouchersMenu;
