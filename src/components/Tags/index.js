import React from "react";
import "./index.scss";
const Tags = ({ tags, value, onChange }) => {
  // tags__list--active
  return (
    <div className="tags row">
      <h4>Tags</h4>
      <div className="tags__container">
        {tags.map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => onChange(item.name)}
              className={`tags__list${value.includes(item.name) ? "--active" : ""}`}
            >
              <p>{item.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
