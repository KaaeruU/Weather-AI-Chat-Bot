const buttonsVariants = {
  initial: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 }
};

const selectedVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 }
};

const transition = {
  duration: 0.5,
  ease: "easeInOut"
};

export { buttonsVariants, selectedVariants, transition };