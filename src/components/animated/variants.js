export const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100%",
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    // x: "100%",
    transition: {
      duration: 0.2,
    },
  },
};

export const actionModalVariants = {
  initial: {
    opacity: 0,
    y: "-10%",
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: "-10%",
    transition: {
      duration: 0.2,
    },
  },
};
