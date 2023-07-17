import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';
import Teams from '../database/models/Teams.model';

const teamService = new TeamService();
const teamControleer = new TeamController(teamService);

const router = Router();

router.get('/', async (req:Request, res : Response) =>
  teamControleer.findAllTeam(req, res));
router.get('/:id', (async (req: Request, res: Response) =>
  teamControleer.findTeamById(req, res)));

export default router;
