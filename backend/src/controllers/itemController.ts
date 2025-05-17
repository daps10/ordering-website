import { Request, Response } from "express";
import Item from "../models/Item";


export const getAllItems= async(req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const total = await Item.countDocuments();
    const items = await Item.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.json({ items, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items' });
  }
}

export const searchItems= async(req: Request, res: Response) => {
  const {query} = req.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  const items = await Item.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { sku: { $regex: query, $options: 'i' } }
    ]
  });

  res.json(items);
}

export const chatSearch= async() => {
  
}