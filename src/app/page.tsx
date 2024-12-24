import Series from "../components/Series/Series";
import Pelis from "../components/Pelis/Pelis";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Pelis />
      <Series />
    </div>
  );
}
