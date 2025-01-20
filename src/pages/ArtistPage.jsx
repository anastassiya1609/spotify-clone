import { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import Loader from "../components/shared/Loader";
import TrackItem from "../components/tracks/TrackItem";
import { convertMsToTime } from "../utils/utils";
import { axiosInstance } from "../services/axios";

export default function ArtistPage() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [artistData, setArtistData] = useState({});
  const [tracksData, setTracksData] = useState([]);

  useEffect(() => {
    async function fetchArtistData() {
      try {
        setLoading(true);

        const responceArtist = await axiosInstance.get(
          `/artists/${id}?market=KZ`
        );
        const responceTracks = await axiosInstance.get(
          `/artists/${id}/top-tracks?market=KZ`
        );

        setArtistData(responceArtist.data);
        setTracksData(responceTracks.data.tracks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtistData();
  }, [id]);

  return (
    <div className="wrapper">
      <div className="artist-wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <div className="artist-header">
              <img
                src={artistData.images && artistData.images[0]?.url}
                alt=""
                className="artist-img"
              />
              <div className="artist-content">
                <p className="artist-content__verify">
                  <PiSealCheckFill />
                  Подтвержденный исполнитель
                </p>
                <h1 className="artist-content__name">{artistData.name}</h1>
                <div className="artist-content__audience">
                  {artistData.followers && artistData.followers.total}{" "}
                  слушателей за месяц
                </div>
              </div>
            </div>
            <div className="track-table">
              <h2 className="track-table__title">Популярные треки</h2>
              <div className="track-table__body">
                {tracksData.map((item, index) => {
                  if (
                    item.album &&
                    item.album.images &&
                    item.album.images[0]?.url
                  ) {
                    return (
                      <TrackItem
                        key={item.id}
                        isExtended={true}
                        number={index + 1}
                        title={item.name}
                        duration={convertMsToTime(item.duration_ms)}
                        imageUrl={item.album.images[0].url}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
