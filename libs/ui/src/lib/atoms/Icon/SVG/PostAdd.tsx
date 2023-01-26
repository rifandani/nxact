import React from 'react';

export default function Settings({
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
      <path d="M16.8158 19.2434H4.97368V7.18421H11.8816V5.21053H4.97368C3.88816 5.21053 3 6.09868 3 7.18421V19.0263C3 20.1118 3.88816 21 4.97368 21H16.8158C17.9013 21 18.7895 20.1118 18.7895 19.0263V12.1184H16.8158V19.2434Z" />
      <path d="M18.7895 2.25H16.8158V5.21053H13.8553C13.8651 5.22039 13.8553 7.18421 13.8553 7.18421H16.8158V10.1349C16.8256 10.1447 18.7895 10.1349 18.7895 10.1349V7.18421H21.75V5.21053H18.7895V2.25Z" />
      <rect x="6.94736" y="9.1579" width="7.89474" height="1.97368" />
      <path d="M6.94736 12.1184V14.0921H14.8421V12.1184H11.8816H6.94736Z" />
      <rect x="6.94736" y="15.0789" width="7.89474" height="1.97368" />
    </svg>
  );
}
