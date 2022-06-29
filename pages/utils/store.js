import create from 'zustand'

const useStore = create((set) => {
    return {
        router: null,
        deviceSize: {
            width: null,
            height: null
        },
        isMobile: false,
        setIsMobile: (isMobile) => set({ isMobile })
    }
})

export default useStore