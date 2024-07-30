import { useEffect, useState, useContext, useRef } from "react";
import ColorPickerController from "./ColorPickerController.jsx";
import { UpdateStorageContext } from "@/context/UpdateStorageContext.jsx";
import { Slider } from "./ui/slider.jsx";

const BackgroundController = () => {
  const [isTabOne, setIsTabOne] = useState("both");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const colorPaletteRef = useRef(null);

  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [rounded, setRounded] = useState(
    storageValue ? storageValue?.bgRounded : 0
  );
  const [padding, setPadding] = useState(
    storageValue ? storageValue?.bgPadding : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.bgColor : "#fff"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updateValue);
    localStorage.setItem("value", JSON.stringify(updateValue));
  }, [rounded, padding, color]);

  const windowChange = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 640) {
      setIsTabOne("tab1");
    } else {
      setIsTabOne("both");
    }
  };

  useEffect(() => {
    windowChange();
    window.addEventListener("resize", windowChange);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      window.removeEventListener("resize", windowChange);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (colorPaletteRef.current && !colorPaletteRef.current.contains(event.target)) {
      setShowColorPalette(false);
    }
  };

  return (
    <div className="max-sm:flex max-sm:w-screen relative">
      <div className="flex absolute top-0 sm:hidden w-screen">
        <div
          onClick={() => setIsTabOne("tab1")}
          className="w-[50%] p-2 border flex items-center justify-center"
        >
          Operation
        </div>
        <div
          onClick={() => setIsTabOne("tab2")}
          className="w-[50%] p-2 border flex items-center justify-center"
        >
          Color
        </div>
      </div>
      {(isTabOne === "both" || isTabOne === "tab1") && (
        <div className="max-sm:px-4 max-sm:w-[100%] max-sm:mt-10">
          <div className="py-2">
            <label className="p-2 flex justify-between items-center">
              Rounded <span>{rounded} px</span>
            </label>
            <Slider
              defaultValue={[0]}
              max={512}
              step={1}
              onValueChange={(event) => setRounded(event[0])}
            />
          </div>
          <div className="py-2">
            <label className="p-2 flex justify-between items-center">
              Padding <span>{padding} px</span>
            </label>
            <Slider
              defaultValue={[40]}
              max={100}
              step={1}
              onValueChange={(event) => setPadding(event[0])}
            />
          </div>
        </div>
      )}
      {(isTabOne === "both" || isTabOne === "tab2") && (
        <div className="py-2 max-sm:mt-10 max-sm:w-[95%] max-sm:flex max-sm:flex-col max-sm:items-center">
          <label className="p-2 flex justify-between items-center max-sm:hidden">
            Icon color
          </label>
          <div onClick={() => setShowColorPalette(!showColorPalette)} className="p-2 border cursor-pointer">
            Select Color
          </div>
          {showColorPalette && (
            <div ref={colorPaletteRef}>
              <ColorPickerController
                hideController={false}
                selectedColor={(color) => setColor(color)}
                isMobileView={windowWidth <= 640}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundController;
