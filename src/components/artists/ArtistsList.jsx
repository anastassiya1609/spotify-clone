import Loader from "../shared/Loader";
import Error from "../shared/Error";
import ArtistsItem from "./ArtistsItem";
import { useTopArtists } from "../../hooks/useTopArtists";

export default function ArtistsList() {
const {artists, isLoading, isError} =  useTopArtists();
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
