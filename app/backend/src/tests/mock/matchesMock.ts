export const matches = [
  {
    "id": 1,
    "homeTeamGoals": 1,
    "homeTeamId": 16,
    "awayTeamGoals": 1,
    "awayTeamId": 8,
    "inProgress": false,
    "homeTeam": {
      "id": 16,
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "id": 8,
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamGoals": 1,
    "homeTeamId": 9,
    "awayTeamGoals": 1,
    "awayTeamId": 14,
    "inProgress": false,
    "homeTeam": {
      "id": 9,
      "teamName": "Internacional"
    },
    "awayTeam": {
      "id": 14,
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeamGoals": 3,
    "homeTeamId": 4,
    "awayTeamGoals": 0,
    "awayTeamId": 11,
    "inProgress": false,
    "homeTeam": {
      "id": 4,
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "id": 11,
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 4,
    "homeTeamGoals": 1,
    "homeTeamId": 4,
    "awayTeamGoals": 1,
    "awayTeamId": 12,
    "inProgress": true,
    "homeTeam": {
      "id": 4,
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "id": 12,
      "teamName": "Palmeiras"
    }
  },]

export const mockInProgress = [{
  "id": 4,
  "homeTeamGoals": 1,
  "homeTeamId": 4,
  "awayTeamGoals": 1,
  "awayTeamId": 12,
  "inProgress": true,
  "homeTeam": {
    "id": 4,
    "teamName": "Corinthians"
  },
  "awayTeam": {
    "id": 12,
    "teamName": "Palmeiras"
  }
}]

export const mockFinished = [
  {
    "id": 1,
    "homeTeamGoals": 1,
    "homeTeamId": 16,
    "awayTeamGoals": 1,
    "awayTeamId": 8,
    "inProgress": false,
    "homeTeam": {
      "id": 16,
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "id": 8,
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamGoals": 1,
    "homeTeamId": 9,
    "awayTeamGoals": 1,
    "awayTeamId": 14,
    "inProgress": false,
    "homeTeam": {
      "id": 9,
      "teamName": "Internacional"
    },
    "awayTeam": {
      "id": 14,
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeamGoals": 3,
    "homeTeamId": 4,
    "awayTeamGoals": 0,
    "awayTeamId": 11,
    "inProgress": false,
    "homeTeam": {
      "id": 4,
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "id": 11,
      "teamName": "Napoli-SC"
    }
  },
]

export const matchCreationMock = {
  "id": 1,
  "homeTeamGoals": 1,
  "homeTeamId": 16,
  "awayTeamGoals": 1,
  "awayTeamId": 8,
  "inProgress": true,
}

export const bodyToCreateMock = {
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
export const invalidBodyToCreateMockE = {
  "homeTeamId": 16,
  "awayTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
export const invalidBodyToCreateMockIn = {
  "homeTeamId": 16,
  "awayTeamId": 9999999,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}