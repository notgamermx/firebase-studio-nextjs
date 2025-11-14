import type { SVGProps } from 'react';

export function NovaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L9.92944 9.92944L2 12L9.92944 14.0706L12 22L14.0706 14.0706L22 12L14.0706 9.92944L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
