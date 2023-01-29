import React from "react";
import "../Filter/FilterSlyle.css";
const Filter = ({ value, onChange }) => {
  return (
    <div className="filter__box">
      <label className="filter__label">
        фильтрация по имени
        <input
          type="text"
          className="filter__todo"
          value={value}
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};

export default Filter;
