import React from 'react';
import { observer } from 'mobx-react';
import { Task, TasksStoreInstance } from 'modules/index';
import { Loader } from 'components/index';
import './TasksList.css';

function TasksListProto() {
  const { isLoadingTasks, tasks, changeTaskImportance, deleteTask, changeTaskCompleteness } = TasksStoreInstance;

  return (
    <div className="tasks-list">
      <Loader isLoading={isLoadingTasks}>
        {tasks?.length ? (
          <ul className="list">
            {tasks.map((task) => (
              <li key={task.id} className="li">
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportance={changeTaskImportance}
                  deleteTask={deleteTask}
                  changeTaskCompleteness={changeTaskCompleteness}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Tasks not found.</p>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
