import React, { MouseEvent, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskStoreInstance } from '../../store/index';
import { DEFAULT_ADD_TASK_FIELD } from './AddTaskField.constants';
import { validationSchema } from './AddTaskResolver';
import { Loader, TextField, Checkbox } from 'components/index';
import { LINKS } from 'constants/index';
import { TaskEntity } from 'domains/Task.entity';
import './AddTaskField.css';

function AddTaskFieldProto() {
  const { isLoadingTask, addTask } = AddTaskStoreInstance;
  const { control, setValue, handleSubmit } = useForm<Omit<TaskEntity, 'id' | 'isDone'>>({
    defaultValues: DEFAULT_ADD_TASK_FIELD,
    resolver: yupResolver(validationSchema),
  });

  const linkToRoot = useNavigate();

  const onNameInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);
  const onInfoInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);
  const onImportantCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => setValue('isImportant', e.target.checked);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit((formData) => {
      addTask(formData);
    })();
    linkToRoot(LINKS.ROOT);
  };

  return (
    <Loader isLoading={isLoadingTask}>
      <form>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label={'Task name'}
              placeholder={'Enter task name'}
              containerClassName={'task-name'}
              inputType={'text'}
              value={field.value}
              onChange={onNameInputChange}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              label={'What to do(description)'}
              placeholder={'Describe your task'}
              containerClassName={'task-info'}
              inputType={'text'}
              value={field.value}
              onChange={onInfoInputChange}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox
              label={'Important'}
              checked={field.value}
              onChange={onImportantCheckboxChange}
              containerClassName={'important-stat-checkbox'}
            />
          )}
        />
        <button className="add-button" type="submit" onClick={onSubmit}>
          Add task
        </button>
      </form>
    </Loader>
  );
}

export const AddTaskField = observer(AddTaskFieldProto);
