import { Col, Row } from 'antd';
import React, { useContext } from 'react';
import Context from '../context';
import { ItemType } from '../player/interface';
import store from '../store';
import Item from '../store/item';
import './index.scss';

const picList = [
  'http://static.lzuntalented.cn/movie/1.jpg',
  'http://static.lzuntalented.cn/movie/2.jpg',
  'http://static.lzuntalented.cn/movie/3.jpg',
];

const videoList = [
  'http://static.lzuntalented.cn/movie/1.mp4',
  'http://static.lzuntalented.cn/movie/2.mp4',
];

const textList = [
  'https://js.xiudodo.com/colorful/previews/2.png?x-oss-process=image/crop,x_50,w_300,y_50,h_300/resize,w_180/interlace,1/sharpen,100/quality,q_98',
];

interface Props {
  activeWidgetId: number;
}
function Widget({ activeWidgetId }: Props) {
  const { refresh } = useContext(Context);
  const onAddPicture = (url: string) => {
    const layer = store.getActiveLayer();
    const item = new Item(1000 * 3, '图片');
    item.url = url;
    item.type = ItemType.IMAGE;
    layer.addItem(item);
    store.updateFlag = Symbol(1);
    store.activeItemId = item.id;
    refresh();
  };
  const onAddVideo = (url: string) => {
    const layer = store.getActiveLayer();
    const item = new Item(8 * 1000, '视频');
    item.url = url;
    item.type = ItemType.VIDEO;
    layer.addItem(item);
    // item.setStart(2 * 1000);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };
  const onAddText = () => {
    const content = '我是字幕';
    const layer = store.getActiveLayer();
    const item = new Item(1000 * 1, '文字');
    item.content = content;
    item.type = ItemType.TEXT;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };
  const onAddMusic = () => {
    const url = 'http://127.0.0.1:5500/public/o.m4a';
    const layer = store.addLayer();
    const item = new Item(100 * 1000, '音乐');
    item.url = url;
    item.type = ItemType.MUSIC;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.activeLayer = 0;
    refresh();
  };

  const onAddLayer = () => {
    const layer = store.addLayer();
    const content = '我是字幕';
    const item = new Item(1000 * 1, '文字');
    item.content = content;
    item.type = ItemType.TEXT;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };
  return (
    <div className="widget">
      <Row gutter={24}>
        {activeWidgetId === 1
          && picList.map((it) => (
            <Col key={it} span={12}>
              <img
                src={it}
                alt=""
                width="100%"
                onClick={() => {
                  onAddPicture(it);
                }}
              />
            </Col>
          ))}
          {activeWidgetId === 2
          && videoList.map((it) => (
            <Col key={it} span={12}>
              <video
                src={it}
                width="100%"
                onClick={() => {
                  onAddVideo(it);
                }}
              />
            </Col>
          ))}
        {activeWidgetId === 3
          && textList.map((it) => (
            <Col key={it} span={12}>
              <img
                src={it}
                alt=""
                width="100%"
                onClick={() => {
                  onAddText();
                }}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Widget;
