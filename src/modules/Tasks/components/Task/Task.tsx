import { Link } from 'react-router-dom';
import { TaskProps } from './Task.types';
import { ROOT, EDIT } from 'constants/index';
import './Task.css';

export function Task({ task, changeTaskImportance, changeTaskCompleteness, deleteTask }: TaskProps) {
  const { id, name, info, isImportant, isDone } = task;

  const onButtonImportantChanger = () => changeTaskImportance(id, isImportant);

  const onButtonCompletedChanger = () => changeTaskCompleteness(id, isDone);

  const onButtonDeleter = () => deleteTask(id);

  return (
    <div>
      <div className="task-card">
        <p className={`task-name ${isDone ? 'done-task' : ''} ${isImportant ? 'important-task' : ''}`}>{name}</p>
        <p className={`task-info ${isDone ? 'done-task' : ''} ${isImportant ? 'important-task' : ''}`}>{info}</p>
        <div className="buttons-cascade">
          <button
            type="button"
            className={`important-button ${isImportant ? 'important' : ''}`}
            disabled={isDone}
            onClick={onButtonImportantChanger}>
            <i className="fa fa-exclamation" />
          </button>

          <button
            type="button"
            className={`fulfilled-button ${isDone ? 'fulfilled' : ''}`}
            onClick={onButtonCompletedChanger}>
            <i className="fa fa-check" />
          </button>

          <button type="button" className="delete-button" onClick={onButtonDeleter}>
            <i className="fa fa-trash-o" />
          </button>

          <Link className="edit-button" to={`${ROOT}${EDIT}/${id}`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
      </div>
    </div>
  );
}
