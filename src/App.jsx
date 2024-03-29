import { RecoilRoot } from "recoil";
import Hero from "./components/Hero";

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center pt-7">Video Player</h1>
      <RecoilRoot>
      <Hero/>
      </RecoilRoot>
    </div>
  
  );
}

export default App;
