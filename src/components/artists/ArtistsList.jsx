import { useEffect, useState } from "react";
import { artistsLinks } from "../../utils/consts";
import Loader from "../shared/Loader";

import Error from "../shared/Error";
import ArtistsItem from "./ArtistsItem";
import { axiosInstance } from "../../services/axios";

export default function ArtistsList() {
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
  return (
    <div className="artist-wrapper">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <div className="artist-grid">
          {artists.map((item) => (
            <ArtistsItem
              name={item.name}
              profilePictureUrl={item.images[0].url}
              key={item.id}
              id={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
