import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [handle, setHandle] = useState("");
  return (
    <>
      <NavBar setHandle={setHandle} />
      <Outlet context={handle} />
      <Footer />
    </>
  );
}

export default App;
