import os
from typing import Iterable, List
import requests
from requests.models import Response


def main():
    players = get_players_from_file('WiSe23-FACEIT-Offseason-Event.csv')
    js_players = convert_players_to_js_objs(players)
    write_players_to_file('../src/players.js', js_players)


class Player:

    def __init__(
        self,
        nickname: str,
        profileLink: str,
        startElo: int,
        team: str,
        discordTag: str,
        skin: str,
    ):
        self._nickname = nickname
        self._profile_link = profileLink
        self._start_elo = startElo
        self._discord_tag = discordTag
        self._team = team
        self._skin = skin

        faceit_nickname = profileLink.split('/')[-1].strip()
        try:
            json = self._get_corresponding_json_from_faceit(faceit_nickname)
        except Exception:
            print("Failed to fetch user from faceit")

        try:
            self._profile_image = json['avatar'] if json['avatar'] else '/favicon.ico'
        except KeyError as err:
            print(
                f'The json response for {nickname} was faulty. {err.args} was not present in the response!')

        try:
            self._current_elo = json['games']['csgo']['faceit_elo']
        except KeyError as err:
            print(
                f'The json response for {nickname} was faulty. {err.args} was not present in the response!')

    def _get_corresponding_json_from_faceit(self, nickname: str):
        FACEIT_URL = "https://open.faceit.com/data/v4"
        API_KEY = "1aed0c20-9adc-476b-8847-38b755cb6681"

        url = f"{FACEIT_URL}/players?nickname={nickname}"

        headers = {
            'authorization': f'Bearer {API_KEY}',
            'accept': 'application/json',
        }

        response: Response = requests.get(url, headers=headers)
        return response.json()

    @property
    def nickname(self) -> str:
        return self._nickname

    @property
    def current_elo(self) -> str:
        return self._current_elo

    def as_js_obj(self) -> str:
        return f'''new Player(
            "{self._profile_link}",
            "{self._nickname}",
            "{self._team}",
            "{self._start_elo}",
            "{self._start_elo}",
            "{self._profile_image}",
        )'''

    def __repr__(self) -> str:
        return '\n    '.join(['Player{'] + [f'{key}: {val}' for key, val in self.__dict__.items()]) + '\n}'


def get_players_from_file(file: str) -> List[Player]:
    def prep_line(line: str) -> Iterable[str]:
        relevant_cells = line.split(',')[1:]
        return (cell.replace('"', '').strip() for cell in relevant_cells)

    file_ = open(file, 'r')
    lines_with_players = (prep_line(line)
                          for line in file_.read().split('\n')[1:]
                          if len(line) > 0)

    players = [Player(*line) for line in lines_with_players]
    file_.close()
    return players


def convert_players_to_js_objs(players: List[Player]) -> List[str]:
    return [player.as_js_obj() for player in players]


def write_players_to_file(file: str, js_players: List[str]) -> None:
    file_ = open(file, 'w')
    file_.write(f'// This file was autogenerated by {os.path.basename(__file__)}' + '''
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
}\n\n\n'''
                + 'const PLAYERS = [\n    ' + ',\n    '.join(js_players) + '\n]')


if __name__ == '__main__':
    main()
