import React from 'react';

export default function VolunteerActivism({
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
      <rect x="1.5" y="11.3625" width="3.95455" height="11.1375" />
      <path d="M16.3295 3.51563C16.9722 2.74613 17.9707 2.25 18.9989 2.25C20.8278 2.25 22.2614 3.71813 22.2614 5.59125C22.2614 7.88963 19.3844 10.5525 16.3295 13.3875C13.2747 10.5424 10.3977 7.8795 10.3977 5.59125C10.3977 3.71813 11.8312 2.25 13.6602 2.25C14.6884 2.25 15.6869 2.74613 16.3295 3.51563Z" />
      <path d="M20.2841 17.4375H13.3636L11.2974 16.6984L11.6236 15.7466L13.3636 16.425H16.1516C16.7942 16.425 17.3182 15.8884 17.3182 15.2302V15.2302C17.3182 14.7341 17.0117 14.2886 16.5569 14.1064L9.37943 11.3625H7.43182V20.4952L14.3523 22.5L22.2712 19.4625V19.4625C22.2614 18.3487 21.3815 17.4375 20.2841 17.4375Z" />
    </svg>
  );
}
