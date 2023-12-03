'use client'

import clsx from "clsx"
import { IconType } from "react-icons"

interface CategoryInputProps{
    label: string,
    icon: IconType
    isActive?: boolean
    onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({label, icon:Icon, isActive, onClick}) => {
    return (
        <div 
            className={clsx(`
                flex
                flex-col
                gap-3
                p-4
                rounded-xl
                border-2
                cursor-pointer
                transition
                text-neutral-600
                hover:border-rose-400
                hover:text-rose-400`,
                isActive
                ? 'border-rose-500 text-rose-500'
                : 'border-neutral-200'
            )}
            onClick={() => onClick(label)}
        >
            <Icon
                size={30}
                className={clsx(
                    isActive
                    ? 'text-rose-500'
                    : 'text-neutral-500'
                )}
            />
            <div className="font-semibold ">
                { label }
            </div>
        </div>
    )
}

export default CategoryInput