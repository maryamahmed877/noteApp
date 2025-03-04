import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [Token, setToken] = useState(
        localStorage.getItem('userToken')? localStorage.getItem('userToken') : null
    )

    async function registerAuth(values) {
        try {
            const data  = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
            console.log(data);
            return data

        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async function loginAuth(values) {
        try {
            const data  = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
            console.log(data);
            setToken(data.data.token)
            localStorage.setItem('userToken',data.data.token)
            return data

        } catch (error) {
            console.log(error);
            throw error
        }
    }
  
    return (
        <authContext.Provider value={{ registerAuth,loginAuth,Token,setToken}}>
            {children}
        </authContext.Provider>
    );

}
