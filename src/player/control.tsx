import React, {
  FunctionComponent, ReactComponentElement, useContext, useEffect, useState,
} from 'react';
import { fabric } from 'fabric';
import Context from '../context';
import Item from '../store/item';
import { ItemType, PlayerControlProps, PlayStatus } from './interface';
import Video from './video';
import Image from './image';
import Text from './text';
import Music from './music';
import store from '../store';
import Animation from './animation';

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
  const chidlren = currentItem.map((it) => {
    const Comp = itemRenderMap[it.type];
    return <div className='player-item'>
      <Comp {...props} {...it} key={it.id} />
    </div>;
  });

  if (currentItem[0].transition
     && currentTime >= (
       currentItem[0].start + currentItem[0].duration - currentItem[0].transition.duration
     )
  ) {
    // console.log(currentTime, currentItem[0].transition.duration);
    return (
      <Animation
        {...currentItem[0].transition || {}}
        currentTime={currentTime - (currentItem[0].start + currentItem[0].duration - currentItem[0].transition.duration)}
      >
        {chidlren}
      </Animation>
    );
  }
  return chidlren;
}
