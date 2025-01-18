import { useEffect, useState } from "react";
import { albumLinks, ACCES_TOKEN } from "../utils/consts";
import Loader from "./Loader";
import AlbumItem from "./AlbumItem";

export default function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getAlbums() {
      try {
        setLoading(true);
        const ids = albumLinks.join(",");
        const responce = await fetch(
          `https://api.spotify.com/v1/albums?ids=${ids}&market=KZ`,
          { method: "GET", headers: { Authorization: `Bearer ${ACCES_TOKEN}` } }
        );
        const data = await responce.json();
        console.log(data.albums);
        setAlbums(data.albums);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAlbums();
  }, []);
  return (
    <div className="wrapper">
      <h1 className="wrapper-title">Популярные альбомы</h1>
      <div className="album-wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="album-grid">
            {albums.map((item) => (
              <AlbumItem
                title={item.name}
                author={item.artists[0].name}
                imageUrl={item.images[0].url}
                key={item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
