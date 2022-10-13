import React, { useContext } from 'react';
import { SplitCellsOutlined } from '@ant-design/icons';
import './index.scss';
import {
  Button, Col, message, Row,
} from 'antd';
import { PlayStatus } from '../player/interface';
import store from '../store';
import Context from '../context';

function TrackOperate() {
  const { refresh } = useContext(Context);
  const onChange = () => {
    if (store.playStatus !== PlayStatus.PLAYING) {
      store.play();
    } else {
      store.pause();
      refresh();
    }
  };

  const onSplit = () => {
    const success = store.splitItem();
    if (success) {
      refresh();
    } else {
      message.error('片段时间不得小于1s');
    }
  };
  return (
    <div className="track-operate">
      <Row style={{ width: '100%' }}>
        <Col span={8}>
          <Row gutter={24}>
            <Col>
              添加片段
            </Col>
            <Col>
              <Button icon={<SplitCellsOutlined />} size="small" onClick={onSplit}>
                分割
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Button size="small" onClick={onChange}>
            {store.playStatus === PlayStatus.PLAYING ? '暂停' : '播放'}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TrackOperate;
