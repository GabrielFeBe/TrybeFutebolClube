import { Router, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamController from '../controllers/MatchesController';

const matchesService = new MatchesService();
const matchesController = new TeamController(matchesService);

const router = Router();

router.get('/', async (req:Request, res : Response) =>
  matchesController.findAllMatches(req, res));

export default router;
