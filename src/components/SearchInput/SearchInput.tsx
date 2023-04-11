import React, { ChangeEventHandler, MouseEvent } from 'react';
import './SearchInput.css';
import { SearchInputProps } from './SearchInput.types';

export function SearchInput({ onChange, value, onReset, disabled }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.value);

  const onResetBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onReset();
  };

  return (
    <div className="input-panel">
      <input
        disabled={disabled}
        className="search-input"
        placeholder="Search"
        onChange={onSearchInputChange}
        value={value}
      />
      <button className="close" onClick={onResetBtnClick}>
        <i className="cross">&times;</i>
      </button>
    </div>
  );
}
