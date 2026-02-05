"use client";

import { useShoppingItems } from "./hooks/useShoppingItems";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList  from "./components/Product/ProductList";

export default function Home() {
     const { items, refresh } = useShoppingItems();
    return (
        <main className="container mx-auto bg-orange-200 max-w-screen min-h-[calc(100vh-var(--header-height))] py-24">
            <div className="flex flex-col items-center gap-24">
                <ProductForm refresh={refresh}/>
                <ProductList items={items} refresh={refresh} />
            </div>
        </main>
    );
}
