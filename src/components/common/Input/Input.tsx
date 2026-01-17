import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={`
        ${rest.className} 
      px-2 
      border border-gray-400 rounded-sm 
      transition-colors duration-200 
      outline-1 outline-transparent
      hover:border-green-600 
      focus:border-green-600  focus:outline-green-600`}
    />
  );
};

export default Input;
