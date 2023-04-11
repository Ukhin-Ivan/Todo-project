import { observer } from 'mobx-react';
import { AddTaskField } from 'modules/index';

function TaskAddFormProto() {
  return <AddTaskField />;
}

export const TaskAddForm = observer(TaskAddFormProto);
