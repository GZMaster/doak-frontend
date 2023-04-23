import React from "react";
import "./AboutPage.scss";
import people from "../../assets/Images/others/people.png";
import samuel from "../../assets/Images/others/samuel.png";
import chidiebere from "../../assets/Images/others/chidiebere.png";
import faith from "../../assets/Images/others/faith.png";
import lilian from "../../assets/Images/others/lilian.png";
import crown from "../../assets/Images/icons/crown.svg";
import nigeria from "../../assets/Images/icons/nigeria.svg";
import house from "../../assets/Images/icons/house.svg";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";

const icons = [
  {
    icon: house,
    text: "Cursus aliquam sit cras et. Tellus dapibus massa ullamcorper justo",
  },
  {
    icon: crown,
    text: "Cursus aliquam sit cras et. Tellus dapibus massa ullamcorper justo",
  },
  {
    icon: nigeria,
    text: "Cursus aliquam sit cras et. Tellus dapibus massa ullamcorper justo",
  },
];

const aboutimages = [
  {
    image: samuel,
    name: "Samuel Sangotayo",
    position: "Managing Director",
  },
  {
    image: lilian,
    name: "Lilian Obere",
    position: "Financial Manager",
  },
  {
    image: chidiebere,
    name: "Chidiebere Nwanuku",
    position: "Account ManagerAccount Manager",
  },
  {
    image: faith,
    name: "Faith Eneghalu",
    position: "Product Manager",
  },
];

export const AboutPage = () => {
  const isPageWide = UseMediaQuery("(min-width: 700px)")
  const isPageSmall = UseMediaQuery("(max-width: 500px)")
  return (
    <div className="aboutpage">
      <div className="aboutpage__header">
        <p>
          We are a retailing and warehousing brand established to satsify
          thirsty costumers
        </p>
      </div>

      {isPageWide && (
        <div className="aboutpage__hero">
        <img src={people} alt="people discussing" />
      </div>
      )}

      <div className="aboutpage__body">
        <div className="aboutpage__body__left">
          <h1>Congue senectus sit arcu viverra. Aliquam vulputate.</h1>

          {isPageSmall && (
            <div className="mobile__hero">
               </div>
            
          )}
          <p className="second_text">
            Cursus aliquam sit cras et. Tellus dapibus massa ullamcorper justo
            pharetra feugiat. Gravida pulvinar arcu cras et egestas non euismod.
            In in tortor porta sed pellentesque.
          </p>

     
          <p>
            Urna ac elit habitasse sagittis tellus tincidunt hac quis. Est
            parturient pellentesque aliquam ultrices sagittis massa. A nibh amet
            consectetur scelerisque justo. Vivamus mauris tellus amet odio felis
            aliquam.
          </p>
          <p>
            Urna ac elit habitasse sagittis tellus tincidunt hac quis. Est
            parturient pellentesque aliquam ultrices sagittis massa.
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
      <div className="aboutpage__body__bottom">
        <h1>Meet the the team/ Board of Directors</h1>
        <div className="aboutpage__us">
          {aboutimages.map((data) => {
            return (
              <div className="aboutpage__image" key={data.image}>
                <img src={data.image} alt="" />
                <h2>{data.name}</h2>
                <p>{data.position}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
