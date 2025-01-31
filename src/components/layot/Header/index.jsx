import { FiSearch } from "react-icons/fi";
import { GrHomeRounded } from "react-icons/gr";
import logo from "../../../assets/img/logo.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ALBUMS_PAGE_ROUTE, SEARCH_PAGE_ROUTE } from "../../../utils/consts";
import styles from "./Header.module.css"

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (searchInput) {
      navigate(SEARCH_PAGE_ROUTE + "?query=" + searchInput);
      setSearchInput("");
    }
  }
  return (
    <div className={styles.header}>
      <div className={styles.part}>
        <img
          src={logo}
          alt="Logo"
          width={32}
          height={32}
          className="header-img"
        />
      </div>
      <div className={styles.part}>
        <Link to={ALBUMS_PAGE_ROUTE} className={styles.btn}>
          <GrHomeRounded />
        </Link>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="Что хочешь включить?"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <FiSearch className={styles.icon} />
        </form>
      </div>
      <div className={styles.part}></div>
    </div>
  );
}
