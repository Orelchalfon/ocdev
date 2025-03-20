import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <motion.div
        className='w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full'
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
