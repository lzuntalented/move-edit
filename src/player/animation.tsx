import React, { ReactChild, ReactNode } from 'react';
import { Motion, Transition } from '../store/transition';

interface AnimationProps extends Partial<Transition>{
  children: Array<ReactChild>
  currentTime: number
}

function Animation(props: AnimationProps) {
  const {
    current, next, children, currentTime, duration,
  } = props;

  if (!current) return children;
  if (currentTime > 0) {
    const curStyle = {};
    Object.keys(current.to).forEach((k) => {
      const len = current.to[k] - current.from[k];
      const val = (currentTime / duration) * len;
      curStyle[k] = current.from[k] + val;
    });

    const nextStyle = {};
    Object.keys(next.to).forEach((k) => {
      const len = next.to[k] - next.from[k];
      const val = (currentTime / duration) * len;
      nextStyle[k] = next.from[k] + val;
    });
    return (
      <>
        <div className="player-item" style={curStyle}>{children[0]}</div>
        <div className="player-item" style={nextStyle}>{children[1]}</div>
      </>
    );
  }
  return children;
}

export default Animation;
