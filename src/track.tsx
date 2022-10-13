import React, { useContext } from 'react';
import {
  DragDropContext, DragStart, Droppable, DroppableProvided, DropResult, ResponderProvided,
} from 'react-beautiful-dnd';
import Context from './context';
import Indicator from './indicator';
import store from './store';
import TrackDrop from './track-drop';
import TrackOperate from './track-operate';

function Track() {
  const { refresh } = useContext(Context);
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log('drag endOfDay ', result);
    // if (result.destination.index === result.source.index) {
    //   return;
    // }
    // console.log(result.destination.index, result.source.index);
    // const layer = store.getActiveLayer().items;
    // const sourceItem = layer[result.source.index];
    // const destinationItem = layer[result.destination.index];
    // let startTime = destinationItem.start;
    // let startIndex = result.destination.index;
    // if (sourceItem.start < destinationItem.start) {
    //   startTime = sourceItem.start;
    //   startIndex = result.source.index;
    // }
    // const tmp = layer[result.destination.index];
    // layer[result.destination.index] = layer[result.source.index];
    // layer[result.source.index] = tmp;

    // layer[startIndex].start = startTime;
    // for (let i = startIndex + 1; i < layer.length; i += 1) {
    //   layer[i].start = startTime + layer[i - 1].duration;
    //   startTime = layer[i].start;
    // }
    store.exchangeItem(
      { index: result.source.index, layer: store.getLayer(result.source.droppableId) },
      { index: result.destination.index, layer: store.getLayer(result.destination.droppableId) },
    );
    store.updateFlag = Symbol(1);
    console.log(store, 'sote------------');
    refresh();
  };
  const onDragStart = (initial: DragStart) => {
    const idx = store.layers.findIndex((it) => it.id === initial.source.droppableId);
    store.activeLayer = idx;
  };

  return (
    <div className="area-track">
      <TrackOperate />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className="track-container">
          <Indicator />
          {
        store.layers.map((it) => (
          <div className="track-layer">
            <Droppable key={it.id} droppableId={it.id} direction="horizontal">
              {(provided: DroppableProvided) => (
                <div
                  {...(provided.droppableProps)}
                >
                  <TrackDrop
                    innerRef={provided.innerRef}
                    data={it}
                  />
                  {/* {provided.placeholder} */}
                </div>
              )}
            </Droppable>
          </div>
        ))
      }
        </div>
      </DragDropContext>
    </div>
  );
}

export default Track;
