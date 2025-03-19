import { motion, SVGMotionProps, Variants } from "framer-motion";

// Define proper type for Path component props
type PathProps = SVGMotionProps<SVGPathElement>;

const Path = (props: PathProps) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='currentColor'
    strokeLinecap='round'
    {...props}
  />
);

const pathVariants: Variants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

interface MenuToggleProps {
  toggle: () => void;
}

export const MenuToggle = ({ toggle }: MenuToggleProps) => (
  <button
    type='button'
    aria-label='toggle-btn'
    onClick={toggle}
    className='flex items-center justify-center focus:outline-none'
  >
    <svg width='23' height='23' viewBox='0 0 23 23'>
      <Path
        d='M 2 2.5 L 20 2.5'
        variants={pathVariants}
        transition={{ duration: 0.1 }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);
