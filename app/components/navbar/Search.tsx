'use client'

import { BiSearch } from 'react-icons/bi'

const Search = () => {
    return ( 
        <div className="
            w-full
            border-[1px]
            py-2
            rounded-full
            shadow-sm
            transtition
            cursor-pointer
            hover:shadow-md
            md:w-auto
        ">
            <div className="
                flex
                flex-rpw
                justify-between
                items-center
            ">
                <div className="
                   text-sm
                   font-semibold
                   px-6 
                ">
                    Where
                </div>
                <div className="
                    hidden
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    flex-1
                    text-center
                    sm:block
                ">
                    Week
                </div>
                <div className="
                    flex
                    flex-row
                    items-center
                    gap-3
                    text-sm
                    pl-6
                    pr-2
                    text-gray-600
                ">
                    <div className="
                        hidden
                        sm:block
                    ">
                        Guest
                    </div>
                    <div className="
                        p-2
                        rounded-full
                        text-white
                        bg-rose-500
                    ">
                        <BiSearch 
                            size={18}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Search;