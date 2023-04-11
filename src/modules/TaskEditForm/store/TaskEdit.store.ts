import { computed, action, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { delay } from 'helpers/index';
import { TasksMocks } from '__mocks__/TasksMocks';

type PrivateField = '_isLoadingTask' | '_task' | '_isDoneDisabler';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoadingTask: observable,
      _task: observable,
      _isDoneDisabler: observable,

      isLoadingTask: computed,

      isDoneChanger: action,
      loadTask: action,
      editTask: action,
    });
  }

  private _task: TaskEntity = {
    id: '',
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  get task(): TaskEntity {
    return this._task;
  }

  private _isLoadingTask = false;

  get isLoadingTask(): boolean {
    return this._isLoadingTask;
  }

  set isLoadingTask(value: boolean) {
    this._isLoadingTask = value;
  }

  private _isDoneDisabler = this._task.isDone;

  get isDoneDisabler(): boolean {
    return this._isDoneDisabler;
  }

  isDoneChanger = () => {
    this._isDoneDisabler = !this._isDoneDisabler;
  };

  loadTask = (id: string | undefined) => {
    this.isLoadingTask = true;

    [this._task] = TasksMocks.filter((item) => item.id === String(id));
    console.log(this.task.id, this.task.name);
    delay(1000);

    this.isLoadingTask = false;
  };

  editTask = async (editParams?: TaskEntity) => {
    this.isLoadingTask = true;

    console.log(editParams);
    await delay(1000);

    this.isLoadingTask = false;
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
