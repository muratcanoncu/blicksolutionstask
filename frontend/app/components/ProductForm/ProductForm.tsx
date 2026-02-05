"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NotificationMessage from "./../Notifications/NotificationMessage";

interface ProductFormProps {
  refresh: () => void;
}

export default function ProductForm({ refresh }: ProductFormProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const addNewItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
        setErrorMessage("You forgot to enter a product name!");
        clearMessages()
        return;
    }

    try {
      const response = await fetch(
        "/items/add",
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setSuccessMessage("");
        setErrorMessage(data.message);
        throw new Error(response.statusText || "Something went wrong");
      }

      refresh();
      setName("");
      setErrorMessage("");
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
    clearMessages()
  };

  const clearMessages = () => {
    setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
    }, 8000);
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-4 relative">
        <form className="flex flex-col gap-4 rounded shadow-md bg-orange-100 p-6" 
            onSubmit={addNewItem}
            noValidate>
            <h2 className="text-orange-900">Add shopping item to the list</h2>
            <div className="flex flex-col gap-1 relative">
                <input type="text" id="item-name" value={name} onChange={handleChange} placeholder=" "
                className="peer w-full bg-white text-black rounded px-3 py-2 placeholder-gray-400 focus:border-dark-blue focus:outline-none"
                />
                <label className="text-orange-900 absolute bottom-10 left-0 text-xs peer-focus-visible:bottom-10 peer-focus-visible:left-0 peer-focus-visible:text-xs peer-focus-visible:text-orange-900 peer-placeholder-shown:bottom-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200" htmlFor="item-name">Item name</label>
            </div>
            <button type="submit" className="w-full cursor-pointer outline-orange-300 rounded bg-teal-400 py-2 font-medium text-white transition hover:bg-teal-500 active:scale-[0.98] focus:bg-teal-500">
                Add item
            </button>
        </form>
		<div className="absolute -bottom-10 w-full text-black text-sm empty:hidden">
			<NotificationMessage message={errorMessage || successMessage}  type={errorMessage ? "error" : "success"}/>
		</div>
    </div>
  );
}
