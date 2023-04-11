import { computed, action, makeObservable, observable } from 'mobx';
import { TaskEditFormEntity } from 'domains/index';
import { mapToInternalTaskEdit } from 'helpers/index';
import { TaskAgentInstance } from 'http/agent';

type PrivateField = '_isLoadingTask' | '_task';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateField>(this, {
      _isLoadingTask: observable,
      _task: observable,

      isLoadingTask: computed,

      loadTask: action,
      editTask: action,
    });
  }

  private _task: TaskEditFormEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get task(): TaskEditFormEntity | null {
    return this._task;
  }

  private _isLoadingTask = false;

  get isLoadingTask(): boolean {
    return this._isLoadingTask;
  }

  set isLoadingTask(value: boolean) {
    this._isLoadingTask = value;
  }

  loadTask = async (id: string | undefined) => {
    this.isLoadingTask = true;

    try {
      if (!id) throw new Error();
      const resp = await TaskAgentInstance.getTask(id);
      this._task = mapToInternalTaskEdit(resp);
    } catch {
      this._task = null;
    } finally {
      this.isLoadingTask = false;
    }
  };

  editTask = async (taskId: string, taskData: TaskEditFormEntity): Promise<boolean> => {
    try {
      if (!taskId) throw new Error();
      await TaskAgentInstance.updateTask(taskId, taskData);
      return true;
    } catch {
      return false;
    }
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
