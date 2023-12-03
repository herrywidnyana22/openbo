//@ts-ignore
import countries from "world-countries"

const formatCountry = countries.map((country: any) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useCountry = () =>{
    const getAll = () => formatCountry
    const getByValue = (value: string) =>{
        return formatCountry.find((item: any) => item.value === value)
    }

    return { getAll, getByValue}
}

export default useCountry