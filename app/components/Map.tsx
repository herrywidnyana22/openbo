'use client'

import L from "leaflet"
import { MapContainer, Marker, TileLayer} from "react-leaflet"

import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import marketShadow from "leaflet/dist/images/marker-shadow.png"

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: marketShadow.src
})

interface MapProps{
    latlng?: number[]
}

const Map:React.FC<MapProps> = ({latlng}) => {
    return (
        <MapContainer
            className="
                h-[35vh]
                rounded-lg
            "
            center={latlng as L.LatLngExpression || [8.4095, 115.1889]} //default
            zoom={latlng ? 4 : 2}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                latlng && (
                    <Marker
                        position={latlng as L.LatLngExpression}
                    />
                )
            }
        </MapContainer>
    )
}

export default Map