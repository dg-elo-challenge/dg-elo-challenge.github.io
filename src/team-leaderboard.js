import React, { useRef } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

/*class definitions start */

class Team {
  _players = [];
  _teamName;
  constructor(player) {
    this._players.push(player);
    this._teamName = player.team;
  }

  addPlayer(player) {
    this._players.push(player);
  }

  get team() {
    return this._teamName;
  }

  get gesamtElo() {
    return this._players
      .map((player) => player.diff)
      .reduce((val, diff) => val + diff, 0);
  }

  static compare(teamA, teamB) {
    return teamB.gesamtElo - teamA.gesamtElo;
  }
}
/*class definitions end */

function main() {
  PLAYERS.forEach(update);

  const App = () => {
    const teams = groupByTeam(PLAYERS);
    const components = [];
    Object.values(teams).forEach((team, index) => {
      components.push(
        React.createElement(
          "tr",
          {
            id: team.team,
            onClick: () => showHideRow(`${team.team}_hidden`),
          },
          React.createElement("td", null, index + 1),

          React.createElement(
            "td",
            null,
            React.createElement(
              "a",
              {
                href: `${window.location.origin}/team.html?team=${team.team}`,
                class: "link",
              },
              team.team
            )
          ),
          React.createElement("td", { id: `${team.team}_elo` }, team.gesamtElo)
        )
      );
      //   components.push(
      //     React.createElement(
      //       "tr",
      //       { hidden: true, id: `${team.team}_hidden` },
      //       React.createElement("td", null, ""),
      //       React.createElement("td", null, team.team),
      //       React.createElement("td", null, team.team)
      //     )
      //   );
    });
    return components;
  };

  ReactDOM.render(
    React.createElement(App, null),

    document.getElementById("table-content")
  );
}

function groupByTeam(players) {
  return players.reduce((map, player) => {
    map[player.team]
      ? map[player.team].addPlayer(player)
      : (map[player.team] = new Team(player));
    return map;
  }, {});
}

/**
 * Side effect: Sorts the Team leaderboard by calling `domSortList()`.
 *
 * @param {Player} player
 * @param {number} index
 * @returns null
 */
async function update(player, index) {
  // await for slow sorting effect.
  const json = await FaceitApiService.getPlayer(player.nickname);
  if (!json || json.error) {
    return;
  }
  try {
    player.profileImage = json.avatar;
    player.currentElo = json.games.cs2.faceit_elo;
  } catch {
    return;
  }

  let teamEloDom = document.getElementById(`${player.team}_elo`);
  const teamElo = +teamEloDom.textContent;
  teamEloDom.textContent = teamElo + player.diff;

  domSortList();
}

function domSortList() {
  var list = document.getElementById("table-content");

  var items = list.children;
  var itemsArr = [];
  for (let i in items) {
    if (items[i].nodeType == 1) {
      // get rid of the whitespace text nodes
      itemsArr.push(items[i]);
    }
  }

  itemsArr.sort(function (a, b) {
    let aDiff = +a.children.item(2).textContent;
    let bDiff = +b.children.item(2).textContent;
    return aDiff == bDiff ? 0 : aDiff < bDiff ? 1 : -1;
  });

  for (let i = 0; i < itemsArr.length; ++i) {
    itemsArr[i].firstChild.textContent = i + 1;
    list.appendChild(itemsArr[i]);
  }
}

function showHideRow(row) {
  const rowDom = document.getElementById(row);
  rowDom.hidden = !rowDom.hidden;
}

main();
