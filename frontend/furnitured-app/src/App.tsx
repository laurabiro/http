import Menu from "./components/Menu";

function App() {
  return (
    <div className="app-cont min-h-screen m-0 flex flex-col justify-between">
      <header className="pl-5 pr-5 pt-6 bg-[#DEDDE7] border-b-3 border-black border-solid flex justify-between">
        <p className="header-name text-5xl">livingroom</p>
        <div className="drawer flex justify-center items-center w-32 h-12 bg-white rounded border-3 border-black border-solid">
          <div className="drawer-handle w-5 h-5 rounded-full border-2 border-black border-solid bg-gray-300"></div>
        </div>
      </header>

      
      <Menu></Menu>

      <footer className="p-5 m-0 flex justify-between items-center bg-gray-700">
        <p className="footer-name">FAQ's</p>
        <div className="to-newsletter bg-[#DEDDE7] h-20 w-20 border-3 border-black border-solid rounded-full">
        </div>
      </footer>
    </div>
  );
}

export default App;
