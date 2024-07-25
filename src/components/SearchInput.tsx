import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3 w-50">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar eventos por Ciudad, Denominación o Descripción"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
