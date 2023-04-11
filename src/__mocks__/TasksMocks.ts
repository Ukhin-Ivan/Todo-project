import { TaskEntity, TaskStatsEntity } from 'domains/index';

export const StatusFieldMocks: TaskStatsEntity = {
  total: 5,
  done: 4,
  important: 3,
};

export const TasksMocks: TaskEntity[] = [
  {
    id: '1',
    name: 'Learn HTML',
    info: 'Learn lenguage HTML',
    isImportant: false,
    isDone: true,
  },
  {
    id: '2',
    name: 'Learn CSS',
    info: 'Learn lenguage CSS',
    isImportant: false,
    isDone: true,
  },
  {
    id: '3',
    name: 'Learn JavaScript',
    info: 'Learn lenguage JavaScript',
    isImportant: true,
    isDone: false,
  },
  {
    id: '4',
    name: 'Learn React',
    info: 'Learn React',
    isImportant: true,
    isDone: true,
  },
  {
    id: '5',
    name: 'Read "War and Peace"',
    info: 'Read novel some time...',
    isImportant: false,
    isDone: false,
  },
];
