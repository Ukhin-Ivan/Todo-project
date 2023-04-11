export const ROOT = '/';
export const EDIT = 'edit';
export const ADD = 'add';
export const TASK_ID = 'task_id';
export const LINKS = {
  ROOT: ROOT,
  EDIT: `${ROOT}${EDIT}/:${TASK_ID}`,
  ADD: `${ROOT}${ADD}`,
};
