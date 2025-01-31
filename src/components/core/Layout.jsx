import classNames from "classnames";
import Sidebar from "../layot/Sidebar";
import { useTheme } from "../../providers/ThemeProvider";
import { useEffect } from "react";
import Header from "../layot/Header";

export default function Layout(props) {
  const { isLightTheme } = useTheme();
  useEffect(() => {
    document.body.style.background = isLightTheme ? "#fff" : "#000";
  }, [isLightTheme]);

  return (
    <div className={classNames("app", { light: isLightTheme })}>
      <Header />
      <div className="container">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}
