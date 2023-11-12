import express from 'express';

import { getQuestions, submitAnswers } from '../../controllers/assessment/index.js';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/', submitAnswers);

export default router;