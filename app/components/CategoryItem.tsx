'use client'
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import {IconType} from "react-icons"
import query from "query-string"

interface CategoryItemProps{
    title: string
    desc?: string
    icon: IconType
    isActive?: boolean
}

const CategoryItem:React.FC<CategoryItemProps> = ({title, icon: Icon, desc, isActive}) => {
    const router = useRouter()
    const params = useSearchParams()
    
    const handleClick = useCallback(() => {
        let currentQuery = {}
        if (params){
            currentQuery = query.parse(params.toString())
        }

        const updateQuery: any = {
            ...currentQuery,
            category: title.toLowerCase() 
        }

        if(params?.get('category') === title){
            delete updateQuery.category
        }

        const url = query.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {
            skipNull: true
        })

        router.push(url)

    }, [params, title, router])

    return (
        <div 
            className={clsx(`
                flex
                flex-col
                justify-center
                items-center
                gap-2
                p-3
                border-b-2
                transition
                cursor-pointer
                hover:text-rose-500`,

                isActive
                ? 'text-rose-500 border-b-rose-500'
                : 'text-neutral-500 border-transparent'
            )}
            onClick={handleClick}
        >
            <Icon
                size={26}
            />
            <div className="
                text-sm
                font-medium
            ">
                { title }
            </div>
        </div>
    )
}

export default CategoryItem