'use client'

import { categoryItems } from "../navbar/CategoryItems"
import { useCallback, useMemo, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading"
import CategoryInput from "../input/CategoryInput"
import CountrySelect from "../input/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../input/Counter"
import ImageUpload from "../input/ImageUpload"
import Input from "../input/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESC = 4,
    PRICE = 5
}

const RentModal = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [stepIndex, setStepIndex] = useState(STEPS.CATEGORY)
    
    const rentModal = useRentModal()
    const router = useRouter()

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState:{errors}, 
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestNumber: 1,
            roomNumber: 1,
            bathRoomNumber: 1,
            image: '',
            price: 1,
            title: '',
            desc: ''
        }
    })

    const categoryField = watch('category')
    const locationField = watch('location')
    const guestNumber = watch('guestNumber')
    const roomNumber = watch('roomNumber')
    const bathRoomNumber = watch('bathRoomNumber')
    const image = watch('image')

    const Map = useMemo(() => ( 
        dynamic(() => import("../Map"),{
            ssr: false
        })
    ), [locationField])

    const setFieldValue = (id: string, value: any) =>{
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    const back = () =>{
        setStepIndex((value) => value - 1)
    }

    const next = () =>{
        setStepIndex((value) => value + 1)
    }

    const buttonLabel = useMemo(() =>{
        if(stepIndex === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'

    }, [stepIndex])

    const secondButtonLabel = useMemo(() =>{
        if(stepIndex === STEPS.CATEGORY){
            return undefined
        }

        return 'Back'

    }, [stepIndex])

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        if(stepIndex !== STEPS.PRICE) return next()

        setIsLoading(true)

        axios
        .post('/api/listing', data)
        .then(() =>{ 
            toast.success("Listing Success..")
            router.refresh()
            reset()
            setStepIndex(STEPS.CATEGORY)
            rentModal.close()
        })
        .catch(() => toast.error("Something error...!"))
        .finally(() => setIsLoading(false))

    }
    

    let body = (
        <div className="
            flex
            flex-col
            gap-8
        ">
            <Heading
                title="Which your favorite place to your destination?"
                subtitle="Pick a category"
            />
            <div className="
                grid
                grid-cols-1
                gap-3
                max-h-[50vh]
                overflow-y-auto
                md:grid-cols-2
            ">
                {
                    categoryItems.map((category, i) =>(
                        <div
                            key={i}
                            className="
                                col-span-1
                            "
                        >
                            <CategoryInput
                                label={ category.title }
                                icon={ category.icon }
                                onClick={(category) => setFieldValue('category', category)}
                                isActive= { categoryField === category.title }
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (stepIndex === STEPS.LOCATION){
        body = (
            <div className="
                flex
                flex-col
                gap-8
            ">
                <Heading
                    title="Where is your location?"
                    subtitle="Help guests find you"
                />
                <CountrySelect
                    onChange={(value) =>setFieldValue('location', value)}
                    value={locationField}
                />
                <Map
                    latlng={locationField?.latlng}
                />
            </div>
        )
    }

    if(stepIndex === STEPS.INFO){
        body =(
            <div className="
                flex
                flex-col
                gap-8
            ">
                <Heading
                    title="How Many?"
                    subtitle="Help guests find you"
                />
                
                <Counter
                    title="Guest"
                    subtitle="How many guests?"
                    value={guestNumber}
                    onChange={(value) =>setFieldValue('guestNumber', value)}
                />
                <hr/>
                <Counter
                    title="Room"
                    subtitle="How many room?"
                    value={roomNumber}
                    onChange={(value) =>setFieldValue('roomNumber', value)}
                />
                <hr/>
                <Counter
                    title="Bathroom"
                    subtitle="How many bathroom?"
                    value={bathRoomNumber}
                    onChange={(value) =>setFieldValue('bathRoomNumber', value)}
                />

            </div>
        )
    }

    if(stepIndex === STEPS.IMAGES){
        body =(
            <div className="
                flex
                flex-col
                gap-8
            ">
                <Heading
                    title="Add a photo of your place?"
                    subtitle="Show your beautiful place looks like"
                />
                <ImageUpload
                    value={image}
                    onChange={(value) => setFieldValue('image', value)}
                />
               

            </div>
        )
    }

    if(stepIndex === STEPS.DESC){
        body =(
            <div className="
                flex
                flex-col
                gap-8
            ">
                <Heading
                    title="How you describe your place?"
                    subtitle="let's guest know about your place"
                />
                <Input
                    id="title"
                    type="text"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="desc"
                    type="text"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }

    if(stepIndex === STEPS.PRICE){
        body =(
            <div className="
                flex
                flex-col
                gap-8
            ">
                <Heading
                    title="Now, Set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    type="number"
                    isPrice
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }
    
    return (
        <Modal 
            title="My Home"
            isOpen = { rentModal.isOpen }
            onClose={ rentModal.close }
            onSubmit={ handleSubmit(onSubmit) }
            buttonLabel={ buttonLabel }
            secondLabel={ secondButtonLabel }
            secondAction={ stepIndex === STEPS.CATEGORY ? undefined : back}
            body={body}
        />
    )
}

export default RentModal