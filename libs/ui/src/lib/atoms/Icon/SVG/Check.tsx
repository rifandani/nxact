import React from 'react';

export default function Check({
  fill = 'none',
  width = 24,
  height = 24,
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12L9.5 16.5L19 7" />
    </svg>
  );
}
