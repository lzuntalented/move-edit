import React, { useEffect, useRef } from 'react';
import store from '../store';
import { PlayStatus, TextProps } from './interface';

export default function Text(props: TextProps) {
  const { content } = props;
  const ref = useRef<HTMLVideoElement>(null);
  return <div>{content}</div>;
}
