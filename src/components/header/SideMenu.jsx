/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const sideMenu = css({
  height: '100%',
  width: '60px',
  paddingTop: '70px',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '-1',
  boxShadow: '0px 0px 3px black',
  lineHeight: '5',
});

const link = css({
  pointerEvents: 'auto',
});

export const SideMenu = () => {
  return (
    <nav css={sideMenu}>
      <ol>
        <li>
          <a css={link} href="/exercises">
            種目登録
          </a>
        </li>
        <li>
          <a css={link} href="records">
            記録入力
          </a>
        </li>
        <li>
          <a css={link} href="histories">
            履歴
          </a>
        </li>
      </ol>
    </nav>
  );
};
