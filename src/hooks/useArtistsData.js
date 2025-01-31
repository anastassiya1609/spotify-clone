import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";

export function useArtistsData ( id ) {

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

  return { artistData, tracksData, isLoading };
}
