import {
  AnimatePresence,
  motion,
  MotionStyle,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const FoldableMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const xDrag = useMotionValue(0);
  const [isFolded, setIsFolded] = useState(true);
  const [showRealMap, setShowRealMap] = useState(false);
  const xLeftSection = useTransform(xDrag, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(xDrag, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  const centerBrightness = useTransform(xDrag, [150, 300], [0.2, 1]);
  const arrowRotation = useTransform(xDrag, [0, 300], [0, 180]);

  // Location coordinates for Avney Hefez, Israel

  useMotionValueEvent(xDrag, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
      // Show real map with a slight delay for smooth transition
      setTimeout(() => setShowRealMap(true), 300);
    } else {
      setIsFolded(true);
      setShowRealMap(false);
    }
  });

  // Initialize Google Maps
  useEffect(() => {
    if (!showRealMap || !mapRef.current) return;

    const location = { lat: 32.3518, lng: 34.9521 };
    let map: google.maps.Map | null = null;
    let marker: google.maps.Marker | null = null;
    let infoWindow: google.maps.InfoWindow | null = null;

    const loadGoogleMapsScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        // Create script element
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = (error) => reject(error);

        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadGoogleMapsScript();

        // Custom map styles

        // Create map instance
        map = new google.maps.Map(mapRef.current as HTMLElement, {
          center: location,
          zoom: 14,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
        });

        // Add animated marker
        marker = new google.maps.Marker({
          position: location,
          map: map,
          title: "Avney Hefez, IL",
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#4f46e5",
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        });

        // Add info window
        infoWindow = new google.maps.InfoWindow({
          content: `<div class="p-2 text-sm font-medium">Avney Hefez, IL 4486100</div>`,
        });

        // Add click listener to marker
        marker.addListener("click", () => {
          infoWindow?.open(map, marker);
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();

    // Cleanup on component unmount or when showRealMap changes
    return () => {
      if (marker) marker.setMap(null);

      // Remove the script if we added it
      const script = document.getElementById("google-maps-script");
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [showRealMap, theme, location]);

  return (
    <div className='overflow-x-clip'>
      <motion.div
        animate={isFolded ? "folded" : "open"}
        variants={{
          open: { scale: 1 },
          folded: { scale: 0.9 },
        }}
        initial='folded'
        className='relative flex flex-col items-center'
      >
        <motion.div
          variants={{ open: { rotate: 0 }, hovering: { rotate: 0 } }}
          whileHover='hovering'
          initial={{ rotate: 3 }}
          className='grid aspect-video max-h-[80vh] w-full min-w-[600px] p-8 relative'
        >
          <div className='grid grid-cols-3 rounded-sm [grid-area:1/1] overflow-hidden'>
            <motion.div
              style={{ x: xLeftSection, skewY: "-1deg" }}
              className='map-image origin-bottom-right border-r border-[rgba(255,255,255,.1)] shadow-2xl'
            />
            <motion.div
              style={
                {
                  scaleX: centerScale,
                  "--brightness": centerBrightness,
                } as MotionStyle
              }
              className='map-image  z-40 brightness-[--brightness] relative'
            >
              {/* Google Maps will appear here when unfolded */}
              <AnimatePresence>
                {showRealMap && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='absolute w-[90dvw] top-0 left-1/2 right-0 bottom-0 -translate-x-1/2 md:w-[80dvw] lg:w-[75dvw]    overflow-hidden'
                    ref={mapRef}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              style={{ x: xRightSection, skewY: "1deg" }}
              className='map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-2xl'
            />
          </div>

          {/* Draggable Handle */}
          <motion.div
            drag='x'
            _dragX={xDrag}
            style={{
              x: xDrag,
              width: "2.5dvw",
              height: "100%",
              minWidth: "40px",
            }}
            dragConstraints={{ left: 0, right: 300 }}
            dragTransition={{
              modifyTarget: (target) => (target > 150 ? 300 : 0),
              timeConstant: 45,
            }}
            className='
              absolute left-32 md:left-1/3 lg:left-2/3 h-full z-50 cursor-grab rounded-md active:cursor-grabbing 
              flex items-center justify-center bg-black/40 hover:bg-black/50
              backdrop-blur-sm transition-colors duration-200 py-8
            '
          >
            <div className='h-full w-full flex flex-col justify-end items-center gap-2 text-white rounded-md'>
              <span className='text-xs sm:px-10 font-medium md:text-sm lg:text-xl text-center [writing-mode:vertical-rl] rounded-md'>
                {isFolded ? "Drag to open" : "Drag to close"}
              </span>
              <motion.span
                style={{ rotate: arrowRotation }}
                className='text-xl font-bold rounded-md'
              >
                →
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={{
            folded: {
              opacity: 0,
              scale: 0.9,
              y: 30,
            },
            open: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          className='flex w-full justify-center text-xl font-semibold md:text-4xl'
        >
          <p className='rounded-2xl bg-white px-12 py-5 text-[hsl(73_69%_26%)]'>
            {showRealMap ? "Avney Hefez, Israel" : "Drag to open the map ☝️"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FoldableMap;
