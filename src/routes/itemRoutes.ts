import express from "express";
import {
  getAllItems,
  searchItems,
  chatSearch
} from '../controllers/itemController';

const router= express.Router();

router.get('/items', getAllItems);
router.post('/items/search', searchItems);
router.get('/chat', chatSearch);

export default router;