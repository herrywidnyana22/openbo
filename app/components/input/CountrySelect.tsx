'use client'

import useCountry from "@/app/hooks/useCountrySelect"
import Select from "react-select"


export type CountySelectValue = {
    flag: string
    label: string
    laltng:number[]
    region: string
    value: string
}

interface CountrySelectProps{
    value?: CountySelectValue
    onChange: (value : CountySelectValue) => void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({value, onChange}) => {
    const { getAll } = useCountry()
    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable={ true }
                options={ getAll() }
                value={value}
                onChange={(value) => onChange(value as CountySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="
                        flex
                        flex-row
                        items-center
                        gap-3
                    ">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className="
                                text-neutral-800
                                ml-1
                            ">

                            </span>
                        
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default CountrySelect