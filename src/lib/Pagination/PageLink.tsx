import React from "react";
import { HTMLProps } from "react";

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  const customClassName = `pagination__link ${disabled ? "disabled" : ""} ${
    active ? "active" : ""
  }`;
  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? "page" : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}
