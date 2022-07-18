import create from 'zustand'
import { persist } from 'zustand/middleware';
// import produce from 'immer';

const useStore = create(persist((set, get) => {
    return {
        router: null,
        deviceSize: {
            width: null,
            height: null
        },
        isMobile: false,
        account: null,
        username: null,
        // set: (fn) => set(produce(fn)),
        setAccount: (account) => set({ account: get().account = account }), 
        setUsername: (username) => set({ username: get().username = username }), 
        setIsMobile: (isMobile) => set({ isMobile })
    }
}));

export default useStore