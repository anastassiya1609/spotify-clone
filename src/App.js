import { useEffect, useState } from "react";
import "./assets/css/style.css";
import AppRouter from "./components/core/AppRouter";
import Layout from "./components/core/Layout";
import { getAccessToken } from "./services/auth";

export default function App() {
  const [error, setError] = useState("");
  useEffect(() => {
    async function getToken() {
      try {
        await getAccessToken();
      } catch (error) {
        console.log(error);
        setError("Error during fetching access token");
      }
    }
    getToken();
  }, []);

  if (error) {
    return <div style={{ color: "#fff" }}>{error}</div>;
  }

  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}
