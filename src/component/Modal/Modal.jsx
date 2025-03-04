
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteContext } from "../../Context/NoteContext";
import Swal from 'sweetalert2';

export default function Modal({ getNotes, selectedNote, setIsModalOpen, isModalOpen }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addNote, updateNote } = useContext(NoteContext);

  const schema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (selectedNote) {
      reset({ title: selectedNote.title, content: selectedNote.content });
    } else {
      reset({ title: "", content: "" });
    }
  }, [selectedNote, reset, isModalOpen]);

  async function handleSave(values) {
    setIsLoading(true);
    try {
      selectedNote ? await updateNote(selectedNote._id, values) : await addNote(values);
      Swal.fire({
        position: "center",
        icon: "success",
        title: selectedNote ? "Note updated successfully" : "Note added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      getNotes();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? "block" : "hidden"}`}>
      <div className="relative bg-white rounded-lg shadow-lg p-5 w-96">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="capitalize text-lg font-semibold text-stone-700">
            {selectedNote ? "Edit Note" : "Add Note"}
          </h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:bg-gray-200 rounded-lg p-2">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(handleSave)} className="mt-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-stone-700">Title</label>
            <input
              {...register("title")}
              type="text"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter title"
            />
            {errors.title && <div className="text-red-700 mt-1">{errors.title.message}</div>}
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-stone-700">Content</label>
            <textarea
              {...register("content")}
              rows="4"
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter content"
            />
            {errors.content && <div className="text-red-700 mt-1">{errors.content.message}</div>}
          </div>

          <button type="submit" className="mt-4 bg-[#3D9AE2] text-white px-4 py-2 rounded w-full">
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : selectedNote ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
