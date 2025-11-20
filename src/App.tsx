import "./App.css";
import { GameLogik } from "./components/GameLogik";

function App() {
  return (
    <div className="pulse-background fixed inset-0 w-full min-h-screen">
      <h1 className="text-4xl font-bold text-center text-slate-50 pt-10 m-0">
        Imposter Game
      </h1>

      <div className="mt-20 flex justify-center">
        <GameLogik />
      </div>
    </div>
  );
}

export default App;
