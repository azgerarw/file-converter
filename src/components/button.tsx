import { ReactNode } from 'react';

type ButtonProps = {
  id?: string;
  onClick?: (e: unknown) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function Button({id, onClick, children}: ButtonProps) {

    return <button id={id} type="button" disabled={false} onClick={onClick} className="bg-green-600 text-white p-2 w-fit h-10 cursor-pointer hover:bg-green-500 active:scale-95 transition-transform rounded-[5px] ">{children}</button>
}