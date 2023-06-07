import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import "./AccountPage.scss";
import "./HelpMenu.scss";

const HelpMenu = () => {
  const [messages] = useState("");

  const handleSendMessage = (message: string) => {
    return message;
  };

  return (
    <div className="helpmenu">
      <div className="helpmenu_header">
        <span>Chat Support</span>
      </div>

      <div className="helpmenu_body">
        <div className="helpmenu_body__chat">{/* MESSAGES GO HERE */}</div>

        <div className="helpmenu_body__input">
          <div className="helpmenu_body__input___field">
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

export default HelpMenu;
