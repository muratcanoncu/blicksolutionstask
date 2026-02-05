"use client";

import Image from "next/image";
import { ShoppingItem } from "@/hooks/useShoppingItems";

interface ProductListProps {
  items: ShoppingItem[];
  refresh: () => void;
}

export default function ProductList({ items, refresh }: ProductListProps) {
  const deleteItem = async (id: string) => {
    try {
      await fetch(`/items/delete/${id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    }
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
    } catch (error) {
      console.error("error:", error);
    } finally {
    if ("blur" in clickedElement && typeof clickedElement.blur === "function") {
      clickedElement.blur();
    }
  }
  };

	return (
		<table className="w-full max-w-md xl:max-w-xl shadow-md bg-orange-50 rounded">
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
							<button className="invisible group-hover:visible group-focus-within:visible rounded cursor-pointer p-2 bg-red-400 transition-visibility duration-50" onClick={() => deleteItem(item._id)}>
								<Image src="/bin.svg" alt="garbage_bin" title="Delete item" width={18} height={18} className="text-white"/>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
