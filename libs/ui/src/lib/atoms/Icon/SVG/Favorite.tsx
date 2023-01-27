import React from 'react';

export default function Favorite({
  fill = 'currentColor',
  width = 18,
  height = 17,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.0258 0C14.4309 0 15.6112 0.477752 16.5667 1.43326C17.5222 2.38876 18 3.55503 18 4.93208C18 5.60656 17.8595 6.28806 17.5785 6.97658C17.2974 7.66511 16.9883 8.27635 16.6511 8.8103C16.3138 9.34426 15.7447 10.0328 14.9438 10.8759C14.1429 11.719 13.4684 12.4005 12.9204 12.9204C12.3724 13.4403 11.4941 14.2342 10.2857 15.3021L8.97892 16.4824L7.67213 15.3443C6.4918 14.2482 5.62061 13.4403 5.05855 12.9204C4.49649 12.4005 3.81499 11.719 3.01405 10.8759C2.21311 10.0328 1.64403 9.34426 1.30679 8.8103C0.969555 8.27635 0.667447 7.66511 0.400468 6.97658C0.133489 6.28806 0 5.60656 0 4.93208C0 3.55503 0.477752 2.38876 1.43326 1.43326C2.38876 0.477752 3.55503 0 4.93208 0C6.56206 0 7.91101 0.632318 8.97892 1.89696C10.0468 0.632318 11.3958 0 13.0258 0ZM9.06323 13.9953C10.4403 12.7588 11.445 11.8384 12.0773 11.2342C12.7096 10.63 13.4052 9.90632 14.1639 9.06323C14.9227 8.22014 15.4496 7.48244 15.7447 6.85012C16.0398 6.2178 16.1874 5.57845 16.1874 4.93208C16.1874 4.03279 15.8852 3.28806 15.281 2.69789C14.6768 2.10773 13.9251 1.81265 13.0258 1.81265C12.3513 1.81265 11.7119 2.00937 11.1077 2.40281C10.5035 2.79625 10.0749 3.30211 9.82201 3.92037H8.13583C7.91101 3.30211 7.49649 2.79625 6.89227 2.40281C6.28806 2.00937 5.63466 1.81265 4.93208 1.81265C4.03279 1.81265 3.28806 2.10773 2.69789 2.69789C2.10773 3.28806 1.81265 4.03279 1.81265 4.93208C1.81265 5.57845 1.95316 6.2178 2.23419 6.85012C2.51522 7.48244 3.04215 8.22014 3.81499 9.06323C4.58782 9.90632 5.2904 10.63 5.92272 11.2342C6.55504 11.8384 7.54567 12.7588 8.89461 13.9953L8.97892 14.0796L9.06323 13.9953Z" />
    </svg>
  );
}