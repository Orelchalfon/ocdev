import { useCallback, useRef } from 'react';
import analyticsService from '../utils/Analytics/analytics';

/**
 * Hook for tracking video playback events
 * 
 * @example
 * const { videoRef, videoEvents } = useVideoTracking('Product Demo', '/videos/demo.mp4');
 * 
 * return (
 *   <video 
 *     ref={videoRef} 
 *     src="/videos/demo.mp4" 
 *     controls 
 *     {...videoEvents} 
 *   />
 * );
 */
const useVideoTracking = (videoTitle: string, videoUrl: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackingPoints = useRef<number[]>([25, 50, 75]);
  const lastTrackedPoint = useRef<number>(-1);

  const handlePlay = useCallback(() => {
    analyticsService.trackVideoEvent({
      videoTitle,
      videoUrl,
      action: 'play'
    });
  }, [videoTitle, videoUrl]);

  const handlePause = useCallback(() => {
    analyticsService.trackVideoEvent({
      videoTitle,
      videoUrl,
      action: 'pause'
    });
  }, [videoTitle, videoUrl]);

  const handleProgress = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const progress = Math.floor((video.currentTime / video.duration) * 100);

    trackingPoints.current.forEach(point => {
      if (progress >= point && lastTrackedPoint.current < point) {
        lastTrackedPoint.current = point;
        analyticsService.trackVideoEvent({
          videoTitle,
          videoUrl,
          action: 'progress',
          progress: point
        });
      }
    });
  }, [videoTitle, videoUrl]);

  const handleEnded = useCallback(() => {
    analyticsService.trackVideoEvent({
      videoTitle,
      videoUrl,
      action: 'complete'
    });
    lastTrackedPoint.current = -1; // Reset for replay
  }, [videoTitle, videoUrl]);

  // Pass this ref to your video element
  const setVideoRef = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
  }, []);

  return {
    videoRef: setVideoRef,
    videoEvents: {
      onPlay: handlePlay,
      onPause: handlePause,
      onTimeUpdate: handleProgress,
      onEnded: handleEnded
    }
  };
};

export default useVideoTracking; 