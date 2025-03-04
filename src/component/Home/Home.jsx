
import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { NoteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";

export default function Home() {
  const { getUserNotes, deleteUserNote } = useContext(NoteContext);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setloading] = useState(false);

  async function getNotes() {
    setloading(true);
    try {
      let { data } = await getUserNotes();
      setNotes(data.notes || []);
    } catch (error) {
      if (error.response?.status === 404) {
        setNotes([]);
      } else {
        console.log(error);
      }
    } finally {
      setloading(false);
    }
  }

  async function deleteNote(noteId) {
    try {
      await deleteUserNote(noteId);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Note deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  const openModalForAdd = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="p-2">
          <button
            onClick={openModalForAdd}
            className="block rounded-2xl border-2 border-[#3D9AE2] bg-white text-stone-500 text-sm px-5 py-2.5 text-center hover:shadow-lg hover:shadow-[#3D9AE2]/50 font-bold"
          >
            <i className="fa-solid fa-xl fa-plus text-[#3D9AE2]"></i> Add Note
          </button>
        </div>

        <Modal
          getNotes={getNotes}
          selectedNote={selectedNote}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />

        {loading ? (
          <span className="loader"></span>
        ) : notes.length === 0 ? (
          <h1 className="text-center lg:text-4xl text-2xl font-bold text-[#3D9AE2] mt-10 "><i className="fa-solid fa-pen-to-square"></i> No notes have been created yet</h1>
        ) : (
          <div className='flex flex-wrap'>
            {notes.map((note) => (
              <div key={note._id} className='w-full md:w-1/2 lg:w-1/4 p-2'>
                <div className='bg-white rounded-lg p-4'>
                  <h3 className='text-xl font-bold mb-2 text-stone-600'>{note.title}</h3>
                  <p className='text-gray-600'>{note.content}</p>
                  <div className='flex justify-between items-center mt-20'>
                    <i
                      onClick={() => deleteNote(note._id)}
                      className='fa-solid fa-trash fa-xl text-stone-500 cursor-pointer'
                    ></i>
                    <i
                      onClick={() => openModalForEdit(note)}
                      className='fa-solid fa-pen-to-square fa-xl text-stone-500 cursor-pointer'
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
