import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={`${rest.className} 
      border border-solid border-gray-400 rounded-sm 
      px-2
      disabled:bg-gray-300 disabled:text-gray-400 
      disabled:hover:border-inherit
      transition-colors duration-200
      hover:border-green-600


      `}
    >
      {children}
    </button>
  );
};

export default Button;
