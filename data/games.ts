
import { GameResult } from '@/lib/types';

const rawGames = [
  {
    "numberOfPlayers": 4,
    "date": "2024-12-14T23:00:00.000Z",
    "players": [
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      },
      {
        "villainId": "scar",
        "isWinner": true
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-14T23:00:00.000Z",
    "players": [
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": false
      },
      {
        "villainId": "candito",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-14T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "giovanni",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "cattiva",
        "isWinner": true
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "syndrome",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "facilier",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "uncino",
        "isWinner": true
      },
      {
        "villainId": "mago",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "lotso",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-16T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-11T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "uncino",
        "isWinner": false
      }
    ],
    "name": "Davide DS"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-12T23:00:00.000Z",
    "players": [
      {
        "villainId": "facilier",
        "isWinner": true
      },
      {
        "villainId": "giovanni",
        "isWinner": false
      }
    ],
    "name": "Davide DS"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Andrea Antonio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "cuori",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-09T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Rama"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-16T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Lorenzo Frigerio"
  },
  {
    "numberOfPlayers": 6,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "scar",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Lorenzo Frigerio"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-13T23:00:00.000Z",
    "players": [
      {
        "villainId": "mago",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      },
      {
        "villainId": "jafar",
        "isWinner": false
      }
    ],
    "name": "Lorenzo Barbanera"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "mago",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": true
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": true
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Kevin Faitella Casu"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-17T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "scar",
        "isWinner": false
      }
    ],
    "name": "Kevin Faitella Casu"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "matrigna",
        "isWinner": true
      },
      {
        "villainId": "gaston",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "cattiva",
        "isWinner": true
      },
      {
        "villainId": "giovanni",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "crudelia",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-14T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "gaston",
        "isWinner": false
      },
      {
        "villainId": "cuori",
        "isWinner": false
      }
    ],
    "name": "Francesco DC"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "cuori",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "giovanni",
        "isWinner": false
      },
      {
        "villainId": "facilier",
        "isWinner": false
      },
      {
        "villainId": "cuori",
        "isWinner": true
      }
    ],
    "name": "Marta "
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "crudelia",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Marta"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": true
      },
      {
        "villainId": "syndrome",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "cornelius",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "cornelius",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "syndrome",
        "isWinner": true
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      },
      {
        "villainId": "malefica",
        "isWinner": false
      }
    ],
    "name": "Davide DS"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-19T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "jafar",
        "isWinner": false
      },
      {
        "villainId": "ursula",
        "isWinner": true
      }
    ],
    "name": "Lorenzo Frigerio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "gaston",
        "isWinner": true
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "giovanni",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": true
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      }
    ],
    "name": "Davide DS"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-21T23:00:00.000Z",
    "players": [
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Davide"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-21T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": true
      }
    ],
    "name": "Alberto Paolucci "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "crudelia",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      }
    ],
    "name": "Lorenzo & Miguel"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "ursula",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": true
      }
    ],
    "name": "Lorenzo & Miguel"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "cuori",
        "isWinner": true
      }
    ],
    "name": "Lorenzo & Miguel"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-21T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Marta "
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-21T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "facilier",
        "isWinner": false
      }
    ],
    "name": "Marta "
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-21T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      },
      {
        "villainId": "gaston",
        "isWinner": true
      }
    ],
    "name": "Marta "
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Carlo De Vita"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": false
      },
      {
        "villainId": "candito",
        "isWinner": true
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "mago",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "mago",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "mago",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "facilier",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      },
      {
        "villainId": "uncino",
        "isWinner": true
      },
      {
        "villainId": "giovanni",
        "isWinner": false
      }
    ],
    "name": "Lorenzo Merlino"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": true
      },
      {
        "villainId": "malefica",
        "isWinner": false
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-22T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Elisa Cuccurese "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "uncino",
        "isWinner": false
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "lotso",
        "isWinner": false
      }
    ],
    "name": "Tamara Izzo"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": true
      },
      {
        "villainId": "lotso",
        "isWinner": false
      }
    ],
    "name": "Emanuele Izzo"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "jafar",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": true
      },
      {
        "villainId": "malefica",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Cesare Nardella "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "cornelius",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": false
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      },
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Francesco DC"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "ursula",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "cuori",
        "isWinner": false
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Pasquale S"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": false
      },
      {
        "villainId": "giovanni",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      },
      {
        "villainId": "malefica",
        "isWinner": false
      }
    ],
    "name": "Pasquale S"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "cuori",
        "isWinner": true
      }
    ],
    "name": "Pasquale S"
  },
  {
    "numberOfPlayers": 6,
    "date": "2024-12-23T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": false
      },
      {
        "villainId": "gothel",
        "isWinner": false
      },
      {
        "villainId": "ursula",
        "isWinner": true
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      },
      {
        "villainId": "lotso",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-24T23:00:00.000Z",
    "players": [
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      },
      {
        "villainId": "syndrome",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-13T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": true
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-13T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-04T23:00:00.000Z",
    "players": [
      {
        "villainId": "cuori",
        "isWinner": true
      },
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "mago",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-04T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-04T23:00:00.000Z",
    "players": [
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "syndrome",
        "isWinner": false
      },
      {
        "villainId": "gambadilegno",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-09T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-31T13:06:53.480Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "gothel",
        "isWinner": true
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-09T23:00:00.000Z",
    "players": [
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": true
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-09T23:00:00.000Z",
    "players": [
      {
        "villainId": "uncino",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": true
      },
      {
        "villainId": "giovanni",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Andrea"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "cuori",
        "isWinner": true
      },
      {
        "villainId": "uncino",
        "isWinner": false
      }
    ],
    "name": "Simone"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "crudelia",
        "isWinner": false
      },
      {
        "villainId": "mago",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": false
      },
      {
        "villainId": "cuori",
        "isWinner": true
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": true
      }
    ],
    "name": "Francesco DC"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "malefica",
        "isWinner": true
      },
      {
        "villainId": "scar",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      }
    ],
    "name": "Villainous Italia"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "ursula",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-26T23:00:00.000Z",
    "players": [
      {
        "villainId": "cornelius",
        "isWinner": false
      },
      {
        "villainId": "gaston",
        "isWinner": true
      },
      {
        "villainId": "facilier",
        "isWinner": false
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 5,
    "date": "2024-12-20T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": false
      },
      {
        "villainId": "facilier",
        "isWinner": true
      },
      {
        "villainId": "jafar",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "ursula",
        "isWinner": true
      },
      {
        "villainId": "jafar",
        "isWinner": false
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-18T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": false
      },
      {
        "villainId": "jafar",
        "isWinner": true
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "yzma",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "WallE306"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-26T23:00:00.000Z",
    "players": [
      {
        "villainId": "jafar",
        "isWinner": true
      },
      {
        "villainId": "uncino",
        "isWinner": false
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-31T13:06:53.480Z",
    "players": [
      {
        "villainId": "syndrome",
        "isWinner": true
      },
      {
        "villainId": "mago",
        "isWinner": false
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      },
      {
        "villainId": "lotso",
        "isWinner": false
      }
    ],
    "name": ""
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "gaston",
        "isWinner": false
      },
      {
        "villainId": "uncino",
        "isWinner": true
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "facilier",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      }
    ],
    "name": "J3tr0"
  },
  {
    "numberOfPlayers": 5,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "ursula",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "crudelia",
        "isWinner": false
      },
      {
        "villainId": "facilier",
        "isWinner": true
      },
      {
        "villainId": "gothel",
        "isWinner": false
      },
      {
        "villainId": "cornelius",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 5,
    "date": "2024-12-26T23:00:00.000Z",
    "players": [
      {
        "villainId": "matrigna",
        "isWinner": false
      },
      {
        "villainId": "syndrome",
        "isWinner": false
      },
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 5,
    "date": "2024-12-25T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "yzma",
        "isWinner": false
      },
      {
        "villainId": "scar",
        "isWinner": false
      }
    ],
    "name": "Matteo & Co"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "cattiva",
        "isWinner": true
      },
      {
        "villainId": "facilier",
        "isWinner": false
      }
    ],
    "name": "J3tr0"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "cattiva",
        "isWinner": true
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "J3tr0"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      },
      {
        "villainId": "gothel",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "gambadilegno",
        "isWinner": true
      },
      {
        "villainId": "malefica",
        "isWinner": false
      },
      {
        "villainId": "gothel",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-27T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "cattiva",
        "isWinner": false
      },
      {
        "villainId": "mago",
        "isWinner": false
      },
      {
        "villainId": "rattigan",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-28T23:00:00.000Z",
    "players": [
      {
        "villainId": "giovanni",
        "isWinner": false
      },
      {
        "villainId": "gaston",
        "isWinner": true
      }
    ],
    "name": "Antonio Pacilio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-28T23:00:00.000Z",
    "players": [
      {
        "villainId": "syndrome",
        "isWinner": false
      },
      {
        "villainId": "mago",
        "isWinner": true
      }
    ],
    "name": "J3tr0"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-28T23:00:00.000Z",
    "players": [
      {
        "villainId": "matrigna",
        "isWinner": true
      },
      {
        "villainId": "gaston",
        "isWinner": false
      }
    ],
    "name": "J3tr0"
  },
  {
    "numberOfPlayers": 4,
    "date": "2024-12-28T23:00:00.000Z",
    "players": [
      {
        "villainId": "scar",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      },
      {
        "villainId": "ursula",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": false
      }
    ],
    "name": "Rio"
  },
  {
    "numberOfPlayers": 3,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "ade",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Freddy & co."
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "sherkhan",
        "isWinner": true
      },
      {
        "villainId": "crudelia",
        "isWinner": false
      }
    ],
    "name": "Claudio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": false
      },
      {
        "villainId": "mago",
        "isWinner": true
      }
    ],
    "name": "Claudio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": false
      },
      {
        "villainId": "syndrome",
        "isWinner": true
      }
    ],
    "name": "Claudio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": false
      },
      {
        "villainId": "baubau",
        "isWinner": true
      }
    ],
    "name": "Claudio"
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "matrigna",
        "isWinner": true
      },
      {
        "villainId": "baubau",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "candito",
        "isWinner": true
      },
      {
        "villainId": "ursula",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "cuori",
        "isWinner": true
      },
      {
        "villainId": "sherkhan",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  },
  {
    "numberOfPlayers": 2,
    "date": "2024-12-29T23:00:00.000Z",
    "players": [
      {
        "villainId": "baubau",
        "isWinner": true
      },
      {
        "villainId": "matrigna",
        "isWinner": false
      }
    ],
    "name": "Simone Sperduti "
  }
];

export const games: GameResult[] = rawGames.map(game => ({
	...game,
	date: new Date(game.date)
}));
