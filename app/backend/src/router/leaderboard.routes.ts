import { Router, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoards';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get(
  '/home',
  (req:Request, res:Response) => leaderBoardController.leaderBoardHome(req, res),
);
router.get(
  '/away',
  (req:Request, res:Response) => leaderBoardController.leaderBoardAway(req, res),
);
router.get(
  '/',
  (req:Request, res:Response) => leaderBoardController.leaderBoardAll(req, res),
);

export default router;
