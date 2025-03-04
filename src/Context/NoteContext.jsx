import axios from 'axios'
import React, { createContext } from 'react'

export const NoteContext = createContext()
export default function NoteContextProvider({ children }) {

    async function deleteUserNote(noteId){
        try {
            const data = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,{
                headers:{token:'3b8ny__'+ localStorage.getItem('userToken')}
            })
               console.log(data);
              return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async function updateNote(noteId,values){
        try {
            const data = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,values,{
                headers:{token:'3b8ny__'+ localStorage.getItem('userToken')}
            })
               console.log(data);
              return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }


   async function getUserNotes(){
        try {
            const data = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
                headers:{token:'3b8ny__'+ localStorage.getItem('userToken')}
            })
            console.log(data);
            return data
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async function addNote(values){
        try {
            const data =await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{
                headers:{token:'3b8ny__'+ localStorage.getItem('userToken')}
            })
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }
 

    return (
        <>
            <NoteContext.Provider value={{addNote,getUserNotes,deleteUserNote,updateNote}}>
                {children}
            </NoteContext.Provider>
        </>
    )
}
