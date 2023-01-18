import { MouseEventHandler, PropsWithChildren } from 'react';
import '../../index.css';

export interface ButtonProps extends PropsWithChildren<HTMLButtonElement> {
  onClick?: () => MouseEventHandler<HTMLButtonElement>;
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="inline-block px-6 py-3 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
