import { Link } from "react-router-dom";
import { SINGLE_ALBUMS_PAGE_ROUTE } from "../../utils/consts";

export default function AlbumItem({imageUrl, title, author, id}) {
    return (
      <Link to={SINGLE_ALBUMS_PAGE_ROUTE.replace(":id", id)} className="album-item">
        <img
          src={imageUrl}
          alt={title}
          className="album-poster"
        />
        <h4 className="album-title">{title}</h4>
        <p className="album-artist">{author}</p>
      </Link>
    );
  }