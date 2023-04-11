import { TaskEntity } from 'domains/index';

export interface TaskProps {
  task: TaskEntity;
  changeTaskImportance: (id: TaskEntity['id'], isImportant: boolean) => void;
  changeTaskCompleteness: (id: TaskEntity['id'], isDone: boolean) => void;
  deleteTask: (id: TaskEntity['id']) => void;
}
