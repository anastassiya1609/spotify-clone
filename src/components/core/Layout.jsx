import Header from "../layot/Header";
import Sidebar from "../layot/Sidebar";


export default function Layout(props) {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
}
