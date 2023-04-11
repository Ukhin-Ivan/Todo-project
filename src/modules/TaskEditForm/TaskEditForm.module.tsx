import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { EditTaskStoreInstance } from './store';
import { EditTaskField } from 'modules/index';

function TaskEditFormProto() {
  const { task_id } = useParams();

  useEffect(() => {
    EditTaskStoreInstance.loadTask(task_id);
  }, []);

  return <EditTaskField />;
}

export const TaskEditForm = observer(TaskEditFormProto);
