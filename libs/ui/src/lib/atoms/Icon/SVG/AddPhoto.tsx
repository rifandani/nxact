import React from 'react';

export default function AddPhoto({
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
        d="M3 1V4H0V6H3V9H5V6H8V4H5V1H3ZM6 7V10H3V20C3 21.1 3.9 22 5 22H21C22.1 22 23 21.1 23 20V8C23 6.9 22.1 6 21 6H17.83L16 4H9V7H6ZM13 19C15.76 19 18 16.76 18 14C18 11.24 15.76 9 13 9C10.24 9 8 11.24 8 14C8 16.76 10.24 19 13 19ZM13 17.2C11.23 17.2 9.8 15.77 9.8 14C9.8 12.23 11.23 10.8 13 10.8C14.77 10.8 16.2 12.23 16.2 14C16.2 15.77 14.77 17.2 13 17.2Z"
      />
    </svg>
  );
}
