import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { styledScrollbar } from './layout';
import { defaultTextStyle } from './text';

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${styledScrollbar}
`;

export const colors = {
  grey: { light: '#A7A7A7', medium: '#333333', dark: '#191919' },
  green: {
    '25': 'rgba(0, 255, 105, 0.25)',
    '55': 'rgba(0, 255, 105, 0.55)',
    '100': 'rgba(0, 255, 105, 1)',
  },
};

export const easings = {
  easeOutStrong: `cubic-bezier(0.12, 0.2, 0.09, 0.99)`,
};

export const defaultContentStyle = css`
  ${defaultTextStyle};
  padding: 75px 25px;
  color: ${colors.grey.dark};
`;

export const BackgroundImage = styled.div`
  height: ${props => (!props.fullHeight ? props.height + 'px' : '100%')};
  background-image: url(${props => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: ${props => props.margin || 0};
`;

export const ImageSubline = styled.div`
  font-size: 11px;
`;

export const mobileButtonStyle = css`
  background-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  cursor: pointer;
`;

export const LinkToURL = styled.div`
  text-decoration: underline;
  margin-top: ${props => (props.noMargin ? 0 : 5)}px;

  a {
    text-decoration: underline;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      color: inherit;
      text-decoration: inherit;
    }
  }
`;

export const opacityFadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const Debug = styled.div`
  border: ${props => (props.debug ? '1px solid' + props.color : null)};
`;
