import { Link } from "react-router-dom";

export default function AlbumItem({imageUrl, title, author, id}) {
    return (
      <Link to={`/albums/${id}`} className="album-item">
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