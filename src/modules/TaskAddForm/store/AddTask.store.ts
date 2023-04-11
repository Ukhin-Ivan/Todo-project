import { computed, action, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';

type PrivateField = '_isLoadingTask';

class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoadingTask: observable,

      isLoadingTask: computed,

      addTask: action,
    });
  }

  private _isLoadingTask = false;

  get isLoadingTask(): boolean {
    return this._isLoadingTask;
  }

  set isLoadingTask(value: boolean) {
    this._isLoadingTask = value;
  }

  addTask = async (addData: Omit<TaskEntity, 'id' | 'isDone'>): Promise<boolean> => {
    this.isLoadingTask = true;

    try {
      await TaskAgentInstance.createTask(addData);

      return true;
    } catch {
      return false;
    } finally {
      this.isLoadingTask = false;
    }
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
