import React from "react";
import "./AboutPage.scss";
import people from "../../assets/Images/others/people.png";
import crown from "../../assets/Images/icons/crown.svg";
import nigeria from "../../assets/Images/icons/nigeria.svg";
import house from "../../assets/Images/icons/house.svg";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";

const icons = [
  {
    icon: house,
    text: "Doorstep deliveries at the speed of light",
  },
  {
    icon: crown,
    text: "Premium quality drinks at the most affordable prices",
  },
  {
    icon: nigeria,
    text: "One of the top beverage establishments in Nigeria",
  },
];

export const AboutPage = () => {
  const isPageWide = UseMediaQuery("(min-width: 700px)")
  const isPageSmall = UseMediaQuery("(max-width: 500px)")
  return (
    <div className="aboutpage">
      <div className="aboutpage__header">
        <p>
          Discover a world of liquid treasures with DOAK. A retail and
          warehousing brand dedicated to satisfy your every drink desire.
        </p>
      </div>

      {isPageWide && (
        <div className="aboutpage__hero">
        <img src={people} alt="people discussing" />
      </div>
      )}

      <div className="aboutpage__body">
        <div className="aboutpage__body__left">
          <h1>Drinks of all kinds. At the palm of your hands.</h1>

          {isPageSmall && (
            <div className="mobile__hero">
               </div>
            
          )}
          <p className="second_text">
            Welcome to DOAK LTD, your ultimate destination for all things
            drinks! We are a retailing and warehousing brand that was founded in
            2023 with a simple yet ambitious mission: to make every kind of
            drink accessible and affordable to all.
          </p>

     
          <p>
            Whether you are a connoisseur, an adventurer, or simply someone who
            loves a good beverage, we are here to provide you with a vast
            selection of drinks at unbeatable prices. Come discover a world of
            taste and refreshment with DOAK LTD.
          </p>
          <p>
            Visit our exclusive VIP lounge, located in the bustling Samonda area
            of Ibadan. Our VIP lounge is the perfect place to indulge in the
            ultimate drinks and relaxation experience. Whether you are looking
            to unwind after a long day, or you want to celebrate a special
            occasion with friends, our VIP lounge provides an ambiance and
            experience that is unmatched.
          </p>
        </div>
        <div className="aboutpage__body__right">
          {icons.map((data) => {
            return (
              <div className="aboutpage__icon" key={data.icon}>
                <img src={data.icon} alt="" />
                <p>{data.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
