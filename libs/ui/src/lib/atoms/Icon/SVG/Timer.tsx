import React from 'react';

export default function Timer({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.75H15V2.75H9V0.75ZM13 7.75V13.75H11V7.75H13ZM19.03 7.14L20.45 5.72C20.02 5.21 19.55 4.73 19.04 4.31L17.62 5.73C16.07 4.49 14.12 3.75 12 3.75C7.03 3.75 3 7.78 3 12.75C3 17.72 7.02 21.75 12 21.75C16.98 21.75 21 17.72 21 12.75C21 10.63 20.26 8.68 19.03 7.14ZM5 12.75C5 16.62 8.13 19.75 12 19.75C15.87 19.75 19 16.62 19 12.75C19 8.88 15.87 5.75 12 5.75C8.13 5.75 5 8.88 5 12.75Z"
      />
    </svg>
  );
}
