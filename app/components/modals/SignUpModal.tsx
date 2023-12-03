'use client'

import axios from "axios"
import useSignUpModal from "@/app/hooks/useSignUpModal"

import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../input/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"

const SignUpModal = () => {
    const signUpModal = useSignUpModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register, 
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })
    
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios
        .post('api/signup', data)
        .then(() => {
            signUpModal.close()
        })
        .catch((error) =>{
            toast.error("Something error.")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const openLogin = useCallback(() => {
        signUpModal.close()
        loginModal.open()
    }, [loginModal, signUpModal])

    const Form = (
        <div className="
            flex
            flex-col
            gap-4
        ">
            <Heading
                title="Welcome to OpenBO"
                subtitle="Create an account to booking online!"
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
                id="name"
                label="Name"
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
                label="Continue with Google"
                icon={ FcGoogle }
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
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
                        Already have an account?
                    </div>
                    <div
                        onClick={openLogin} 
                        className="
                            cursor-pointer
                            hover:underline
                            text-neutral-800
                        "
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            title="Register"
            buttonLabel="Continue"
            body={ Form }
            disabled={ isLoading }
            isOpen={ signUpModal.isOpen }
            onClose={ signUpModal.close }
            onSubmit={ handleSubmit(onSubmit) }
            footer={ Footer }
        />
    )
}

export default SignUpModal