'use client'

import { User } from "@prisma/client"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import Category from "./Category"

interface NavbarProps{
    user?: User | null
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className="
        fixed
        w-full
        shadow-sm
        z-10
        bg-white
    ">
        <div className="
            py-4 
            border-b-[1px]
        ">
            <Container>
                <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                ">
                    <Logo/>
                    <Search/>
                    <UserMenu user= { user }/>
                </div>
            </Container>
        </div>
        <Category/>
    </div>
  )
}

export default Navbar