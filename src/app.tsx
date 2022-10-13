import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { useImmer } from 'use-immer';
import { Col, Layout, Row } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Context, { Consumer, Provider } from './context';
import Operation from './operation';
import Player from './player';
import store, { addLayer } from './store';
import Item from './store/item';
import Layer from './store/layer';
import Track from './track';
import './app.scss';
import Setting from './setting';

const { Content, Footer, Header } = Layout;

export default function App() {
  const [state, setState] = useImmer(Symbol(1));

  useEffect(() => {
    store.addLayer();
    // const layer = addLayer();
    // layer.addItem(new Item(0, 10, '1-1'));
    // layer.addItem(new Item(10, 20, '1-2'));
    // layer.addItem(new Item(20, 30, '1-3'));

    // const layer2 = addLayer();
    // layer2.addItem(new Item(0, 10, '2-1'));
    // layer2.addItem(new Item(10, 20, '2-2'));
    // layer2.addItem(new Item(20, 30, '2-3'));

    // setState({ ...store });
  }, []);

  const refresh = useCallback(
    () => {
      setState(Symbol(1));
    },
    [],
  );

  const activeTtem = store.getActiveItem();
  return (
    <Provider value={{ state, refresh }}>
      <Operation />
      <Row itemType="flex">
        <Col span={4}>
          side
        </Col>
        <Col style={{ flex: 1 }}>
          <Row itemType="flex" justify="space-between">
            <Col span={12}>
              <Player layers={store.layers} />
            </Col>
            <Col span={6}>
              {
                  activeTtem && <Setting key={activeTtem?.id} data={activeTtem} />
                }
            </Col>
          </Row>
        </Col>
      </Row>
      <Track />
    </Provider>
  );
}
