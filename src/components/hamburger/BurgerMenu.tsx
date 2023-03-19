import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import "./BurgerMenu.scss";

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        direction="right"
        duration={0.8}
        color="#FF8900"
      />

      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul>
          <li>hello</li>
          <li>h</li>
          <li>k</li>
          <li>h</li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default BurgerMenu;
