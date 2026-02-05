"use client";

import { useShoppingItems } from "./hooks/useShoppingItems";
import ProductForm from "./components/ProductForm/ProductForm";
import ProductList  from "./components/Product/ProductList";

export default function Home() {
   const { items, refresh } = useShoppingItems();
  return (
    <div className="flex justify-center min-h-screen py-16 bg-orange-200">
      <main className="container flex-1 flex flex-col xl:flex-row xl:justify-between items-center gap-16">
            <ProductForm refresh={refresh}/>
            <ProductList items={items} refresh={refresh} />
      </main>
    </div>
  );
}
