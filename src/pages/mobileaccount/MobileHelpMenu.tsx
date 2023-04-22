import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import "./MobileAccountPage.scss";

interface MobileHelpMenuProps {
  handleBack: () => void;
}

const MobileHelpMenu: React.FC<MobileHelpMenuProps> = ({ handleBack }) => {
  const [messages] = useState("");

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div className="mobilehelpmenu">
      <div className="mobilehelpmenu_header">
        <button onClick={handleBack}>BACK</button>
        <span>Chat Support</span>
      </div>

      <div className="mobilehelpmenu_body">
        <div className="mobilehelpmenu_body__chat">
          {/* MESSAGES GO HERE */}
        </div>

        <div className="mobilehelpmenu_body__input">
          <div className="mobilehelpmenu_body__input___field">
            <InputFields
              type="string"
              placeholder="What can we help you with"
            />
          </div>

          <button onSubmit={() => handleSendMessage(messages)}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHelpMenu;
