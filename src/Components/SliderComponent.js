import React from "react";

const Slidercomponent = ({ image, className, style }) => (
  <div className={className} style={{ ...style, width: "100vw", height: "320px", overflow: "hidden" }}>
    <img
      src={image}
      alt="slide"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover", // fills the area, may crop
        display: "block"
      }}
    />
  </div>
);

export default Slidercomponent;