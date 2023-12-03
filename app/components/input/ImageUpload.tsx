'use client'

import { CldUploadWidget } from "next-cloudinary"
import { useCallback } from "react"
import { RiImageAddFill } from "react-icons/ri"
import Image from "next/image"

declare global{
    var cloudinary: any
}

interface ImageUploadProps{
    value: string
    onChange: (value: string) => void
}

const ImageUpload:React.FC<ImageUploadProps> = ({value, onChange}) => {

    const handleUpload = useCallback((result: any) =>{
        onChange(result.info.secure_url)
    },[onChange])

    return ( 
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="bl5cdqtv"
            options={{
                maxFiles: 1
            }}
        >
            {({open}) =>{
                return(
                    <div
                        className="
                            relative
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            border-2
                            border-dashed
                            p-20
                            cursor-pointer
                            border-neutral-300
                            text-neutral-600
                            transition
                            hover:opacity-70
                        "
                        onClick={() => open?.()}
                    >
                        <RiImageAddFill
                            size={ 50 }
                        />
                        <div className="
                            font-semibold
                            text-lg
                        ">
                            Choose your photo
                        </div>
                        <div>
                            { value && (
                                <div className="
                                    absolute
                                    w-full
                                    h-full
                                    inset-0
                                ">
                                    <Image
                                        alt="upload"
                                        style={{ objectFit: 'cover'}}
                                        fill
                                        src={value}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}
 
export default ImageUpload;