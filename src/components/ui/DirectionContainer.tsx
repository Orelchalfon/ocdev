import React from 'react';
import { useIsRTL } from '../../utils/directionUtils';

interface DirectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const DirectionContainer: React.FC<DirectionContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div' 
}) => {
  const isRTL = useIsRTL();
  
  return (
    <Component className={`${isRTL ? 'rtl' : 'ltr'} ${className}`}>
      {children}
    </Component>
  );
};

export default DirectionContainer;
