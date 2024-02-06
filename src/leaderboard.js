import React, { useRef } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

async function Sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function update(player, index) {
  // await for slow sorting effect.
  await Sleep(100 * index);
  const json = await FaceitApiService.getPlayer(player.nickname);

  // set the elo initially if the player fetching failed
  document.getElementById(`${player.nickname}_elo`).innerHTML =
    levelAsHtml(-1) + " " + player.startElo;

  if (!json || json.error) {
    return;
  }
  try {
    player.profileImage = json.avatar ? json.avatar : "/favicon.ico";
    player.currentElo = json.games.cs2.faceit_elo;
    player.level = json.games.cs2.skill_level ? json.games.cs2.skill_level : 1;
  } catch (e) {
    return;
  }

  document.getElementById(`${player.nickname}_diff`).textContent = player.diff;
  document
    .getElementById(`${player.nickname}_img`)
    .setAttribute("src", player.profileImage);

  document.getElementById(`${player.nickname}_elo`).innerHTML =
    levelAsHtml(player.level) + " " + player.currentElo;

  const leaderImg = document.getElementById(`${player.nickname}_leader_img`);
  if (leaderImg) {
    leaderImg.setAttribute("src", player.profileImage);
  }

  sortDomListByWonElo();
  sortDomLeaderList(PLAYERS);
}

function sortDomLeaderList(players) {
  var leaderList = document.getElementById("topLeadersList");
  players.sort(Player.compare);

  ReactDOM.render(players.slice(0, 3).map(createLeaderElement), leaderList);
}

function sortDomListByWonElo() {
  sortDomListBy(function (a, b) {
    let aDiff = +a.childNodes.item(3).textContent;
    let bDiff = +b.childNodes.item(3).textContent;
    return aDiff == bDiff ? 0 : aDiff < bDiff ? 1 : -1;
  });
}

function sortDomListByElo() {
  sortDomListBy(function (a, b) {
    let playerA = PLAYERS_BY_NAME[extractName(a)];
    let playerB = PLAYERS_BY_NAME[extractName(b)];
    if (
      playerA == undefined ||
      playerB == undefined ||
      playerA.currentElo == playerB.currentElo
    ) {
      return 0;
    }

    return playerA.currentElo < playerB.currentElo ? 1 : -1;
  });
}

function sortDomListByName() {
  sortDomListBy(function (a, b) {
    let playerAName = extractName(a);
    let playerBName = extractName(b);
    if (playerAName == undefined || playerBName == undefined) {
      return 0;
    }

    return playerAName.localeCompare(playerBName);
  });
}

function sortDomListByTeam() {
  sortDomListBy(function (a, b) {
    let playerATeam = extractTeam(a);
    let playerBTeam = extractTeam(b);
    if (playerATeam == undefined || playerBTeam == undefined) {
      return 0;
    }

    return playerATeam.localeCompare(playerBTeam);
  });
}

const extractTeam = (node) => node.childNodes[4].textContent.trim();
const extractName = (node) =>
  node.childNodes[1].childNodes[0].childNodes[1].textContent.trim();

function sortDomListBy(sortFun) {
  var list = document.getElementById("list");

  var items = list.childNodes;
  var itemsArr = [];
  for (let i in items) {
    if (items[i].nodeType == 1) {
      // get rid of the whitespace text nodes
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(sortFun);

  for (let i = 0; i < itemsArr.length; ++i) {
    itemsArr[i].firstChild.textContent = i + 1;
    list.appendChild(itemsArr[i]);
  }
}

const App = () => {
  PLAYERS.forEach(update);

  return [
    React.createElement(
      "div",
      { className: "topLeadersList", id: "topLeadersList" },
      PLAYERS.slice(0, 3).map(createLeaderElement)
    ),

    React.createElement(
      "div",
      {
        className: "playerslist",
        id: "playerslist",
      },
      createTableHeader(),
      // Table definition end

      React.createElement(
        "div",
        { className: "list", id: "list", onchange: sortDomListByElo },
        PLAYERS.map(mapPlayerOnto)
      )
    ),
  ];
};

const nameHeader = "NameHeader";
const eloHeader = "EloHeader";
const wonEloHeader = "WonEloHeader";
const teamHeader = "TeamHeader";
function createTableHeader() {
  return React.createElement(
    "div",
    { className: "table" },
    // Table definition start
    React.createElement("div", null, "#"),
    React.createElement(
      "div",
      { id: nameHeader, class: "sortable" },
      null,
      "Name"
    ),
    React.createElement("div", { id: eloHeader, class: "sortable" }, "Elo"),
    React.createElement(
      "div",
      { id: wonEloHeader, class: "sortable" },
      "Won elo"
    ),
    React.createElement("div", { id: teamHeader, class: "sortable" }, "Team")
  );
}

function mapPlayerOnto(leader, index) {
  return React.createElement(
    "div",
    { className: "player", id: leader.nickname },
    // Entspricht der Position
    React.createElement("span", null, " ", index + 1),
    // Player mit einem Bild
    React.createElement(
      "a",
      { href: leader.profileUrl, className: "user", target: "_blank" },
      React.createElement(
        "div",
        { className: "user" },
        React.createElement("img", {
          className: "image",
          src: leader.profileImage,
          id: `${leader.nickname}_img`,
        }),
        React.createElement("span", null, " ", leader.name, " ")
      )
    ),
    // Elo
    React.createElement(
      "span",
      { id: `${leader.nickname}_elo`, name: "elo" },
      " ",
      leader.currentElo,
      " "
    ),
    // Won Elo
    React.createElement(
      "span",
      { id: `${leader.nickname}_diff`, name: "diff" },
      " ",
      leader.diff,
      " "
    ),
    // Team
    React.createElement(
      "span",
      { id: `${leader.nickname}_team` },
      " ",
      React.createElement(
        "a",
        { href: `${window.location.origin}/team.html?team=${leader.team}` },
        leader.team
      )
    )
  );
}

function createLeaderElement(leader, index) {
  return React.createElement(
    "div",
    { className: "leader", key: leader.id, id: `leader_${index + 1}` },
    React.createElement(
      "a",
      { href: leader.profileUrl, className: "user", target: "_blank" },
      React.createElement(
        "div",
        { className: "containerImage" },
        React.createElement("img", {
          className: "image",
          loading: "lazy",
          src: leader.profileImage,
          id: `${leader.nickname}_leader_img`,
        }),
        React.createElement(
          "div",
          { className: "crown" },
          React.createElement(
            "svg",
            {
              id: "crown1",
              fill: "#0f74b5",
              "data-name": "Layer 1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 100 50",
            },

            React.createElement("polygon", {
              className: "cls-1",
              points: "12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50",
            })
          )
        ),

        React.createElement("div", { className: "leaderName" }, leader.name),
        React.createElement(
          "span",
          { hidden: true, id: `${leader.nickname}_leader_diff_span` },
          " ",
          leader.diff
        )
      )
    )
  );
}

function initialiseSorting() {
  [
    [eloHeader, sortDomListByElo],
    [wonEloHeader, sortDomListByWonElo],
    [nameHeader, sortDomListByName],
    [teamHeader, sortDomListByTeam],
  ].forEach((arr) =>
    document.getElementById(arr[0]).addEventListener("click", arr[1])
  );
}

ReactDOM.render(
  React.createElement(App, null),

  document.getElementById("leaderboard-container")
);

initialiseSorting();
