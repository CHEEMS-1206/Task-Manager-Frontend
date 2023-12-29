import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, fas } from "@fortawesome/free-solid-svg-icons";

library.add(faFilePen, fas);

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-title-holder`}
            onClick={() => handleClick(index)}
          >
            <h1
              className={`accordion-title ${
                index === activeIndex ? "active" : ""
              }`}
            >
              {item.title}
            </h1>
            <FontAwesomeIcon
              icon={
                index === activeIndex
                  ? "fa-solid fa-down-left-and-up-right-to-center"
                  : "fa-solid fa-up-right-and-down-left-from-center"
              }
            />
          </div>
          {index === activeIndex && (
            <div className="accordion-content-holder">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
