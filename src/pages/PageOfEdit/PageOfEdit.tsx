import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { TaskEditForm } from 'modules/index';
import '../PagesStyles.css';

export function PageOfEdit() {
  const { task_id } = useParams();

  return (
    <PageContainer className="container">
      <h1 className="header">TODO LIST | EDIT TASK {task_id}</h1>
      <TaskEditForm />
    </PageContainer>
  );
}
