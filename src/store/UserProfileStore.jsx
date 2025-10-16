import { create } from "zustand";


const UserProfileStore = create((set) => ({
    step: 1,
    profile:{
        firstName : "",
        lastName : "",
        email : "",
        city:"",
        state:"",
        country:"",
        occupation:"",
    },
    nextStep: () =>set((state)=>({step: state.step +1})),
    prevStep: () => set((state)=>({step: state.step -1})),

    updateProfile: (data)=>
    set((state)=>({
        profile: {...state.profile, ...data}
    })),
    reset: () =>
    set({step:1, profile:{
        firstName : "",
        lastName : "",
        email : "",
        city:"",
        state:"",
        country:"",
        occupation:"",
    }}),
}));

export default UserProfileStore;