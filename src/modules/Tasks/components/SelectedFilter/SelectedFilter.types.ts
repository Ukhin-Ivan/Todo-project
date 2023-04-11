import { FiltersType } from 'domains/index';

export interface StatusFilterProps {
  tasksType: FiltersType;
  onChange: (value: FiltersType) => void;
  disabled: boolean;
}
