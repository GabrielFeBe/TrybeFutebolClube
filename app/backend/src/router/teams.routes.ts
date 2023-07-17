import { Router, Request, Response } from 'express';
import Teams from '../database/models/teams.model';

const router = Router();

router.get('/', async (_req:Request, res : Response) => {
  const allTeams = await Teams.findAll();
  return res.status(200).json(allTeams);
});

export default router;
