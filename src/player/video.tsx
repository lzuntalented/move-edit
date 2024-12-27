import React, { useEffect, useRef } from 'react';
import store from '../store';
import { PlayStatus, VideoProps } from './interface';

export default function Video(props: VideoProps) {
  const {
    url, playStatus, updateFlag,
    start, playStart, volume,
  } = props;
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (url) {
      if (ref?.current) {
        ref.current.volume = volume;
        if (playStatus === PlayStatus.PAUSE) {
          ref.current?.pause();
        } else if (ref.current) {
          ref.current.play();
        }
      }
    }
  }, [playStatus, url]);

  useEffect(() => {
    // const onTimeUpdate = () => {
    //   if (ref.current?.currentTime) {
    //     store.currentTime = start + ((ref.current?.currentTime || 0) * 1000);
    //     refresh();
    //   }
    //   console.log(ref.current?.currentTime, 'timeupdate');
    // };
    if (ref.current) {
      // ref.current.currentTime = (store.currentTime - start) / 1000 + playStart;
      ref.current.currentTime = (store.currentTime - start + playStart) / 1000;
    }
  }, [start, updateFlag, playStart]);

  // console.log(playStatus, 'playStatus', url);
  return <video ref={ref} src={url} height="100%" />;
}
