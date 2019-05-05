import React from 'react';
import { Root } from './styles';

export interface AvatarProps {
  size?: number;
}

const Avatar: React.SFC<AvatarProps> = ({ size = 24 }) => <Root size={size} />;

export default Avatar;
