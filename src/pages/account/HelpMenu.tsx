import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import "./AccountPage.scss";
import "./HelpMenu.scss"

const HelpMenu = () => {
  const [messages] = useState("");

  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div className="helpmenu">
      <div className="helpmenu_header">
        <h2>Chat Support</h2>
      </div>

      <div className="helpmenu_body">
        <div className="helpmenu_body__chat">{/* MESSAGES GO HERE */}</div>

        <div className="helpmenu_body__input">
          <InputFields type="string" label="What can we help you with" />

          <button onSubmit={() => handleSendMessage(messages)}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpMenu;
