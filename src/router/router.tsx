import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LINKS } from 'constants/index';
import { PageOfTasks, PageOfAdd, PageOfEdit } from 'pages/index';

export function Router() {
  return (
    <Routes>
      <Route path={LINKS.ROOT} element={<PageOfTasks />} />
      <Route path={LINKS.EDIT} element={<PageOfEdit />} />
      <Route path={LINKS.ADD} element={<PageOfAdd />} />
    </Routes>
  );
}
