import NotFoundImage from "../../src/assets/img/not-found.svg";
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="wrapper">
      <div className="nf-container">
        <h2 className="wrapper-title">
          Страница не найдена. Перейдите на  <Link to="/">главную</Link>
        </h2>
        <img src={NotFoundImage} alt="not-found" className="nf-img" />
      </div>
    </div>
  );
}
