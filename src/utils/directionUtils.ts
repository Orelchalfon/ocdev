import { useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const useDirectionClasses = () => {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  
  return useMemo(() => ({
    textAlign: isRTL ? 'text-right' : 'text-left',
    flexDirection: isRTL ? 'flex-row-reverse' : 'flex-row',
    gridColumns: isRTL ? 'md:col-start-2' : '',
    techSpherePosition: isRTL ? 'md:col-start-1 row-start-1' : '',
    marginClasses: isRTL ? 'ml-2' : 'mr-2',
    // Add more standardized direction classes as needed
  }), [isRTL]);
};

export const useIsRTL = () => {
  const { language } = useLanguage();
  return language === 'he';
};
