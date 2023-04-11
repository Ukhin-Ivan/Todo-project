import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { LINKS } from 'constants/index';
import { Tasks } from 'modules/index';
import '../PagesStyles.css';

export function PageOfTasks() {
  return (
    <PageContainer className="container">
      <h1 className="header">TODO LIST</h1>
      <Tasks />
      <Link className="add-link" to={LINKS.ADD}>
        Add task
      </Link>
    </PageContainer>
  );
}
