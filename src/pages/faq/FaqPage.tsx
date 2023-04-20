import React from "react";
import "./FaqPage.scss";
import { useState } from "react";
import faqbg from "../../assets/Images/others/faqbg.png";
import openbt from "../../assets/Images/others/openbt.png";
import closebt from "../../assets/Images/others/closebt.png";

const faq = [
  {
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem ipsum dolor sit amet.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(-1); // initialize state for the index of the open question

  return (
    <div className="faqpage">
      <div className="faqpage__header">
        <img src={faqbg} alt="faq page background" />
      </div>
      <div className="faqpage__body">
        <div className="faqpage__body__items">
          {faq.map((item, index) => (
            <div className="faqpage__body__item" key={index}>
              <div className="faqpage__body__item__question">
                <h1>{item.question}</h1>
                <button
                  className="faqpage__body__item__question__button"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <img
                    src={openIndex === index ? closebt : openbt}
                    alt="open and close button"
                  />
                </button>
              </div>
              {openIndex === index && (
                <div className="faqpage__body__item__answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
