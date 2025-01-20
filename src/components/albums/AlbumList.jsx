import { useEffect, useState } from "react";
import { albumLinks } from "../../utils/consts";
import Loader from "../shared/Loader";
import AlbumItem from "./AlbumItem";
import Error from "../shared/Error";
import { axiosInstance } from "../../services/axios";

export default function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    async function getAlbums() {
      try {
        setLoading(true);
        const ids = albumLinks.join(",");
        // const responce = await fetch(
        //   `https://api.spotify.com/v1/albums?ids=${ids}&market=KZ`,
        //   { method: "GET", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        // );
        // const data = await responce.json();
        const res = await axiosInstance.get("/albums", {
          params: {
            ids: ids,
            market: "KZ",
          },
        });
        setAlbums(res.data.albums);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getAlbums();
  }, []);
  return (
    <div className="album-wrapper">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <div className="album-grid">
          {albums.map((item) => (
            <AlbumItem
              title={item.name}
              author={item.artists[0].name}
              imageUrl={item.images[0].url}
              key={item.id}
              id={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
