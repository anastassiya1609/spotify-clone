import { useEffect, useState } from "react";
import { axiosInstance } from './../services/axios';
import { artistsLinks } from "../utils/consts";

export function useTopArtists(){
 
    const [artists, setArtists] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
  
    useEffect(() => {
      async function getArtists() {
        try {
          setLoading(true);
          const ids = artistsLinks.join(",");
          // const responce = await fetch(
          //   `https://api.spotify.com/v1/artists?ids=${ids}&market=KZ`,
          //   { method: "GET", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          // );
          // const data = await responce.json();
  
          const res = await axiosInstance.get("/artists", {
            params: {
              ids: ids,
              market: "KZ",
            },
          });
          setArtists(res.data.artists);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      getArtists();
    }, []);

    return {artists, isLoading, isError}
}