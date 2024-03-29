// This file was autogenerated by convert_to_js.py
class Player {
  constructor(profileUrl, name, team, startElo, currentElo, profileImage) {
    let temp = profileUrl.split("/");

    this.profileUrl = profileUrl;
    this.name = name;
    this.nickname = temp[temp.length - 1];
    this.team = team == null || team.length == 0 ? "NO TEAM" : team;
    this.startElo = startElo;
    this.currentElo = currentElo;
    this.profileImage = profileImage;
  }

  get diff() {
    return this.currentElo - this.startElo;
  }

  static compare(player1, player2) {
    return player2.diff - player1.diff;
  }
}

const PLAYERS = [
  new Player(
    "https://www.faceit.com/en/players/iTitusDE",
    "iTitus",
    "DG FOUR",
    "1069",
    "1069",
    "https://assets.faceit-cdn.net/avatars/3f983adb-15e1-43bb-8429-7bbef3102a7c_1633555628751.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/immerTilt",
    "Xyra",
    "DG TWO",
    "1773",
    "1773",
    "https://distribution.faceit-cdn.net/images/f3206eb1-ca70-41b9-91fc-9f111f575088.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/_MvM_",
    "MvM",
    "DG TWO",
    "1841",
    "1841",
    "https://assets.faceit-cdn.net/avatars/8776bed7-ea84-4bbb-9d60-dab0508ae453_1550608845862.jpg"
  ),
  new Player(
    "https://www.faceit.com/de/players/sykkkkkk",
    "syk",
    "DG ONE",
    "1678",
    "1678",
    "https://distribution.faceit-cdn.net/images/535df92d-50a4-4f63-bc57-a425d807e7ef.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Veptis",
    "Veptis",
    "DG FOUR",
    "1368",
    "1368",
    "https://assets.faceit-cdn.net/avatars/b00faa33-64c7-41ee-b575-2142117f8656_1550572016678.jpg"
  ),
  new Player(
    "https://www.faceit.com/de/players/VarysStorm",
    "VarysStorm",
    "Noch kein Team",
    "1301",
    "1301",
    "https://distribution.faceit-cdn.net/images/527f5fcb-a31a-4932-bf06-be30d11f8466.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/flop7",
    "Flop7",
    "DG ONE",
    "1334",
    "1334",
    "https://assets.faceit-cdn.net/avatars/f97d445f-53c7-4d72-ad5c-c4ecf1e1785b_1556020906891.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Eyvypee",
    "Eyvypee",
    "DG TWO",
    "2330",
    "2330",
    "https://assets.faceit-cdn.net/avatars/944be40c-d8ee-454d-8674-d39bf67cebae_1550572449314.png"
  ),
  new Player(
    "https://www.faceit.com/en/players/Lipskii",
    "Lipskii",
    "DG TWO",
    "1657",
    "1657",
    "https://distribution.faceit-cdn.net/images/83776c67-fda6-4039-8547-1b774ea5fb94.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/JayEx_",
    "JayEx",
    "DG THREE",
    "937",
    "937",
    "https://distribution.faceit-cdn.net/images/5242648e-78b5-43c9-b505-e9e1f32ec6e0.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Manu",
    "Manu",
    "DG ONE",
    "1730",
    "1730",
    "https://distribution.faceit-cdn.net/images/246f982e-730e-4985-ada3-0798c2ba9381.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Aqrcn",
    "aqrcn",
    "Noch kein Team",
    "1203",
    "1203",
    "https://distribution.faceit-cdn.net/images/3f7aac74-88f9-4b3f-9d65-27af0809c921.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Fiiinnnnn53",
    "Finn",
    "DG TWO",
    "1461",
    "1461",
    "https://assets.faceit-cdn.net/avatars/7ca67c73-10dd-408f-90be-2fc36a4592c8_1622127487255.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Benjir",
    "BenjirR",
    "DG ONE",
    "2400",
    "2400",
    "https://distribution.faceit-cdn.net/images/2e1d80a7-52dc-43b6-95af-d50b98c28e68.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/BaZZukaS",
    "BaZZuka",
    "DG FOUR",
    "1406",
    "1406",
    "https://assets.faceit-cdn.net/avatars/7987fc20-e5fe-4d44-b504-bb046c14ba86_1634488917782.jpg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Trexxu",
    "Trexx",
    "DG TWO",
    "1348",
    "1348",
    "https://assets.faceit-cdn.net/avatars/c6c8e77d-246d-48fc-aa7a-b1edd5e15650_1565957694661.jpg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Scritchz",
    "HaxScrpt",
    "DG FOUR",
    "1425",
    "1425",
    "https://distribution.faceit-cdn.net/images/05b4d8c5-5c8f-478b-81dd-64178a9c80f4.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/illusioN_",
    "BRS",
    "DG ONE",
    "3096",
    "3096",
    "https://assets.faceit-cdn.net/avatars/d16cb5fd-b966-4313-9731-351ea89be54c_1599428388463.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Fandjayjay",
    "Fandjayjay",
    "DG TWO",
    "1808",
    "1808",
    "https://distribution.faceit-cdn.net/images/bce58c78-6605-40e4-a1dc-2889f7c0de66.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Atrox2_1",
    "Atrox2_1",
    "DG FOUR",
    "1938",
    "1938",
    "https://distribution.faceit-cdn.net/images/8c868ad1-dffc-4fa4-941d-2f2b88ff49da.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Megatanker13",
    "Mega",
    "DG FOUR",
    "1502",
    "1502",
    "https://assets.faceit-cdn.net/avatars/dde0e412-2f17-4b42-b180-0449d7be3f8f_1631705829461.jpg"
  ),
  new Player(
    "https://www.faceit.com/de/players/sMoG_1",
    "sMoG",
    "DG THREE",
    "1247",
    "1247",
    "https://distribution.faceit-cdn.net/images/38d14acd-de06-461a-b575-c025cdef61f7.jpeg"
  ),
  new Player(
    "https://www.faceit.com/de/players/Gamingguy",
    "Gamingguy",
    "DG THREE",
    "869",
    "869",
    "https://distribution.faceit-cdn.net/images/9598ff11-6eaf-4aa7-a9d9-48cb910e9375.jpeg"
  ),
  new Player(
    "https://www.faceit.com/en/players/DerLollige",
    "Jucast",
    "DG FOUR",
    "1709",
    "1709",
    "https://assets.faceit-cdn.net/avatars/2165b135-1526-42e2-83df-033b3cd13f18_1550585838687.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/MicaW_",
    "Mica",
    "DG THREE",
    "1264",
    "1264",
    "https://assets.faceit-cdn.net/avatars/b7706157-2c41-4ad8-8806-ed854b4fe5d7_1630100466345.jpg"
  ),
  new Player(
    "https://www.faceit.com/en/players/Unch4In3d",
    "Unch4In3d",
    "DG ONE",
    "2224",
    "2224",
    "https://assets.faceit-cdn.net/avatars/0a81cf83-700d-4e72-a609-7b6948ed3fd3_1550711055281.png"
  ),
  new Player(
    "https://www.faceit.com/de/players/DieWalze",
    "JJ_Easter",
    "DG THREE",
    "1261",
    "1261",
    "/favicon.ico"
  ),
];

const PLAYERS_BY_NAME = Object.fromEntries(
  PLAYERS.map((player) => [player.name.trim(), player])
);
