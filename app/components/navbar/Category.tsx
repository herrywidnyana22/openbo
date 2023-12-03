'use client'

import CategoryItem from "../CategoryItem"
import Container from "../Container"
import { useSearchParams, usePathname } from "next/navigation"
import {categoryItems} from "./CategoryItems"

const Category = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const mainPage = pathname === '/'

    if(!mainPage) return null

    return (
        <Container>
            <div className="
                flex
                flex-row
                justify-between
                items-center
                pt-4
                overflow-x-auto
            ">
                { categoryItems.map((item, i) =>(
                    <CategoryItem
                        key={i}
                        title={item.title}
                        isActive= {category === item.title.toLowerCase()}
                        desc={item.desc}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Category