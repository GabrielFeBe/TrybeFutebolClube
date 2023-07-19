import { Request, Response } from 'express';
import LeaderBoardRS from '../services/LeaderBoardRS';
import LeaderBoardService from '../services/LeaderBoards';

export default class LeaderBoardController {
  private service:LeaderBoardService;
  constructor(Service:LeaderBoardService) {
    this.service = Service;
  }

  async leaderBoardHome(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardHome();

    const newObj = LeaderBoardRS.addingEff(sucess);
    const sortingStatusArr = LeaderBoardRS.sortingStatus(newObj);
    return res.status(200).json(sortingStatusArr);
  }

  async leaderBoardAway(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardAway();

    const newObj = LeaderBoardRS.addingEff(sucess);
    const sortingStatusArr = LeaderBoardRS.sortingStatus(newObj);
    return res.status(200).json(sortingStatusArr);
  }

  async leaderBoardAll(req:Request, res : Response) {
    const sucess = await this.service.leaderBoardAll();

    const newObj = LeaderBoardRS.addingEff(sucess);
    const sortingStatusArr = LeaderBoardRS.sortingStatus(newObj);
    return res.status(200).json(sortingStatusArr);
  }
}
