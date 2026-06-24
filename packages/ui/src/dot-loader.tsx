import { cn } from './utils';

type DotSize = 'sm' | 'md' | 'lg' | 'xl';
type DotSpeed = 'slow' | 'normal' | 'fast';

export interface DotLoaderProps {
  speed?: DotSpeed;
  size?: DotSize;
  color?: string;
  className?: string;
}

const sizeMap: Record<DotSize, number> = {
  sm: 28,
  md: 56,
  lg: 84,
  xl: 112,
};

const speedMsMap: Record<DotSpeed, number> = {
  slow: 4800,
  normal: 2400,
  fast: 1200,
};

const positions = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 5 }, (_, col) => ({
    x: 6 + col * 11,
    y: 6 + row * 11,
    delay: (4 - row) * 240 + col * 96,
  })),
).flat();

const DotLoader = ({
  speed = 'normal',
  size = 'md',
  color = '#ffffff',
  className,
}: DotLoaderProps) => {
  const pixelSize = sizeMap[size];
  const duration = speedMsMap[speed];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      width={pixelSize}
      height={pixelSize}
      role="img"
      aria-label="Loading"
      className={cn(className)}
      style={{ '--dot-color': color, '--anim-duration': `${duration}ms` } as React.CSSProperties}
    >
      <title>Loading</title>
      <desc>Each column fills bottom-up, then releases as one.</desc>
      <defs>
        <circle id="b" r="2.4" />
        <circle id="l" r="3.1" />
      </defs>
      <style>{`
				.l {
					fill: var(--dot-color, #ffffff);
					opacity: 0;
					animation: compile var(--anim-duration, 2400ms) cubic-bezier(0.65, 0, 0.35, 1) infinite both;
				}
				@keyframes compile {
					0% { opacity: 0.08; }
					14% { opacity: 1; }
					72% { opacity: 0.95; }
					100% { opacity: 0.08; }
				}
				@media (prefers-reduced-motion: reduce) {
					.l { animation: none; opacity: 0.45; }
				}
			`}</style>
      {positions.map((pos) => (
        <use key={`b-${pos.x}-${pos.y}`} href="#b" x={pos.x} y={pos.y} opacity="0.07" />
      ))}
      {positions.map((pos) => (
        <use
          key={`l-${pos.x}-${pos.y}`}
          className="l"
          href="#l"
          x={pos.x}
          y={pos.y}
          style={{ animationDelay: `${pos.delay}ms` }}
        />
      ))}
    </svg>
  );
};

export { DotLoader };
