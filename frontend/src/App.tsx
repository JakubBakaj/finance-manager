import TopBar from "./components/TopBar";
import Stats from "./components/Stats.tsx";
import History from "./components/History.tsx";

export default function App() {
  return (
    <div>
      <TopBar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Stats />
        <History />
      </div>
    </div>
  );
}
