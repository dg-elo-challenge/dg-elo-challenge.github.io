// import { Component } from "src/component";
const _routing = {
  Leaderboard: "",
  "Team Leaderboard": "/team-leaderboard.html",
};

class Navbar extends Component {
  constructor(contentRoot) {
    super();
    this.contentRoot = contentRoot;
  }

  header() {
    return `<link rel="stylesheet" href="style/navbar.css">`;
  }

  content() {
    let nav = document.createElement("nav");
    nav.className = "navbar navbar-expand-sm navbar-dark bg-dark";

    let div = document.createElement("div");
    div.id = "topnav";
    div.classList = ["topnav"];

    let img = document.createElement("img");
    img.src = "favicon.ico";
    img.className = "navbar-brand";

    div.appendChild(img);
    for (const [routName, rout] of Object.entries(_routing)) {
      div.appendChild(createLink(this.contentRoot + rout, routName));
    }

    nav.appendChild(div);
    return nav;
  }
}

function createBreak() {
  return document.createElement("br");
}

function createLink(link, text) {
  const a = document.createElement("a");
  a.href = link;
  a.text = text;
  a.className = "navbar-brand";
  return a;
}
