// src/primary-button.tsx
import { twMerge } from "tailwind-merge";
import { jsx } from "react/jsx-runtime";
function PrimaryButton({
  children,
  className,
  as = "button",
  variant = "default",
  ...props
}) {
  const styles = variant === "outline" ? "border border-white/20 bg-transparent text-white hover:border-white hover:bg-white/10" : "bg-white text-black hover:bg-white/80";
  const sharedClassName = twMerge(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    styles,
    className
  );
  if (as === "a") {
    const anchorProps = props;
    return /* @__PURE__ */ jsx("a", { className: sharedClassName, ...anchorProps, children });
  }
  const buttonProps = props;
  return /* @__PURE__ */ jsx("button", { type: buttonProps.type ?? "button", className: sharedClassName, ...buttonProps, children });
}
export {
  PrimaryButton
};
