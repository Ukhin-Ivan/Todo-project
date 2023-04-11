import { action, computed, makeObservable, observable } from 'mobx';
import { SearchFieldEntity, TaskEntity, TaskStatsEntity } from 'domains/index';
import { TasksMocks, StatusFieldMocks } from '__mocks__/index';
import { delay } from 'helpers/index';

type PrivateField = '_isLoadingTasks' | '_tasks' | '_tasksStats';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoadingTasks: observable,
      _tasks: observable,
      _tasksStats: observable,

      tasks: computed,
      isLoadingTasks: computed,
      tasksStats: computed,

      loadTasks: action,
      changeTaskImportance: action,
      changeTaskCompleteness: action,
      deleteTask: action,
    });
  }

  private _isLoadingTasks = false;

  get isLoadingTasks(): boolean {
    return this._isLoadingTasks;
  }

  set isLoadingTasks(value: boolean) {
    this._isLoadingTasks = value;
  }

  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private _tasksStats: TaskStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TaskStatsEntity {
    return this._tasksStats;
  }

  loadTasks = async (searchParams?: SearchFieldEntity) => {
    this.isLoadingTasks = true;

    console.log(searchParams);
    this._tasks = TasksMocks;
    this._tasksStats = StatusFieldMocks;
    await delay(1000);

    this.isLoadingTasks = false;
  };

  changeTaskImportance = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isLoadingTasks = true;
    console.log('important', taskId, !currentStatus);
    this.loadTasks();
  };

  changeTaskCompleteness = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isLoadingTasks = true;
    console.log('complete', taskId, !currentStatus);
    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this.isLoadingTasks = true;
    console.log('delete', taskId);
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
