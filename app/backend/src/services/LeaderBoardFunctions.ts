export default class LeaderBoardFunction {
  static reducerTotalPoints(home:number, away:number) {
    if (home > away) return 3;

    if (home === away) return 1;

    return 0;
  }

  static reducerVictorys(home:number, away:number) {
    if (home > away) return 1;
    return 0;
  }

  static reducerLoss(home:number, away:number) {
    if (away > home) return 1;
    return 0;
  }

  static reducerDraws(home:number, away:number) {
    if (away === home) return 1;
    return 0;
  }
}
