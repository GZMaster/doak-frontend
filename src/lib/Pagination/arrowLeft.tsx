import React from "react";
import { SVGProps } from "react";

function ArrowLeft(props: SVGProps<SVGSVGElement>) {
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
        d="M7.59.577a.833.833 0 010 1.179l-4.411 4.41h9.654a.833.833 0 110 1.667H3.18l4.41 4.411a.833.833 0 11-1.178 1.179L.577 7.589a.833.833 0 010-1.178L6.411.577a.833.833 0 011.178 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ArrowLeft;
