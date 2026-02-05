import { Router, Request, Response } from "express";
import ShoppingItem from "../models/ShoppingItem";
import { createShoppingItem, updateBoughtStatus } from "../helpers/dataBaseHelpers";

const router = Router();

// GET all items
router.get("/", async (_req: Request, res: Response) => {
    const items = await ShoppingItem.find();
    res.status(200).json(items);
});

// POST new item
router.post("/add", async (req: Request, res: Response) => {
    try {
        const item = await createShoppingItem(req.body);

        res.status(201).json({
        message: "Item added successfully!",
        item,
        });
    } catch (error: any) {
        if (error.message === "INVALID_NAME") {
        return res.status(400).json({ message: "Name input must have a value" });
        }

        if (error.message === "DUPLICATE_ITEM") {
        return res.status(409).json({ message: `"${req.body.name}" is already in the list!` });
        }

        res.status(500).json({ message: "Error saving item", error });
    }
});

// PUT update bought status
router.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const updatedItem = await updateBoughtStatus(req.params.id, req.body.bought);

        res.status(200).json(updatedItem);
    } catch (error: any) {
        if (error.message === "ITEM_NOT_FOUND") {
        return res.status(404).json({ message: "Item not found" });
        }

        res.status(500).json({
        message: "Item update failed",
        error,
        });
    }
});

// DELETE item
router.delete("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedItem = await ShoppingItem.findByIdAndDelete(id);
    if (!deletedItem)
        return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted", data: deletedItem });
});


export default router;
