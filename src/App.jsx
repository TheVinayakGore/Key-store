import Footer from "./Components/Footer";
import Manager from "./Components/Manager";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col font-light">
        <Navbar />
        <div className="bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <Manager />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
