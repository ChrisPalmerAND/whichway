import RenderMap from "./services/leaflet/renderMap";
import Instructions from "./components/instructions";
import AreaSummary from "./components/areaSummary";

function App() {
  return (
    <>
      <Instructions />
      <RenderMap />
      <AreaSummary />
    </>
  );
}

export default App;
