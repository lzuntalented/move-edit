import React, { useEffect, useRef } from 'react';
import store from '../store';
import { PlayStatus, VideoProps } from './interface';

export default function Image(props: VideoProps) {
  const { url, playStatus, refresh } = props;
  const ref = useRef<HTMLVideoElement>(null);
  // useEffect(() => {
  //   let handle;
  //   if (url) {
  //     if (playStatus === PlayStatus.PAUSE) {
  //       window.clearInterval(handle);
  //     } else {
  //       handle = setInterval(() => {
  //         store.currentTime += 1000 / 60;
  //         refresh();
  //       }, 1000 / 60);
  //     }
  //   }
  //   return () => {
  //     window.clearInterval(handle);
  //   };
  // }, [playStatus, url]);

  return <img ref={ref} src={url} height="100%" />;
}
