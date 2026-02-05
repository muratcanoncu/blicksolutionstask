"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingItem } from "@/hooks/useShoppingItems"
import NotificationMessage from "./../Notifications/NotificationMessage";


interface ProductListProps {
  items: ShoppingItem[];
  refresh: () => void;
}

export default function ProductList({ items, refresh }: ProductListProps) {
	const [message, setMessage] = useState("");
  	const deleteItem = async (id: string) => {
		try {
			const response = await fetch(`/items/delete/${id}`, {
				method: "DELETE",
			});
			const data = await response.json();
			refresh();
			setMessage('Item is successfully deleted!');
			setMessage(`You deleted "${data.data.name}"!`);
		} catch (error) {
			console.error("Delete failed:", error);
		}
		clearMessages();
	};

	const toggleBought = async (e: React.MouseEvent<HTMLElement>, id: string, bought: boolean) => {
  		const clickedElement = e.currentTarget;
		try {
			await fetch(`/items/update/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ bought: !bought }),
			});
			refresh();
			setMessage('You update an Item!');
		} catch (error) {
			console.error("error:", error);
		} finally {
			if ("blur" in clickedElement && typeof clickedElement.blur === "function") {
				clickedElement.blur();
			}
		}
		clearMessages();
	};

    const clearMessages = () => {
		setTimeout(() => {
			setMessage("");
		}, 2000);
	}

	return (
		<div className={`${items.length === 0 ? "translate-y-[100vh]" : "translate-y-0"} transition-transform duration-400 w-full max-w-md xl:max-w-xl flex flex-col relative`}>
			<table className="shadow-md bg-orange-100 rounded">
				<thead className="bg-orange-300">
					<tr>
						<th className="p-3 text-xl text-orange-900" colSpan={4}>Shopping list ({items.length})</th>
					</tr>
				</thead>
				<tbody className="text-orange-900">
					{items.map((item, index) => (
						<tr key={item._id} className={`${item.bought ? "line-through text-orange-400" : ""} ${index === items.length - 1 ? '' : 'border-b border-orange-300'} group`} >
							<td className="p-3 relative">
								<label className="absolute inset-0 flex items-center justify-center cursor-pointer" 
									htmlFor={`item-${item._id}`} tabIndex={0}  onKeyDown={(e) => e.key === "Enter" && toggleBought(e, item._id, item.bought)} >
									<input
										id={`item-${item._id}`}
										type="checkbox"
										checked={item.bought}
										className="h-5 w-5 cursor-pointer"
										onChange={(e) => toggleBought(e, item._id, item.bought)}
										tabIndex={-1}
									/>
								</label>
							</td>
							<td className="pr-3 flex items-center gap-3">
								<span onClick={(e) => toggleBought(e, item._id, item.bought)} className="cursor-pointer py-3 pl-3">{item.name}</span>
								<button className="invisible opacity-0 group-hover:visible group-focus-within:visible group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 rounded cursor-pointer p-2 bg-red-400" onClick={() => deleteItem(item._id)}>
									<Image src="/bin.svg" alt="garbage_bin" title="Delete item" width={18} height={18} className="text-white"/>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="absolute -bottom-10 w-full text-black text-sm empty:hidden">
				<NotificationMessage message={message}  type={"success"}/>
			</div>
		</div>
	);
}
