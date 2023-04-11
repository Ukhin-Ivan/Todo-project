import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { SearchField, StatusField, TasksList, TasksStoreInstance } from 'modules/index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.loadTasks();
  }, []);

  return (
    <>
      <SearchField />
      <StatusField />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
