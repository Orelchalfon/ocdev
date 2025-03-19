import React, { forwardRef } from "react";
import useVideoTracking from "../../hooks/useVideoTracking";

interface TrackedVideoProps {
  src: string;
  title: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  playsInline?: boolean;
}

/**
 * A video component with built-in analytics tracking
 * Tracks video play, pause, progress, and completion events
 *
 * @example
 * <TrackedVideo
 *   src="/videos/demo.mp4"
 *   title="Product Demo"
 *   controls
 *   poster="/images/poster.jpg"
 * />
 */
const TrackedVideo = forwardRef(function TrackedVideo(
  props: TrackedVideoProps,
  ref
) {
  const {
    src,
    title,
    className = "",
    poster,
    autoPlay = false,
    muted = false,
    controls = true,
    loop = false,
    preload = "metadata",
    playsInline = true,
  } = props;
  const {  videoEvents } = useVideoTracking(title, src);

  return (
    <video
      ref={ref as React.RefObject<HTMLVideoElement>}
      className={`max-w-full ${className}`}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      loop={loop}
      preload={preload}
      playsInline={playsInline}
      {...videoEvents}
    >
      <source src={src} type={`video/${src.split(".").pop()}`} />
      Your browser does not support the video tag.
    </video>
  );
});

export default TrackedVideo;
