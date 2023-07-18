from typing import List


class Player:

    def __init__(
        self,
        nickname,
        profileLink,
        startElo,
        discordTag,
        team,
        rolle,
        spielZeit,
        skin,
    ):
        self.nickname = nickname
        self.profileLink = profileLink
        self.startElo = startElo
        self.discordTag = discordTag
        self.team = team
        self.rolle = rolle
        self.spielZeit = spielZeit
        self.skin = skin


def toTsObj(player: Player) -> str:
    return f'''new Player(
        {player.profileLink},
        {player.nickname},
        {player.team},
        {player.startElo[1:-1]},
        {player.startElo[1:-1]}
    )'''

def toPrismaObj(player: Player) -> str:
    return f'''{{
        name: "{player.profileLink.split('/')[-1]},
        profileLink: {player.profileLink},
        playerId: {player.nickname},
        team: {player.team},
        startElo: {player.startElo[1:-1]},
        currentElo: {player.startElo[1:-1]}
    }}'''


def toTsArr(players: List[Player]) -> str:
    player_content = ',\n    '.join(toTsObj(player) for player in players)
    return f'''[
        {player_content}
]'''


def toPrismaSeed(players: List[Player]) -> str:
    player_content = ',\n    '.join(toPrismaObj(player) for player in players)
    return f'''{{
        {player_content}
}}'''


if __name__ == '__main__':
    file_ = open('FACEIT_Offseason-Event.csv', 'r')
    _players = [Player(*(line.split(',')[1:]))
                for line in file_.read().split('\n')
                if len(line) > 0]
    print(toTsArr(_players))

    file_.close()
