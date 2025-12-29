'use client';
import Image from 'next/image';
import { motion, cubicBezier } from 'motion/react';

const Discription = () => {
  const hero = {
    hidden: {
      opacity: 0,
      x: -999,
      scale: 1.04,
    },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.3,
        ease: cubicBezier(0.16, 1, 0.3, 1), // 重力感
      },
    },
  };

  return (
    <>
      <div className="flex w-full h-full justify-between pb-3">
        <motion.div
          variants={hero}
          initial="hidden"
          animate="show"
          className="m-auto font-bold space-y-3"
        >
          <motion.h1
            className="text-6xl leading-tight"
            whileHover={{ x: 6, fontSize: '70px' }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            hi, i'm zhangxinxin.
          </motion.h1>

          <motion.h2
            className="text-5xl leading-tight"
            whileHover={{ x: 6, fontSize: '50px' }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            a Node.js full-stack developer.
          </motion.h2>

          <motion.p
            className="text-4xl"
            whileHover={{ x: 6, fontSize: '40px' }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            code · games · english.
          </motion.p>

          <motion.p
            className="text-3xl"
            whileHover={{ x: 6, fontSize: '30px' }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            learning, building, and documenting.
          </motion.p>

          <p className="text-xl text-muted-foreground">
            learning by doing, improving a little every day.
          </p>
        </motion.div>

        <motion.div
          className=" relative w-175 h-full mr-7"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            rotate: 1,
            transition: { type: 'spring', stiffness: 160, duration: 1 },
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
        >
          <Image
            src={'/tiger.png'}
            alt=""
            fill
            quality={100}
            style={{
              borderRadius: '1%',
            }}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Discription;
