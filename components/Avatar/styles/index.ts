import styled from 'styled-components';
import { AvatarProps } from '..';

export const Root = styled.div<AvatarProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: blue;
`;
