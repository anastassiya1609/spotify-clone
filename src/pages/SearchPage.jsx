import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../services/axios";
import Loader from "../components/shared/Loader";
import TrackItem from "../components/tracks/TrackItem";
import { convertMsToTime } from "./../utils/utils";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/search?", {
          params: {
            q: searchParams.get("query"),
            type: "track",
            market: "KZ",
            limit: 10,
          },
        });
        setTracks(res.data.tracks.items);
        console.log(res.data.tracks.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTracks();
  }, [searchParams]);

  return (
    <div className="wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {" "}
          <h1 className="wrapper-title">Результаты поиска</h1>
          <div className="search-list">
            {tracks.map((track, index) => (
              <TrackItem
                number={index + 1}
                title={track.name}
                duration={convertMsToTime(track.duration_ms)}
                author={track.artists.map((item) => item.name).join(", ")}
                imageUrl={track.album.images[0].url}
                key={index}
                isExtended={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
