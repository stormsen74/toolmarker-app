import styled from 'styled-components'
import { colors, opacityFadeIn } from 'common/styles'
import { defaultTextStyle } from '../../common/text'

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${colors.grey.medium};
  ${defaultTextStyle}
`

export const Content = styled.div`
  position: relative;
  color: ${colors.grey.dark};
  width: 100%;
  max-width: 1280px;
  height: ${props => (props.hide ? 0 : null)};
  //scroll-behavior: smooth;
  opacity: 0;

  animation: ${opacityFadeIn} 0.5s ease-out forwards;
  animation-delay: 0.5s;
`

export const Section = styled.div`
  position: relative;
  width: 100%;
  border: ${props => (props.debug ? '1px solid' + props.color : null)};
`

export const StyledPin = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  width: 15px;
  height: 2px;
  background-color: black;
`
