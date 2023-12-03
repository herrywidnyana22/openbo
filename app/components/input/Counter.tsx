'use client'

import { useCallback } from "react"
import { FiMinus, FiPlus} from "react-icons/fi"

interface CounterProps{
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

const Counter:React.FC<CounterProps> = ({title, subtitle, value, onChange}) => {

    const onPlus = useCallback(() =>{
        onChange(value + 1)
    },[onChange, value])

    const onMin = useCallback(() =>{
        if(value === 1) return

        onChange(value - 1)

    },[value, onChange])
    return (
        <div className="
            flex
            flex-row
            justify-between
            items-center
        ">
            <div className="
                flex
                flex-col
            ">
                <div className="
                    font-medium
                ">
                    {title}
                </div>
                <div className="
                    font-light
                    text-gray-600
                ">
                    {subtitle}
                </div>
            </div>
            <div className="
                flex
                flex-row
                items-center
                gap-4
            ">
                <div
                    className="
                        flex
                        justify-center
                        items-center
                        w-10 
                        h-10
                        rounded-full
                        border-[1px]
                        text-neutral-600
                        cursor-pointer
                        hover:border-red-400
                        hover:text-red-400
                        transition
                    " 
                
                    onClick={onMin}
                >
                    <FiMinus/>
                </div>
                <div className="
                    text-xl
                    font-light
                    text-neutral-600
                ">
                    {value}
                </div>
                <div
                    className="
                        flex
                        justify-center
                        items-center
                        w-10 
                        h-10
                        rounded-full
                        border-[1px]
                        text-neutral-600
                        cursor-pointer
                        hover:border-green-400
                        hover:text-green-400
                        transition
                    " 
                
                    onClick={onPlus}
                >
                    <FiPlus/>
                </div>
            </div>
        </div>
    )
}

export default Counter