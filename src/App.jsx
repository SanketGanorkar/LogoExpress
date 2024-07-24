import { useState } from "react";
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
  return (
    <UpdateStorageContext.Provider value={{updateStorage, setUpdateStorage}}>
      <div>
        <Header DownloadIcon={setDownloadIcon}/>
        <div className="w-64 fixed">
          <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
        </div>
        <div className="ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
          <div className="md:col-span-2 border h-screen shadow-sm p-5 overflow-auto">
            {selectedIndex == 0 ? <IconController /> : <BackgroundController />}
          </div>

          <div className="md:col-span-3">
            <LogoPreview downloadIcon={downloadIcon}/>
          </div>
          {/* <div className="bg-blue-200">Ads Banner</div> */}
        </div>
      </div>
    </UpdateStorageContext.Provider>
  );
}

export default App;
