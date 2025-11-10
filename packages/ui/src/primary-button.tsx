import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariantProps =
  | ({
      as?: 'button';
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      as: 'a';
    } & AnchorHTMLAttributes<HTMLAnchorElement>);

type PrimaryButtonProps = ButtonVariantProps & {
  variant?: 'default' | 'outline';
};

export function PrimaryButton({
  children,
  className,
  as = 'button',
  variant = 'default',
  ...props
}: PrimaryButtonProps) {
  const styles =
    variant === 'outline'
      ? 'border border-white/20 bg-transparent text-white hover:border-white hover:bg-white/10'
      : 'bg-white text-black hover:bg-white/80';
  const sharedClassName = twMerge(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
    styles,
    className
  );

  if (as === 'a') {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={sharedClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={buttonProps.type ?? 'button'} className={sharedClassName} {...buttonProps}>
      {children}
    </button>
  );
}

