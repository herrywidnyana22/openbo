import { create } from "zustand";

interface RentModalStore{
    isOpen: boolean
    close: () => void
    open: () => void
}

const useRentModal = create<RentModalStore>((set) =>({
    isOpen: false,
    open: () => set({ isOpen: true}),
    close: () => set({ isOpen: false})
}))

export default useRentModal