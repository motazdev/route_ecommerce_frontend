import React from "react";
import headerImg from "../../assets/images/ecommerce-bg.png";

export const HeaderImage = () => {
  return (
    <div className=" relative w-full overflow-hidden rounded-bl-md rounded-br-md ">
      <img
        className="md:w-[463px] absolute md:relative bottom-0 md:bottom-auto float-right w-[263px] "
        src={headerImg}
        alt="Landscape photograph by Tobias Tullius"
      />
    </div>
  );
};
