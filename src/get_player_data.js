class FaceitApiService {
  static FACEIT_URL = "https://open.faceit.com/data/v4";
  static API_KEY = "1aed0c20-9adc-476b-8847-38b755cb6681";

  static async getPlayer(playerNickname) {
    let url =
      FaceitApiService.FACEIT_URL + "/players?nickname=" + playerNickname;

    let headers = {};
    headers.authorization = `Bearer ${FaceitApiService.API_KEY}`;

    let response;
    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${FaceitApiService.API_KEY}`,
          accept: "application/json",
        },
        mode: "cors", // no-cors, *cors, same-origin
      });
    } catch {
      return false;
    }

    return response.json();
  }
}
