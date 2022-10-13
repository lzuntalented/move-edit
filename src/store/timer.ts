type Callback = (v: number) => void
export class Timer {
  current = 0;

  lastTime = 0;

  firstRecordTime = false;

  lastTimeRange = 0;

  updateCallback?: Callback;

  private handler: number = 0;

  setUpdateCallback(cb: Callback) {
    this.updateCallback = cb;
  }

  start() {
    this.handler = window.requestAnimationFrame(this.update);
  }

  private update = (num: number) => {
    if (!this.firstRecordTime) {
      this.firstRecordTime = true;
      this.lastTime = num;
    }

    this.current = this.lastTimeRange + (num - this.lastTime);
    // console.log('sdfsd----------', this.lastTimeRange, `${this.current}: ${num}`);
    if (this.updateCallback) this.updateCallback(this.current);

    this.start();
  };

  stop = () => {
    this.lastTimeRange = this.current;
    this.firstRecordTime = false;
    console.log('lastTimeRange----------', `${this.current}`);
    window.cancelAnimationFrame(this.handler);
  };

  resetCurrentTime = (num: number) => {
    this.lastTimeRange = num;
    this.current = num;
  };
}

export default Timer;
