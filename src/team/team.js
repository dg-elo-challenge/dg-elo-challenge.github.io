import React, { useRef } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const el = React.createElement;

function main() {
  PLAYERS.forEach(update);

  const App = () => {
    const teams = groupByTeam(PLAYERS);
    const team = getQueryParams().team;
    return teams[team].html;
  };

  ReactDOM.render(
    React.createElement(App, null),

    document.getElementById("team-content")
  );
}

function getQueryParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  return params;
}

async function update(player) {
  const json = await FaceitApiService.getPlayer(player.nickname);
  if (!json || json.error) {
    return;
  }
  try {
    player.profileImage = json.avatar ? json.avatar : '/favicon.ico';
    player.currentElo = json.games.cs2.faceit_elo;
  } catch {
    return;
  }

  setTextContentOfSpan(
    `${player.nickname}_current_elo`,
    `Aktuelle Elo: ${player.currentElo}`
  );
  setTextContentOfSpan(`${player.nickname}_diff`, `Elo Score: ${player.diff}`);

  setOfDomElementIfNotNull(
    `${player.nickname}_img`,
    player.profileImage,
    (domElement, content) => domElement.setAttribute("src", content)
  );
}

function setTextContentOfSpan(domElementId, content) {
  setOfDomElementIfNotNull(
    domElementId,
    content,
    (domEl, cont) => (domEl.textContent = cont)
  );
}

function setOfDomElementIfNotNull(domElementId, content, attributeFun) {
  const domElement = document.getElementById(domElementId);
  if (domElement != null) {
    attributeFun(domElement, content);
  }
}

function groupByTeam(players) {
  return players.reduce((map, player) => {
    map[player.team]
      ? map[player.team].addPlayer(player)
      : (map[player.team] = new ReactTeam(player));
    return map;
  }, {});
}

class ReactTeam {
  _players = [];
  _teamName;
  constructor(player) {
    this._players.push(player);
    this._teamName = player.team;
  }

  addPlayer(player) {
    this._players.push(player);
  }

  _heading() {
    return el(
      "div",
      { class: "sec-title light text-center" },
      el("span", { class: "title" }, "Düsseldorf Gaming"),
      el("h2", null, this._teamName)
    );
  }

  _createPlayer(player) {
    function createImageBox() {
      return el(
        "a",
        { href: player.profileUrl, target: "_blank" },
        el(
          "div",
          { class: "image-box" },
          el(
            "figure",
            { class: "image" },

            el("img", {
              src: player.profileImage,
              id: `${player.nickname}_img`,
            })
          )
        )
      );
    }

    function createCaptionBox() {
      return el(
        "div",
        { class: "caption-box" },
        el(
          "a",
          { href: player.profileUrl, target: "_blank" },
          el("h4", { class: "name" }, player.name)
        ),
        el("span", { class: "designation" }, `Start Elo: ${player.startElo}`),
        el(
          "span",
          { class: "designation", id: `${player.nickname}_current_elo` },
          `Aktuelle Elo: ${player.currentElo}`
        ),
        el(
          "span",
          { class: "designation", id: `${player.nickname}_diff` },
          `Elo Score: ${player.diff}`
        )
      );
    }

    return el(
      "div",
      {
        class: "speaker-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp",
      },
      el("div", { class: "inner-box" }, createImageBox(), createCaptionBox())
    );
  }

  get html() {
    return el(
      "div",
      { class: "container" },
      this._heading(),
      el("div", { class: "row" }, this._players.map(this._createPlayer))
    );
  }
}

main();
