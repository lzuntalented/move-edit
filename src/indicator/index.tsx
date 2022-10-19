import React, { useContext, useEffect, useRef } from 'react';
import Context from '../context';
import store from '../store';
import { formatTime, setupCanvas } from '../utils';
import './index.scss';

function Indicator() {
  const { refresh } = useContext(Context);
  const total = store.getTotalTime();
  const lines = new Array(Math.ceil(total / store.timerScale)).fill(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      lines.forEach((line, i) => {
        const x = i * 10;
        const y = 0;
        const height = i % 5 === 0 ? 10 : 5;
        ctx.strokeStyle = '#cdd5de';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height);
        ctx.stroke();
        if (i % 10 === 0 && i !== 0) {
          const timeStr = `${Math.floor((i * store.timerScale) / 1000)}s`;
          ctx.fillStyle = '#262e48';
          ctx.fillText(timeStr, x, y + (height * 2));
        }
      });
    }
  }, [total]);

  return (
    <div className="indicator" style={{ width: lines.length * 10 + 10 * 10 }}>
      <div className="indicator-point" style={{ left: store.currentTime / 10 }} />
      <canvas
        onClick={(e) => {
          const x = e.clientX;
          const { x: elx } = (e.target as HTMLCanvasElement).getBoundingClientRect();
          const time = (x - elx) / store.timerScale;
          store.setCurrentTime(time * 1000);
          store.pause();
          refresh();
        }}
        ref={canvasRef}
        width={lines.length * 10 + 10 * 10}
        height={30}
      />
    </div>
  );
}

export default Indicator;
