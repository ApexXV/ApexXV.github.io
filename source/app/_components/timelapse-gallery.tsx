"use client";

import { useEffect, useRef } from "react";

export type Timelapse = {
  name: string;
  title: string;
  caption: string;
};

// Silent looping clips that play only while on screen. Nothing downloads until a clip is
// near the viewport, and viewers who ask for reduced motion get the poster with controls.
function Clip({ clip }: { clip: Timelapse }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") video.preload = "auto";
          video.play().catch(() => {
            video.controls = true;
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="equipment-photo timelapse">
      <div className="timelapse-frame">
        <video
          ref={ref}
          poster={`/video/${clip.name}-poster.webp`}
          width={960}
          height={590}
          muted
          loop
          playsInline
          preload="none"
          aria-label={`Timelapse: ${clip.title}`}
        >
          <source src={`/video/${clip.name}.mp4`} type='video/mp4; codecs="avc1.640028"' />
          <source src={`/video/${clip.name}.webm`} type='video/webm; codecs="vp9"' />
        </video>
      </div>
      <figcaption>
        <strong>{clip.title}.</strong> {clip.caption}
      </figcaption>
    </figure>
  );
}

export function TimelapseGallery({ clips }: { clips: Timelapse[] }) {
  return (
    <div className="timelapse-grid">
      {clips.map((clip) => (
        <Clip key={clip.name} clip={clip} />
      ))}
    </div>
  );
}
