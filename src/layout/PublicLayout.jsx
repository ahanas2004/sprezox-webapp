import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main style={{ paddingTop: '80px' }}>
        <Outlet />
      </main>
      <PublicFooter />
    </>
  );
}