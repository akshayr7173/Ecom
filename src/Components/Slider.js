import React, { useState, useEffect } from "react";
import "./Slider.css";
import Slidercomponent from "./SliderComponent";
import image1 from "../pictures/1.jpg";
import image2 from "../pictures/2.jpg";
import image3 from "../pictures/3.jpg";

export const Circle = (props) => (
  <span
    className={
      props.id === props.active ? "slider-circle active-dot" : "slider-circle"
    }
  ></span>
);

const Slider = () => {
  const [slider, setslider] = useState(1);
  const data = [1, 2, 3];
  const images = [image1, image2, image3];

  const nextSlide = () => {
    setslider((prev) => (prev >= data.length ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setslider((prev) => (prev <= 1 ? data.length : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setslider((prev) => (prev >= data.length ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="home-container">
      {data.map((el, i) => (
        <Slidercomponent
          className={`slide-${i + 1} slide`}
          key={i}
          style={{ transform: `translateX(${100 * (i + 1 - slider)}%)` }}
          image={images[i]}
        />
      ))}
      <div className="slider-dots">
        {data.map((el, i) => (
          <Circle key={i} active={slider} id={i + 1} />
        ))}
      </div>
      <div className="slider-btn">
        <div className="left-btn">
          <button onClick={prevSlide}>{"<"}</button>
        </div>
        <div className="right-btn">
          <button onClick={nextSlide}>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
