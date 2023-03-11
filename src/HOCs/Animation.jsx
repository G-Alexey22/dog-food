import { motion } from 'framer-motion'

const myCustomVariantsForParent = {
  from: {
    rotateY: -90,
    opacity: 0,
    transition: {
      duration: 1
    },
  },
  to: {
    transformOrigin: "right",
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    transformOrigin: "left",
    rotateY: -90,
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}

export const Animation = (WrappedComponent) => (props) => {
  return (
    <motion.div
      variants={myCustomVariantsForParent}
      initial="from"
      animate="to"
      exit="exit"
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
};
