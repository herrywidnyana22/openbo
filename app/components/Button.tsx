'use client'

import clsx from "clsx"
import { IconType } from "react-icons"

interface ButtonProps{
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
  return (
    <button
        onClick={onClick} 
        disabled={disabled}
        className= {clsx(`
            relative
            w-full
            rounded-lg
            transition
            hover:opacity-80
            disabled:opacity-70
            disabled:cursor-not-allowed`,
            outline 
            ? 'bg-white border-black text-black'
            : 'bg-rose-500 border-rose-500 text-white',

            small
            ? 'py-1 text-sm font-light border-[1px]'
            : 'py-3 text-md font-semibold border-2'
        )}
    >
        {
            Icon && (
                <Icon
                    size={24} 
                    className=" 
                        absolute 
                        left-4 
                        top-3
                    "
                />
            )
        }
        { label }
    </button>
  )
}

export default Button