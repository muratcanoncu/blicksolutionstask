import ShoppingItem from "../models/ShoppingItem";

interface CreateItemInput {
  name: string;
  bought?: boolean;
}

export async function createShoppingItem(data: CreateItemInput) {
  const { name, bought = false } = data;

  if (!name?.trim()) {
    throw new Error("INVALID_NAME");
  }

  try {
    const item = new ShoppingItem({
      name: name.trim(),
      nameKey: name.trim().toLowerCase(),
      bought,
      createdAt: new Date(),
    });

    return await item.save();
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("DUPLICATE_ITEM");
    }
    throw error;
  }
}

export async function updateBoughtStatus(id: string, bought: boolean) {
  const updatedItem = await ShoppingItem.findByIdAndUpdate(
    id,
    { bought },
    { new: true }
  );

  if (!updatedItem) {
    throw new Error("ITEM_NOT_FOUND");
  }

  return updatedItem;
}
