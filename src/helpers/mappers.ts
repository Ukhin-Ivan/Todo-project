import { STATUS_TYPES } from 'constants/index';
import { TaskEntity, SearchFieldEntity, TaskStatsEntity, TaskEditFormEntity } from 'domains/index';
import { GetAllTasksQuery, GetAllTasksResponse, GetTaskResponse } from 'http/index';

export const mapToExternalParams = (params?: SearchFieldEntity): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { inputValue, filterValue } = params;
  let isCompleted = undefined;

  if (filterValue === STATUS_TYPES.DONE) isCompleted = true;
  else if (filterValue === STATUS_TYPES.ACTIVE) isCompleted = false;

  return {
    name_like: inputValue ?? undefined,
    isImportant: filterValue === STATUS_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalData = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        name: task.name || 'Неизвестно',
        id: String(task.id),
        info: task.info || 'Неизвестно',
        isImportant: task.isImportant || false,
        isDone: task.isCompleted || false,
      });
    }
  });

  return internalTasks;
};

export const getInternalInfo = (tasks: GetAllTasksResponse): TaskStatsEntity => {
  const total = tasks.length;
  const anotherStats = tasks.reduce(
    (prev, task) => {
      return {
        important: task.isImportant ? prev.important + 1 : prev.important,
        done: task.isCompleted ? prev.done + 1 : prev.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...anotherStats,
  };
};

export const mapToInternalTaskEdit = (task: GetTaskResponse): TaskEditFormEntity => {
  return {
    name: task.name || 'Неизвестно',
    info: task.info || 'Неизвестно',
    isImportant: task.isImportant || false,
    isCompleted: task.isCompleted || false,
  };
};
