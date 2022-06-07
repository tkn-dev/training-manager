/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { HOVER, SIDE_MENU } from '../../style/constants';

const sideMenu = (open) =>
  css({
    height: '100%',
    width: SIDE_MENU.WIDTH,
    paddingTop: '70px',
    position: 'absolute',
    top: '0',
    left: open ? '0' : `-${SIDE_MENU.WIDTH}`,
    zIndex: '1',
    boxShadow: '0px 0px 1px black',
    lineHeight: '5',
    transition: '0.3s',
  });
const linkContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
});
const link = (open) =>
  css({
    width: '100%',
    listStyleType: 'none',
    pointerEvents: 'auto',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: HOVER.COLOR,
      transition: HOVER.TRANSITION,
    },
  });
const linkText = (open) =>
  css({
    display: 'inline-block',
    padding: open ? '0 1rem 0' : '0',
    width: '100%',
    color: SIDE_MENU.TEXT_COLOR,
    textDecoration: 'none',
    fontSize: open ? '1.1em' : '0',
    letterSpacing: '0.5em',
    transition: '0.3s',
    '&:active': {
      color: SIDE_MENU.TEXT_COLOR,
    },
  });

export const SideMenu = ({ sideMenuOpen = true }) => {
  return (
    <nav css={sideMenu(sideMenuOpen)}>
      <ol css={linkContainer}>
        <li css={link(sideMenuOpen)}>
          <a css={linkText(sideMenuOpen)} href="/exercises">
            種目登録
          </a>
        </li>
        <li css={link(sideMenuOpen)}>
          <a css={linkText(sideMenuOpen)} href="records">
            記録入力
          </a>
        </li>
        <li css={link(sideMenuOpen)}>
          <a css={linkText(sideMenuOpen)} href="histories">
            履歴
          </a>
        </li>
      </ol>
    </nav>
  );
};
