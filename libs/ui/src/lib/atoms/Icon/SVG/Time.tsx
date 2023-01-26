import React from 'react';

export default function Time({
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
      <path d="M12 1C5.9346 1 1 5.9346 1 12C1 18.0654 5.9346 23 12 23C18.0654 23 23 18.0654 23 12C23 5.9346 18.0654 1 12 1ZM12 20.8C7.1479 20.8 3.2 16.8521 3.2 12C3.2 7.1479 7.1479 3.2 12 3.2C16.8521 3.2 20.8 7.1479 20.8 12C20.8 16.8521 16.8521 20.8 12 20.8Z" />
      <path d="M13.1 6.5H10.9V12.4554L14.5223 16.0777L16.0777 14.5223L13.1 11.5446V6.5Z" />
    </svg>
  );
}
