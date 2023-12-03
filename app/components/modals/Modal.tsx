'use client'

import { useState, useEffect, useCallback } from "react"
import { IoMdClose } from "react-icons/io"
import clsx from "clsx"
import Button from "../Button"

interface ModalProps{
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    secondAction?: () => void
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    buttonLabel: string
    disabled?: boolean
    secondLabel?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen, 
    onClose, 
    onSubmit, 
    secondAction, 
    title, 
    body, 
    footer, 
    buttonLabel,
    disabled, 
    secondLabel
}) => {
    const [showModal, setshowModal] = useState(isOpen)


    useEffect(() => {
        setshowModal(isOpen)
    }, [isOpen])


    const handleClose = useCallback(() => {
        if(disabled) return

        setshowModal(false)

        setTimeout(() => {
            onClose()
        }, 500);

    },[disabled, onClose])
    
    const handleSubmit = useCallback(() =>{
        if(disabled) return
        onSubmit()
    },[disabled, onSubmit])

    const handleSecondAction = useCallback(() =>{
        if(disabled || !secondAction) return

        secondAction()
    },[secondAction, disabled])

    if(!isOpen) return null
    
    return (
    <>
        <div className="
            fixed
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
        ">
            <div className="
                relative
                w-full
                h-full
                my-6
                mx-auto
                md:w-4/6
                lg:w-3/6
                xl:w-2/6
                lg:h-auto
                md:h-auto
            ">
                {/* MODAL CONTENT */}
                <div className={clsx(`
                    h-full
                    translate
                    duration-300`,
                    showModal 
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                )}>
                    <div className="
                        relative
                        flex
                        flex-col
                        w-full
                        h-full
                        border-0
                        rounded-lg
                        shadow-lg
                        outline-none
                        bg-white
                        translate
                        focus:outline-none
                        lg:h-auto
                        md:h-auto
                    ">
                        {/* HEADER MODAL */}
                        <div className="
                            relative
                            flex
                            items-center
                            justify-center
                            p-6
                            rounded-t
                            border-b-[1px]
                        ">
                            <button 
                                className="
                                    absolute
                                    right-9
                                    p-1
                                    border-0
                                    transition
                                    hover:opacity-70
                                "
                                onClick={handleClose}
                            >
                                <IoMdClose size={18}/>
                            </button>
                            <div className="
                                text-lg
                                font-semibold
                            ">
                                {title}
                            </div>
                        </div>

                        {/* BODY MODAL */}
                        <div className="
                            relative
                            flex-auto
                            p-6
                        ">
                            {body}
                        </div>

                        {/* FOOTER MODAL */}
                        <div className="
                            flex
                            flex-col
                            gap-2
                            p-6
                        ">
                            <div className="
                                flex
                                w-full
                                flex-row
                                gap-4
                                items-center
                            ">
                            {
                                secondAction && secondLabel && (
                                    <Button
                                        outline
                                        onClick={handleSecondAction}
                                        label={secondLabel}
                                        disabled={disabled}
                                    />
                                )
                            }
                                
                                <Button
                                    onClick={handleSubmit}
                                    label={buttonLabel}
                                    disabled={disabled}
                                />
                            </div>
                            { footer }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}

export default Modal