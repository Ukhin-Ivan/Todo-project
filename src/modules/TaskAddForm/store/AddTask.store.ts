import { computed, action, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { delay } from 'helpers/index';

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

  addTask = async (addParams?: Omit<TaskEntity, 'id' | 'isDone'>) => {
    this.isLoadingTask = true;

    console.log(addParams);
    if (addParams) await delay(1000);

    this.isLoadingTask = false;
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
