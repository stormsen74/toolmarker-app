import { css } from 'styled-components';

export const theme = {
  breakpoints: {
    sm: '460px',
    md: '700px',
    lg: '960px',
    xl: '1280px',
  },
};

export const styledScrollbar = css`
  // => firefox
  scrollbar-width: thin;
  scrollbar-color: #535353 #f7f9fb;

  // => webkit
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #989a9b;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #737373;
  }
`;
