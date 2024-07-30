import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import IconController from "./components/IconController.jsx";
import BackgroundController from "./components/BackgroundController.jsx";
import SideNav from "./components/SideNav.jsx";
import LogoPreview from "./components/LogoPreview.jsx";
import { UpdateStorageContext } from "./context/UpdateStorageContext.jsx";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [updateStorage , setUpdateStorage] = useState({})
  const [downloadIcon, setDownloadIcon] = useState()
  const [showMenu, setShowMenu] = useState(true);
  const [menuBar, setMenuBar] = useState(false);

  const resizeEvent = ()=>{
    if(window.innerWidth < 1014){
      setMenuBar(true);
      setShowMenu(false)
    }
    else{
      setShowMenu(true)
      setMenuBar(false);
    }
  }
  
  useEffect(()=>{
    resizeEvent();

    window.addEventListener("resize", resizeEvent);
    
    return ()=> window.removeEventListener("resize", resizeEvent);
  }, []);

  return (
    <UpdateStorageContext.Provider value={{updateStorage, setUpdateStorage}}>
      <div className="h-screen sm:overflow-hidden max-sm:overflow-x-hidden">
        <Header DownloadIcon={setDownloadIcon} menuBar={menuBar} setShowMenu={setShowMenu} showMenu={showMenu}/>
        <div className={`flex transition ease-in-out ${!showMenu && 'sm:-translate-x-[12rem]'}`}>
          <div className={`max-sm:fixed z-50 bg-white transition ease-in-out ${!showMenu && "-translate-x-[12rem]"}`}>
            <SideNav setShowMenu={setShowMenu} selectedIndex={(value) => setSelectedIndex(value)} />
          </div>
          <div className={`relative flex ${menuBar?"w-screen":""}`}>
            <div className="absolute left-0 border shadow-sm sm:py-5 sm:px-7 overflow-auto z-20 bg-white">
              {selectedIndex == 0 ? <IconController /> : <BackgroundController />}
            </div>

            <div className="z-10 w-[100vw] overflow-scroll">
              <LogoPreview menuBar={menuBar} downloadIcon={downloadIcon}/>
            </div>
            {/* <div className="bg-blue-200">Ads Banner</div> */}
          </div>
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
