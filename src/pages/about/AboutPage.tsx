import React from "react";
import "./About.scss";

const icons = [
  {
    icon: "icon1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: "icon2",
    text: "",
  },
];

const aboutimages = [
  {
    image: "image1",
    name: "Samuel Sangotayo",
    position: "CEO",
  },
  {
    image: "image2",
    name: "Samuel Sangotayo",
    position: "CEO",
  },
  {
    image: "image3",
    name: "Samuel Sangotayo",
    position: "CEO",
  },
];

export const AboutPage = () => {
  return (
    <div className="aboutpage">
      <div className="aboutpage__header">
        <p>
          We are a retailing and warehousing brand established to satsify
          thirsty costumers
        </p>
      </div>

      <div className="aboutpage__hero">
        <img src="heroimage" alt="heroimage" />
      </div>

      <div className="aboutpage__body">
        <div className="aboutpage__body__left">
          <h1>Congue senectus sit arcu viverra. Aliquam vulputate.</h1>
          <p>
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

        <div className="aboutpage__body__bottom">
          <h1>Our Mission</h1>
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
