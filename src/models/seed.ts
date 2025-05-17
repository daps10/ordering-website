import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import connectDB from '../config/db';
import Item from './Item';
import { title } from 'process';


const seedDatabase = async() => {
  try {
    await connectDB();

    const dataPath= path.join(__dirname, '../../data/data.json');
    
    const rawItems= JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // tranformed Items for the schema
    const transformedItems= rawItems
      .filter((item: any) => 
        item['Title'] && item['Variant SKU'] && item['Variant Price'] && item['Image Src']
      )
      .map((item: any) => ({
        title: item['Title'] || 'Untitled Product',
        sku: item['Variant SKU'],
        price: parseFloat(item['Variant Price']),
        image: item['Image Src'] || 'https://via.placeholder.com/300' // fallback image
      }));

    await Item.deleteMany({});
    await Item.insertMany(transformedItems);

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Seeding err ::', error);
    process.exit(1);
  }
}

seedDatabase();