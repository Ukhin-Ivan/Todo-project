import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { DEFAULT_SEARCH_FIELD } from './SearchField.constants';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFieldEntity } from 'domains/index';
import { SelectedFilter, TasksStoreInstance } from 'modules/index';
import './SearchField.css';

function SearchFieldProto() {
  const { isLoadingTasks, loadTasks } = TasksStoreInstance;

  const { control, setValue, handleSubmit } = useForm<SearchFieldEntity>({
    defaultValues: DEFAULT_SEARCH_FIELD,
  });

  const onSearchInputChange = (value: string) => setValue('inputValue', value);
  const onSearchInputReset = () => setValue('inputValue', '');
  const onFilterChange = (type: FiltersType) => setValue('filterValue', type);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit((formData) => {
      loadTasks(formData);
    })();
  };

  return (
    <form className="search-field">
      <Controller
        control={control}
        name="inputValue"
        render={({ field }) => (
          <SearchInput
            disabled={isLoadingTasks}
            value={field.value}
            onChange={onSearchInputChange}
            onReset={onSearchInputReset}
          />
        )}
      />
      <Controller
        control={control}
        name="filterValue"
        render={({ field }) => (
          <SelectedFilter disabled={isLoadingTasks} tasksType={field.value} onChange={onFilterChange} />
        )}
      />
      <button type="submit" disabled={isLoadingTasks} className="btn-submit" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
}

export const SearchField = observer(SearchFieldProto);
