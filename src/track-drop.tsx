import { Resizable } from 're-resizable';
import React, { useContext } from 'react';
import {
  Draggable, DraggableProvided,
} from 'react-beautiful-dnd';
import Context from './context';
import Fragment from './fragment';
import Layer from './store/layer';

function TrackDrop({ innerRef, data }: {innerRef:any, data: Layer}) {
  // const { state } = useContext(Context);
  return (
    <div
      ref={innerRef}
      style={{
        display: 'flex', alignItems: 'start',
      }}
    >
      {
            data.items.map((it, i) => (
              <Draggable key={it.id} draggableId={String(it.id)} index={i}>
                {(p: DraggableProvided) => (
                  <Fragment data={it} p={p} />
                )}
              </Draggable>
            ))
          }
    </div>
  );
}

export default TrackDrop;
