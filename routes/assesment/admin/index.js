import express from 'express';

import { createQuestion, getQuestion, getQuestions, updateQuestion } from '../../../controllers/assessment/admin/index.js';

const router = express.Router();

router.get('/', getQuestions);

router.get('/:id', getQuestion);

router.post('/', createQuestion);

router.put('/:id', updateQuestion);

export default router;