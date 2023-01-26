import React from 'react';

export default function Home({
  fill = 'currentColor',
  width = 24,
  height = 24,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
    </svg>
  );
}
