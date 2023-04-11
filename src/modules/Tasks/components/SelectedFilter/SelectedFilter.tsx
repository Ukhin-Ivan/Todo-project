import React, { MouseEvent } from 'react';
import { StatusFilterProps } from './SelectedFilter.types';
import { FiltersType } from 'domains/index';
import { CLASSNAMES, STATUS_TYPES } from 'constants/index';
import './SelectedFilter.css';

export function SelectedFilter({ tasksType, onChange, disabled }: StatusFilterProps) {
  const onStatusFilterChange = (e: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(e.target.textContent as FiltersType);
  };

  return (
    <div className="status-filter-buttons" onClick={onStatusFilterChange}>
      <button type="button" className={tasksType === STATUS_TYPES.ALL ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {STATUS_TYPES.ALL}
      </button>
      <button type="button" className={tasksType === STATUS_TYPES.ACTIVE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {STATUS_TYPES.ACTIVE}
      </button>
      <button type="button" className={tasksType === STATUS_TYPES.DONE ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {STATUS_TYPES.DONE}
      </button>
      <button type="button" className={tasksType === STATUS_TYPES.IMPORTANT ? CLASSNAMES.ACTIVE : CLASSNAMES.SECONDARY}>
        {STATUS_TYPES.IMPORTANT}
      </button>
    </div>
  );
}
