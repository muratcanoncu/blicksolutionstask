"use client";

import { useState, useEffect, useCallback } from "react";

export interface ShoppingItem {
  _id: string;
  name: string;
  nameKey: string
  bought: boolean;
  createdAt: string;
}

export function useShoppingItems() {
	const [items, setItems] = useState<ShoppingItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
		const res = await fetch("/items");
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Failed to fetch items");
		}

		const data: ShoppingItem[] = await res.json();
		setItems(data);
		localStorage.setItem("shoppingItems", JSON.stringify(data)); // cache items in localStorage
		} catch (err: any) {
		console.error("Failed to fetch items:", err);
		setError(err.message || "Unknown error");
		} finally {
		setLoading(false);
		}
	}, []);

	useEffect(() => {
		const cachedItems = localStorage.getItem("shoppingItems");
		if (cachedItems) {
		setItems(JSON.parse(cachedItems));
		} 
		fetchItems();
	}, [fetchItems]);

	return { items, loading, error, refresh: fetchItems };
}
