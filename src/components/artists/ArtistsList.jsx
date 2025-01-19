import { useEffect, useState } from "react";
import { artistsLinks, ACCES_TOKEN } from "../../utils/consts";
import Loader from "../Loader";

import Error from "../Error";
import ArtistsItem from "./ArtistsItem";

export default function ArtistsList() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getArtists() {
      try {
        setLoading(true);
        const ids = artistsLinks.join(",");
        const responce = await fetch(
          `https://api.spotify.com/v1/artists?ids=${ids}&market=KZ`,
          { method: "GET", headers: { Authorization: `Bearer ${ACCES_TOKEN}` } }
        );
        const data = await responce.json();
        console.log(data.artists);
        setArtists(data.artists);
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
