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
          <span className="status-field-value">{tasksStats ? tasksStats.total : '0'}</span>
        </Loader>
      </p>
      <p>
        Important:
        <Loader isLoading={isLoadingTasks} variant={'dot'}>
          <span className="status-field-value">{tasksStats ? tasksStats.important : '0'}</span>
        </Loader>
      </p>
      <p>
        Done:
        <Loader isLoading={isLoadingTasks} variant={'dot'}>
          <span className="status-field-value">{tasksStats ? tasksStats.done : '0'}</span>
        </Loader>
      </p>
    </div>
  );
}

export const StatusField = observer(StatusFieldProto);
