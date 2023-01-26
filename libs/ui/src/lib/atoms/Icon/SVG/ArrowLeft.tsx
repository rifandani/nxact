import React from 'react';

export default function ArrowLeft({
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
      <path d="M19 11H7.83L12.71 6.12001C13.1 5.73001 13.1 5.09001 12.71 4.70001C12.6175 4.6073 12.5076 4.53375 12.3866 4.48357C12.2657 4.43339 12.136 4.40756 12.005 4.40756C11.874 4.40756 11.7443 4.43339 11.6234 4.48357C11.5024 4.53375 11.3925 4.6073 11.3 4.70001L4.71 11.29C4.6173 11.3825 4.54375 11.4924 4.49357 11.6134C4.44339 11.7344 4.41756 11.864 4.41756 11.995C4.41756 12.126 4.44339 12.2557 4.49357 12.3766C4.54375 12.4976 4.6173 12.6075 4.71 12.7L11.3 19.29C11.3926 19.3826 11.5025 19.456 11.6235 19.5061C11.7444 19.5562 11.8741 19.582 12.005 19.582C12.1359 19.582 12.2656 19.5562 12.3865 19.5061C12.5075 19.456 12.6174 19.3826 12.71 19.29C12.8026 19.1974 12.876 19.0875 12.9261 18.9665C12.9762 18.8456 13.002 18.7159 13.002 18.585C13.002 18.4541 12.9762 18.3244 12.9261 18.2035C12.876 18.0825 12.8026 17.9726 12.71 17.88L7.83 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" />
    </svg>
  );
}
