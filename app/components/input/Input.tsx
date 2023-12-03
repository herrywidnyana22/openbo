'use client'

import clsx from "clsx"
import { useCallback, useState } from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"
import { FaRupiahSign } from "react-icons/fa6"

interface InputProps{
    id: string
    label: string
    type?: string
    disabled?: boolean
    isPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type= "text", 
    disabled,
    isPrice,
    required,
    register,
    errors
}) => {

    return (
        <div className="
            relative
            w-full
        ">
        {
            isPrice && (
                <FaRupiahSign
                    size={24}
                    className="
                        absolute
                        top-5
                        left-2
                        text-neutral-700
                    "
                />
            )
        }
            <input
                id={id}
                disabled={disabled}
                placeholder=" "
                type={type}
                {...register(id, { required })}
               
                className={clsx(`
                    w-full
                    peer
                    p-4
                    pt-6
                    font-light
                    rounded-md
                    border-2
                    outline-none
                    transition
                    bg-white
                    disabled:opacity-70
                    disabled:cursor-not-allowed`,

                    isPrice
                    ? 'pl-10'
                    : 'pl-4',

                    errors[id]
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-neutral-300 focus:border-black'
                
                )}
            />
            <label className={clsx(`
                absolute
                top-5
                text-md
                duration-150
                transform
                -translate-y-4
                origin-[0]
                z-10
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4`,                

                isPrice
                ? 'left-11'
                : 'left-4',

                errors[id] 
                ? 'text-rose-500'
                : 'text-zinc-400'

            )}>
                { label }
            </label>
        </div>
    )
}

export default Input