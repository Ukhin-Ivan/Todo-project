import { observer } from 'mobx-react';
import React, { MouseEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditTaskStoreInstance } from '../../store';
import { validationSchema } from './EditTaskResolver';
import { LINKS } from 'constants/index';
import { TaskEntity } from 'domains/Task.entity';
import { Checkbox, TextField, Loader } from 'components/index';

function EditTaskFieldProto() {
  const { task, isLoadingTask, editTask, isDoneDisabler, isDoneChanger } = EditTaskStoreInstance;
  const { control, setValue, handleSubmit } = useForm<TaskEntity>({
    defaultValues: task,
    resolver: yupResolver(validationSchema),
  });

  const linkToRoot = useNavigate();

  const onNameInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);
  const onInfoInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);
  const onImportantCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => setValue('isImportant', e.target.checked);
  const onCompleteCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isDone', e.target.checked);
    if (e.target.checked) {
      setValue('isImportant', false);
      isDoneChanger();
    }
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit((formData) => {
      editTask(formData);
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
              disabled={isDoneDisabler}
              containerClassName={'important-stat-checkbox'}
            />
          )}
        />
        <Controller
          control={control}
          name="isDone"
          render={({ field }) => (
            <Checkbox
              label={'Completed'}
              checked={field.value}
              onChange={onCompleteCheckboxChange}
              containerClassName={'important-stat-checkbox'}
            />
          )}
        />
        <button className="add-button" type="submit" onClick={onSubmit}>
          Edit task
        </button>
      </form>
    </Loader>
  );
}

export const EditTaskField = observer(EditTaskFieldProto);
