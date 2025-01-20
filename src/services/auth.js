import axios from "axios";

const url = "https://accounts.spotify.com/api/token";
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export async function fetchAccessToken() {
  try {
    const res = await axios.post(
      url,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // const responce = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     grant_type: "client_credentials",
    //     client_id: clientId,
    //     client_secret: clientSecret,
    //   }),
    // });
    // const data = await responce.json();
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    const expiresIn = Date.now() + res.data.expires_in * 1000;
    localStorage.setItem("expiresIn", expiresIn);
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccessToken() {
  try {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");

    if (token && expiresIn && Date.now() < expiresIn) {
      return token;
    }
    return await fetchAccessToken();
  } catch (error) {
    console.log(error);
  }
}

//  curl.exe -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials&client_id=9e4feee327cc46d1923267f61c50360e&client_secret=b843ac32ed0e43a2859d00e05e94ba97"
