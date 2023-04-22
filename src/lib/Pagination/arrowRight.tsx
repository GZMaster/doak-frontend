import React from "react";
import { SVGProps } from "react";

function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      {...props}
    >
      <path
        fill="#1D2433"
        fillRule="evenodd"
        d="M6.41.577a.833.833 0 011.18 0l5.833 5.834a.833.833 0 010 1.178l-5.834 5.834a.833.833 0 01-1.178-1.179l4.41-4.41H1.168a.833.833 0 110-1.667h9.654l-4.41-4.411a.833.833 0 010-1.179z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ArrowRight;
