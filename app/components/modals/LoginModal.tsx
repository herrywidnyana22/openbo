'use client'

import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../input/Input"
import Button from "../Button"

import useLoginModal from "@/app/hooks/useLoginModal"
import useSignUpModal from "@/app/hooks/useSignUpModal"

const LoginModal = () => {
    const [isLoading, setIsLoading] = useState(false)

    const loginModal= useLoginModal()
    const signUpModal = useSignUpModal()

    const router = useRouter()

    const {
        register, 
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: ''
        }
    })
    
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((respon) =>{
            setIsLoading(false)

            if(respon?.ok){
                toast.success("Logged in...")
                router.refresh()
                loginModal.close()
            }

            if(respon?.error){
                toast.error(respon.error)
            }
        })
    }
    
    const openSignUp = useCallback(() => {
        loginModal.close()
        signUpModal.open()
    }, [loginModal, signUpModal])
    

    const Form = (
        <div className="
            flex
            flex-col
            gap-4
        ">
            <Heading
                title="Welcome back to OpenBO"
                subtitle="Login to your account"
            />
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
        </div>
    )

    const Footer = (
        <div className="
            flex
            flex-col
            gap-4
            mt-3
        ">
            <hr />
            <Button
                outline
                label="Login with Google"
                icon={ FcGoogle }
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Login with Github"
                icon={ AiFillGithub }
                onClick={() => {}}
            />
            <div className="
                mt-4
                text-center
                font-light
                text-neutral-500
            ">
                <div className="
                    flex
                    flex-row
                    gap-2
                    justify-center
                    items-center

                ">
                    <div>
                        New in OpenBO?
                    </div>
                    <div
                        onClick={openSignUp} 
                        className="
                            cursor-pointer
                            hover:underline
                            text-neutral-800
                        "
                    >
                        Create an account...
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title="Login"
            buttonLabel="Login"
            body={ Form }
            disabled={ isLoading }
            isOpen={ loginModal.isOpen }
            onClose={ loginModal.close }
            onSubmit={ handleSubmit(onSubmit) }
            footer={ Footer }
        />
    )
}

export default LoginModal