import React, { useEffect, useState } from 'react'

import {
  POINT_LEFT_CENTER, POINT_RIGHT_CENTER, POINT_TOP_CENTER, POINT_BOTTOM_CENTER,
  POINT_LEFT_TOP, POINT_RIGHT_TOP, POINT_LEFT_BOTTOM, POINT_RIGHT_BOTTOM, POINT_ROTATE,
} from '../common/config';

interface Props {
  onChange(): void
  children: React.ReactElement
}

function Move(props: Props){
  const { children, ...others } = props
  const ref = React.useRef<HTMLDivElement>()
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height:0,
  });
  useEffect(() => {
    if (ref?.current) {
      const rect = ref.current?.getBoundingClientRect();
      setRect({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      })
    }
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    e.stopPropagation()
  };
  return (
    <>
    {
      React.cloneElement(children, {
        ref,
        ...others
      })
    }
    <div className='area-move'>
    <ul
          className="ctrl-container"
          // key={uniqueId}
          onMouseDown={onMouseDown}
          style={{
            position: 'fixed',
            width: rect.width,
            left: rect.x,
            top: rect.y,
            height: rect.height,
            // transform: `rotate(${rotate}deg)`,
            // transformOrigin: `${origin.x}px ${origin.y}px`,
          }}
        >
          <li className="line t">
            <span
              className="point tc"
              data-key={POINT_TOP_CENTER}
            />
          </li>
          <li className="line b">
            <span
              className="point bc"
              data-key={POINT_BOTTOM_CENTER}
            />
          </li>
          <li className="line l">
            <span
              className="point lc"
              data-key={POINT_LEFT_CENTER}
            />
            <span
              className="point lt"
              data-key={POINT_LEFT_TOP}
            />
            <span
              className="point lb"
              data-key={POINT_LEFT_BOTTOM}
            />
          </li>
          <li className="line r">
            <span
              className="point rc"
              data-key={POINT_RIGHT_CENTER}
            />
            <span
              className="point rt"
              data-key={POINT_RIGHT_TOP}
            />
            <span
              className="point rb"
              data-key={POINT_RIGHT_BOTTOM}
            />
          </li>
          <li className="line link-rotate" />
          <li
            className="point rotate"
            data-key={POINT_ROTATE}
          />
        </ul>
    </div>
    </>
  )
}

export default Move