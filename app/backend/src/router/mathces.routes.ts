import { Router, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamController from '../controllers/MatchesController';
import Validate from '../middleware/ValidationMid';

const matchesService = new MatchesService();
const matchesController = new TeamController(matchesService);

const router = Router();

router.get('/', async (req:Request, res : Response) =>
  matchesController.findAllMatches(req, res));
router.post('/', Validate.validateToken, async (req:Request, res : Response) =>
  matchesController.addingNewMatch(req, res));
router.patch('/:id/finish', Validate.validateToken, async (req:Request, res : Response) =>
  matchesController.endingMatch(req, res));
router.patch('/:id', Validate.validateToken, async (req:Request, res : Response) =>
  matchesController.updatingMatch(req, res));

export default router;
