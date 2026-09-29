import type { ReactNode } from "react";
import "./AppBackground.css";

type AppBackgroundProps = {
  children: ReactNode;
  className?: string;
};

// Same quadratic curves as the original CSS shape, in a 100 × 100 viewBox.
const rightBlobPath =
  "M 26.32 75.96 Q 22.15 73.04 15.51 70.35 T 5.91 61.66 T 7.34 49.64 T 10.15 36.76 T 13.07 25.25 T 22.26 16.41 T 33.43 12.39 T 45.38 12.83 T 55.98 14.11 T 66.93 15.71 T 74.27 22.50 T 84.48 30.06 T 96.17 37.77 T 95.22 50.49 T 86.67 61.22 T 79.05 69.58 T 75.00 81.43 T 67.04 88.43 T 54.60 89.12 T 43.77 88.42 T 34.47 82.56 T 26.32 75.96 Z";

export default function AppBackground({ children }: AppBackgroundProps) {
  return (
    <div className="app-background">
      <div className="background-blobs" aria-hidden="true">
        <svg className="blob blob-blue" viewBox="0 0 100 100" focusable="false">
          <g className="blob-outline-fade">
            <path
              className="blob-outline"
              d={rightBlobPath}
              transform="translate(0 7)"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <path className="blob-fill" d={rightBlobPath} />
        </svg>
        <div className="background-waves">
          <div className="wave wave-blue" />
          <div className="wave wave-plum" />
        </div>
      </div>

      <div className="background-content">{children}</div>
    </div>
  );
}
