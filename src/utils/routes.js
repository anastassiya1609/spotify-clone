import TopAlbumsPage from "../pages/TopAlbumsPage";
import TopArtistsPage from "../pages/TopArtistsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import AlbumPage from "../pages/AlbumPage";
import ArtistPage from "../pages/ArtistPage";
import SearchPage from "../pages/SearchPage";
import {
  ALBUMS_PAGE_ROUTE,
  ARTISTS_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  SINGLE_ALBUMS_PAGE_ROUTE,
  NOT_FOUND_PAGE_ROUTE,
  SINGLE_ARTIST_PAGE_ROUTE,
  SEARCH_PAGE_ROUTE,
} from "./consts";

export const routes = [
  {
    path: ALBUMS_PAGE_ROUTE,
    element: TopAlbumsPage,
  },
  {
    path: ARTISTS_PAGE_ROUTE,
    element: TopArtistsPage,
  },
  {
    path: SETTINGS_PAGE_ROUTE,
    element: SettingsPage,
  },
  {
    path: NOT_FOUND_PAGE_ROUTE,
    element: NotFoundPage,
  },
  {
    path: SINGLE_ALBUMS_PAGE_ROUTE,
    element: AlbumPage,
  },
  {
    path: SEARCH_PAGE_ROUTE,
    element: SearchPage,
  },
  {
    path: SINGLE_ARTIST_PAGE_ROUTE,
    element: ArtistPage,
  },
];
