import React from 'react';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';
import './StatusField.css';

function StatusFieldProto() {
  const { tasksStats, isLoadingTasks } = TasksStoreInstance;

  return (
    <div className="status-field">
      <p>
        Total:
        <Loader isLoading={isLoadingTasks} variant={'dot'}>
          <span className="status-field-value">{tasksStats.total}</span>
        </Loader>
      </p>
      <p>
        Important:
        <Loader isLoading={isLoadingTasks} variant={'dot'}>
          <span className="status-field-value">{tasksStats.important}</span>
        </Loader>
      </p>
      <p>
        Done:
        <Loader isLoading={isLoadingTasks} variant={'dot'}>
          <span className="status-field-value">{tasksStats.done}</span>
        </Loader>
      </p>
    </div>
  );
}

export const StatusField = observer(StatusFieldProto);
