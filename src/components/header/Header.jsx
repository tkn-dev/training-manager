/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { HOVER } from '../../style/constants';

const header = css({
  display: 'flex',
  position: 'relative',
  zIndex: '2',
  alignItems: 'center',
  marginBottom: '15px',
  padding: '10px',
  height: '60px',
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0px 0px 2px black',
});

const menuToggle = css({
  display: 'inline-block',
  height: '40px',
  width: '40px',
  padding: '10px',
  '&:hover': {
    backgroundColor: HOVER.COLOR,
    transition: HOVER.TRANSITION,
    borderRadius: '100%',
    cursor: 'pointer'
  },
});

const pageTitle = css({
  display: 'inline-block',
  marginLeft: '20px',
  height: '40px',
  width: '209px',
  backgroundImage: 'url(./assets/logo.png)',
});

export const Header = ({ setSideMenuOpen }) => {
  return (
    <header css={header}>
      <FiMenu css={menuToggle} onClick={() => setSideMenuOpen((prev) => !prev)} />
      <h1 css={pageTitle}></h1>
    </header>
  );
};
