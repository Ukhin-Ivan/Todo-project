import { TaskEntity } from 'domains/Task.entity';

export const DEFAULT_ADD_TASK_FIELD: Omit<TaskEntity, 'id' | 'isDone'> = {
  name: '',
  info: '',
  isImportant: false,
};
