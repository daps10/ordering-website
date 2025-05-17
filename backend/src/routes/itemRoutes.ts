import express from "express";
import {
  getAllItems,
  searchItems,
  chatSearch
} from '../controllers/itemController';

const router= express.Router();

router.get('/items', getAllItems);
router.get('/items/search', searchItems);
router.post('/chat', chatSearch);

export default router;