import React from 'react';

export default function MarkEmailRead({
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
        d="M12.1559 18.8364C12.1559 14.9898 15.2777 11.8788 19.1377 11.8788C20.2149 11.8788 21.2222 12.1273 22.1299 12.5547V5.91515C22.1299 4.82182 21.2322 3.92727 20.1351 3.92727H4.17663C3.07949 3.92727 2.18182 4.82182 2.18182 5.91515V17.8424C2.18182 18.9358 3.07949 19.8303 4.17663 19.8303H12.2356C12.1858 19.5023 12.1559 19.1743 12.1559 18.8364ZM4.17663 5.91515L12.1559 10.8848L20.1351 5.91515V7.90303L12.1559 12.8727L4.17663 7.90303V5.91515ZM13.9512 18.2996L17.482 21.8182L23.1273 16.1925L21.701 14.791L17.472 19.0053L15.3575 16.8982L13.9512 18.2996Z"
      />
    </svg>
  );
}
