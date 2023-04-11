import { STATUS_TYPES } from 'constants/index';

export interface TaskEntity {
  id: string;
  name: string;
  info: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface TaskStatsEntity {
  total: number;
  important: number;
  done: number;
}

export type FiltersType = typeof STATUS_TYPES[keyof typeof STATUS_TYPES];

export interface SearchFieldEntity {
  inputValue: string;
  filterValue: FiltersType;
}

export interface TaskEditFormEntity {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}
