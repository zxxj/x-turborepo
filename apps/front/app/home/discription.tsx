'use client';
import Image from 'next/image';
import { motion, cubicBezier } from 'motion/react';
import { useEffect, useState } from 'react';

const Discription = () => {
  // 监听滚动,控制down图标状态
  const [down, setDown] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setDown(false);
      } else {
        setDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex w-full h-full lg:justify-between lg:flex-row flex-col pb-3">
        <motion.div
          variants={hero}
          initial="hidden"
          animate="show"
          className="lg:m-auto mx-3 mt-2 font-bold space-y-3 border rounded-2xl p-6"
        >
          <motion.h1
            className="text-5xl lg:leading-tight leading-none"
            whileHover={{ x: 6, fontSize: '70px' }}
            transition={{ type: 'spring', stiffness: 160 }}
          >
            hi, i'm zhangxinxin.
          </motion.h1>

          <motion.h2 className="lg:text-5xl lg:leading-tight leading-none">
            a node.js full-stack developer.
          </motion.h2>

          <motion.p className="lg:text-4xl leading-none">
            code · games · english.
          </motion.p>

          <motion.p className="lg:text-xl text-muted-foreground leading-none">
            learning, building, and documenting.
          </motion.p>

          <motion.ul className="flex justify-end items-center lg:top-0 relative top-3">
            <motion.li
              className="relative lg:w-14 lg:h-14 w-6 h-6 cursor-pointer ml-3"
              whileHover={{ rotate: 30, scale: 1.1 }}
              transition={{ duration: 0.3, ease: 'linear' }}
            >
              <a
                href="https://juejin.cn/user/730542927514631"
                target="_black"
                className="w-full h-full relative inline-block"
              >
                <Image src={'/juejin.svg'} alt="稀土掘金" fill />
              </a>
            </motion.li>
            <motion.li
              className="relative lg:w-14 lg:h-14 w-8 h-8 cursor-pointer ml-3"
              whileHover={{ rotate: 30, scale: 1.1 }}
              transition={{ duration: 0.3, ease: 'linear' }}
            >
              <a
                href="https://music.163.com/#/user/home?id=1840906047"
                target="_black"
                className="w-full h-full relative inline-block"
              >
                <Image src={'/wangyiyun.svg'} alt="网易云音乐" fill />
              </a>
            </motion.li>
            <motion.li
              className="relative lg:w-12 lg:h-12 w-7 h-7 cursor-pointer ml-3"
              whileHover={{ rotate: 30, scale: 1.1 }}
              transition={{ duration: 0.3, ease: 'linear' }}
            >
              <a
                href="https://github.com/zxxj"
                target="_black"
                className="w-full h-full relative inline-block"
              >
                <Image
                  src={'/github.svg'}
                  alt="Github"
                  fill
                  className=" rounded-[10px]"
                />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative lg:w-175 lg:h-full w-[calc(100%-10px)] h-full mr-7 "
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            rotate: 1,
            transition: { type: 'spring', stiffness: 200, damping: 50 },
            opacity: 1,
            scale: 0.95,
          }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1, transition: { duration: 0.5 } }}
        >
          <Image
            src={'/tiger.png'}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            style={{
              borderRadius: '1%',
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className={
          down
            ? 'w-full h-14 flex justify-center relative opacity-100'
            : 'opacity-0'
        }
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src={'/down-white.svg'}
          alt="down"
          width={50}
          height={50}
          className=" absolute -top-22.5  hidden dark:block"
        />

        <Image
          src={'/down-black.svg'}
          alt="down"
          width={50}
          height={50}
          className=" absolute -top-22.5 block dark:hidden"
        />
      </motion.div>
    </>
  );
};

export default Discription;
