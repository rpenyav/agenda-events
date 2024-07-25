import React from "react";

interface FilterSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <select className="form-select" value={value} onChange={onChange}>
        <option value="all">Mostrar todo</option>
        <option value="thisYear">Mostrar los de este año</option>
      </select>
    </div>
  );
};

export default FilterSelect;
