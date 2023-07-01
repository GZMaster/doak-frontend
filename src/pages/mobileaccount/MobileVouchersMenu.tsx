import React, { useEffect, useState } from "react";
import backendURL from "../../api";
import "./MobileAccountPage.scss";
import copy from "../../assets/Images/icons/copy.svg";
import backbtn from "../../assets/Images/icons/backbtn.svg";

// const voucher = [
//   {
//     id: 1,
//     name: "20% OFF all orders over N56,000",
//     code: "Code: wan365xy",
//     valid: "Valid: 10/25/2021 - 10/24/23",
//   },
//   {
//     id: 2,
//     name: "20% OFF all orders over N56,000",
//     code: "Code: wan365xy",
//     valid: "Valid: 10/25/2021 - 10/24/23",
//   },
//   {
//     id: 3,
//     name: "20% OFF all orders over N56,000",
//     code: "Code: wan365xy",
//     valid: "Valid: 10/25/2021 - 10/24/23",
//   },
//   {
//     id: 4,
//     name: "20% OFF all orders over N56,000",
//     code: "Code: wan365xy",
//     valid: "Valid: 10/25/2021 - 10/24/23",
//   },
// ];

interface MobileVouchersMenuProps {
  handleBack: () => void;
  setIsLoading?: (value: boolean) => void;
}

interface voucherProps {
  id: number;
  name: string;
  code: string;
  valid: string;
}

const MobileVouchersMenu: React.FC<MobileVouchersMenuProps> = ({
  handleBack,
}) => {
  const [voucher, setVoucher] = useState<voucherProps[]>([]);

  useEffect(() => {
    getVouchers();
  }, []);

  const getVouchers = async () => {
    const res = await fetch(`${backendURL}/api/v1/vouchers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.status === "success") {
      setVoucher(data.data.vouchers);
    }
  };

  return (
    <div className="mobilevouchersmenu">
      <div className="mobilevouchersmenu_header">
        <button onClick={handleBack}>
          <img src={backbtn} alt="back" />
        </button>
        <h1>Vouchers</h1>
      </div>

      <div className="mobilevouchersmenu_body">
        {voucher &&
          voucher.map((voucher) => (
            <div className="mobilevouchersmenu_body_voucher" key={voucher.id}>
              <div className="mobilevouchersmenu_body_voucher_details">
                <h4>{voucher.name}</h4>
                <p>{voucher.code}</p>
                <p>{voucher.valid}</p>
              </div>

              <div className="mobilevouchersmenu_body_voucher_actions">
                <img src={copy} alt="" />
                Copy Code
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MobileVouchersMenu;
