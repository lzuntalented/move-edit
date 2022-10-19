export class Transition {
  // 持续时间
  duration: number;

  current: Motion;

  next: Motion;
}

export class MotionAttribute {
  opacity: number;
}

export class Motion {
  from: MotionAttribute;

  to: MotionAttribute;
}

export class TransitionZoomIn extends Transition {
  duration: number = 1000;

  current: Motion = {
    from: {
      opacity: 1,
    },

    to: {
      opacity: 0,
    },
  };

  next: Motion = {
    from: {
      opacity: 0,
    },

    to: {
      opacity: 1,
    },
  };
}
