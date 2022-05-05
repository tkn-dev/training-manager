/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';

const header = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  padding: '10px',
  height: '60px',
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0px 1px 2px black',
});

const menuToggle = css({
  display: 'inline-block',
  height: '40px',
  width: '40px',
});

const pageTitle = css({
  display: 'inline-block',
  marginLeft: '20px',
  fontSize: '3rem',
  letterSpacing: 1,
});

export const Header = () => {
  return (
    <header css={header}>
      <FiMenu css={menuToggle} />
      <h1 css={pageTitle}>Title</h1>
    </header>
  );
};
