import React from 'react';

export default function Article({
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
      <path d="M19 4H16V2H14V4H10V2H8V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4ZM5 20V6H19L19.002 20H5Z" />
      <path d="M5 10.6667V12H19V10H5V10.6667Z" />
    </svg>
  );
}
