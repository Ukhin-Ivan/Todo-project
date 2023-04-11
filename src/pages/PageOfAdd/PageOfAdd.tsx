import React from 'react';
import { PageContainer } from 'components/index';
import { TaskAddForm } from 'modules/TaskAddForm';
import '../PagesStyles.css';

export function PageOfAdd() {
  return (
    <PageContainer className="container">
      <h1 className="header">TODO LIST | ADD TASK</h1>
      <TaskAddForm />
    </PageContainer>
  );
}
