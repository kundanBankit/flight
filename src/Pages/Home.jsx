import { useState } from "react";
import MainNavigation from "../Components/MainNavigation";

export default function Home() {
  const [activePage, setActivePage] = useState("flight");

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-start p-3"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div style={{ width: "100%" }}>
        <MainNavigation activePage={activePage} onNavClick={setActivePage} />
      </div>
    </div>
  );
}
