import { Request, Response } from "express";
import Item from "../models/Item";


export const getAllItems= async(req: Request, res: Response) => {
  const { page = 1, limit = 10} = req.query;
  const total = await Item.countDocuments();
  const items = await Item.find()
    .skip((+page - 1) * +limit)
    .limit(+limit);
  res.json({ items, totalPages: Math.ceil(total / +limit) });
}

export const searchItems= async(req: Request, res: Response) => {
  const { query = '', page = 1, limit = 10 } = req.query;
  const searchQuery = {
    $or: [
      { title: { $regex: query as string, $options: 'i' } },
      { sku: { $regex: query as string, $options: 'i' } }
    ]
  };
  const total = await Item.countDocuments(searchQuery);
  const items = await Item.find(searchQuery)
    .skip((+page - 1) * +limit)
    .limit(+limit);
  res.json({ items, totalPages: Math.ceil(total / +limit) });
}

export const chatSearch = async (req: Request, res: Response) => {
  const { message } = req.body;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  console.log('Received message:', message);

  const skuMatch = message.match(/sku\s+(\S+)/i);
  const priceMatch = message.match(/under\s+\$?(\d+)/i);

  let query = {};

  try {
    if (skuMatch) {
      const sku = skuMatch[1];
      console.log('Matched SKU:', sku);
      query = { sku };
    } else if (priceMatch) {
      const price = parseInt(priceMatch[1], 10);
      console.log('Matched Price:', price);
      query = { price: { $lt: price } };
    } else {
      // Default fallback if no match
      return res.json({ items: [], totalPages: 1 });
    }

    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Chat search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

