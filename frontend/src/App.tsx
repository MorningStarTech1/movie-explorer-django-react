import React from "react";
import "./index.css";
import { MovieProvider } from "./context/MovieContext";
import { Layout } from "./components";
import { MovieExplorer } from "./components/MovieExplorer";

const App: React.FC = () => {
  return (
    <MovieProvider>
      <Layout>
        <MovieExplorer />
      </Layout>
    </MovieProvider>
  );
};

export default App;
