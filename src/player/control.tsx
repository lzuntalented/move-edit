import React, {
  FunctionComponent, ReactComponentElement, useContext, useEffect, useState,
} from 'react';
import Context from '../context';
import Item from '../store/item';
import { ItemType, PlayerControlProps, PlayStatus } from './interface';
import Video from './video';
import Image from './image';
import Text from './text';
import Music from './music';
import store from '../store';

const itemRenderMap = {
  [ItemType.VIDEO]: Video,
  [ItemType.IMAGE]: Image,
  [ItemType.TEXT]: Text,
  [ItemType.MUSIC]: Music,
} as any;

export default function PlayControl(props: PlayerControlProps) {
  const { playStatus } = props;
  const [currentItem, setCurrentItem] = useState<Item[]>([]);
  const { currentTime, list, updateFlag } = props;
  const { refresh } = useContext(Context);

  useEffect(() => {
    const obj = list.filter((it) => currentTime >= it.start
    && currentTime <= it.start + it.duration);
    setCurrentItem(obj);
    // console.log('updateList------------', obj);
  }, [currentTime, updateFlag, list]);

  // useEffect(() => {
  //   let handle;
  //   if ((!currentItem || currentItem.type !== ItemType.VIDEO)
  //    && playStatus === PlayStatus.PLAYING) {
  //     handle = setInterval(() => {
  //       if (store.detectEnd()) {
  //         window.clearInterval(handle);
  //         return;
  //       }
  //       console.log(store.currentTime, 'currentTime', currentItem);
  //       store.currentTime += 1000 / 24;
  //       refresh();
  //     }, 1000 / 24);
  //   } else {
  //     window.clearInterval(handle);
  //   }
  //   return () => {
  //     console.log('destroyList------------');
  //     window.clearInterval(handle);
  //   };
  // }, [currentItem, playStatus]);

  if (currentItem.length === 0) return <div />;
  return (
    <>
      {currentItem.map((it) => {
        const Comp = itemRenderMap[it.type];
        return <Comp {...props} {...it} />;
      })}
    </>
  );
}
