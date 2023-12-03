'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';


import useSignUpModal from '@/app/hooks/useSignUpModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps{
    user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const signUpModal = useSignUpModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const menuToogleOpen = useCallback(() => {
        setIsMenuOpen((value) => !value)
    },[])
    
    const onRentMenu = useCallback(() => {
        if(!user){
            return loginModal.open()
        }

        rentModal.open()

    },[user, loginModal, rentModal])
    return ( 
        <div className="
            relative
        ">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div
                    className="
                        hidden
                        px-4
                        py-3
                        font-semibold
                        rounded-full
                        text-sm
                        cursor-pointer
                        transition
                        hover:bg-neutral-100
                        md:block
                    "
                    onClick={onRentMenu}
                >
                    menuuser
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-3
                        p-4
                        border-[1px]
                        rounded-full
                        cursor-pointer
                        transition
                        hover:shadow-md
                        md:px-2
                        md:py-1
                    "
                    onClick={menuToogleOpen}
                >
                    <AiOutlineMenu/>
                    <div className="
                        hidden
                        md:block
                    ">
                        <Avatar src={user?.image}/>
                    </div>
                </div>
            </div>

            {
                isMenuOpen && (
                    <div className='
                        absolute
                        w-[40vw]
                        right-0
                        top-12
                        text-sm
                        rounded-xl
                        shadow-md
                        overflow-hidden
                        bg-white
                        md:w-3/4
                    '>
                        <div className='
                            flex
                            flex-col
                            cursor-pointer
                        '>
                        {
                            user
                            ?   (<>
                                    <MenuItem
                                        onClick={() => {}}
                                        label='Trips'
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label='Favorites'
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label='Recervations'
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label='Properties'
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label='Favorite'
                                    />
                                    <MenuItem
                                        onClick={() => {}}
                                        label='My Home'
                                    />
                                    <hr/>
                                    <MenuItem
                                        onClick={() => signOut()}
                                        label='Logout'
                                    />
                                </>)
                            :   (<>
                                    <MenuItem
                                        onClick={signUpModal.open}
                                        label='Sign up'
                                    />
                                    <MenuItem
                                        onClick={loginModal.open}
                                        label='Login'
                                    />
                                </>)
                            
                        }
                        </div>
                    </div>
                )
            }
        </div>
     );
}
 
export default UserMenu;