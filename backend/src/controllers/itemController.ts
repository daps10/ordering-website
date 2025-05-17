import { Request, Response } from "express";
import Item from "../models/Item";


export const getAllItems= async(_req: Request, res: Response) => {
  const items= await Item.find();
  res.json(items);
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