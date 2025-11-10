import * as react_jsx_runtime from 'react/jsx-runtime';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariantProps = ({
    as?: 'button';
} & ButtonHTMLAttributes<HTMLButtonElement>) | ({
    as: 'a';
} & AnchorHTMLAttributes<HTMLAnchorElement>);
type PrimaryButtonProps = ButtonVariantProps & {
    variant?: 'default' | 'outline';
};
declare function PrimaryButton({ children, className, as, variant, ...props }: PrimaryButtonProps): react_jsx_runtime.JSX.Element;

export { PrimaryButton };
