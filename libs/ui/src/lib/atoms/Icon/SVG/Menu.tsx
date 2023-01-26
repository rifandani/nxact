import React from 'react';

export default function Menu({
  fill = 'currentColor',
  width = 20,
  height = 20,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3C0 1.34315 1.34315 0 3 0H6C7.65685 0 9 1.34315 9 3V6C9 7.65685 7.65685 9 6 9H3C1.34315 9 0 7.65685 0 6V3ZM3 2C2.44772 2 2 2.44772 2 3V6C2 6.55228 2.44772 7 3 7H6C6.55228 7 7 6.55228 7 6V3C7 2.44772 6.55228 2 6 2H3Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 14C0 12.3431 1.34315 11 3 11H6C7.65685 11 9 12.3431 9 14V17C9 18.6569 7.65685 20 6 20H3C1.34315 20 0 18.6569 0 17V14ZM3 13C2.44772 13 2 13.4477 2 14V17C2 17.5523 2.44772 18 3 18H6C6.55228 18 7 17.5523 7 17V14C7 13.4477 6.55228 13 6 13H3Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 14C11 12.3431 12.3431 11 14 11H17C18.6569 11 20 12.3431 20 14V17C20 18.6569 18.6569 20 17 20H14C12.3431 20 11 18.6569 11 17V14ZM14 13C13.4477 13 13 13.4477 13 14V17C13 17.5523 13.4477 18 14 18H17C17.5523 18 18 17.5523 18 17V14C18 13.4477 17.5523 13 17 13H14Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3C11 1.34315 12.3431 0 14 0H17C18.6569 0 20 1.34315 20 3V6C20 7.65685 18.6569 9 17 9H14C12.3431 9 11 7.65685 11 6V3ZM14 2C13.4477 2 13 2.44772 13 3V6C13 6.55228 13.4477 7 14 7H17C17.5523 7 18 6.55228 18 6V3C18 2.44772 17.5523 2 17 2H14Z"
      />
    </svg>
  );
}
