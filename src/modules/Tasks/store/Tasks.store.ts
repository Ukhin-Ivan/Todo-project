import { action, computed, makeObservable, observable } from 'mobx';
import { SearchFieldEntity, TaskEntity, TaskStatsEntity } from 'domains/index';
import { getInternalInfo, mapToExternalParams, mapToInternalData } from 'helpers/index';
import { TaskAgentInstance } from 'http/agent';

type PrivateField = '_isLoadingTasks' | '_tasks' | '_tasksStats' | '_searchField';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoadingTasks: observable,
      _tasks: observable,
      _tasksStats: observable,
      _searchField: observable,

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

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  private _tasksStats: TaskStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TaskStatsEntity | null {
    return this._tasksStats;
  }

  private _searchField?: SearchFieldEntity = {
    inputValue: '',
    filterValue: 'All',
  };

  getTasks = async (searchParams?: SearchFieldEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);

    return {
      tasks: mapToInternalData(res),
      tasksStats: getInternalInfo(res),
    };
  };

  loadTasks = async (searchParams?: SearchFieldEntity) => {
    this.isLoadingTasks = true;
    try {
      if (searchParams) this._searchField = searchParams;

      const { tasks, tasksStats } = await this.getTasks(this._searchField);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.isLoadingTasks = false;
    }
  };

  changeTaskImportance = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isLoadingTasks = true;

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchField);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.isLoadingTasks = false;
    }
  };

  changeTaskCompleteness = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isLoadingTasks = true;

    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: currentStatus ? undefined : false,
        isCompleted: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchField);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.isLoadingTasks = false;
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this.isLoadingTasks = true;

    try {
      await TaskAgentInstance.deleteTask(taskId);

      const { tasks, tasksStats } = await this.getTasks(this._searchField);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this.isLoadingTasks = false;
    }
  };
}

export const TasksStoreInstance = new TasksStore();
