import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo1 from '../../imgs/logo1.png';

function RollingImage() {
  const rollingAnimation = useSpring({
    from: {
      transform: 'translateX(0px) rotate(0deg)',
    },
    to: async (next) => {
      while (true) {
        await next({
          transform: 'translateX(100px) rotate(180deg)',
          config: { duration: 2000 },
        });
        await next({
          transform: 'translateX(0px) rotate(0deg)',
          config: { duration: 0 },
        });
      }
    },
    config: { duration: 0 },
  });

  return (
    <animated.div
      style={{
        width: '500px',
        height: '500px',
        backgroundImage: `url(${logo1}) `,
        ...rollingAnimation,
      }}
    ></animated.div>
  );
}

export default RollingImage;
