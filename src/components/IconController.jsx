// import { Smile } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import { Slider } from "@/components/ui/slider";
// import { UpdateStorageContext } from "@/context/UpdateStorageContext.jsx";
// import ColorPickerController from "./ColorPickerController.jsx";
// import IconList from "./IconList.jsx";

// const IconController = () => {

//   const [isTabOne, setIsTabOne] = useState("both");
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const storageValue = JSON.parse(localStorage.getItem("value"));
//   const [size, setSize] = useState(storageValue ? storageValue.iconSize : 280);
//   const [rotate, setRotate] = useState(
//     storageValue ? storageValue.iconRotate : 0
//   );
//   const [color, setColor] = useState(
//     storageValue ? storageValue?.iconColor : "#fff"
//   );
//   const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
//   const [icon, setIcon] = useState(storageValue ? storageValue?.icon : 'Smile')
//   useEffect(() => {
//     const updatedValue = {
//       ...storageValue,
//       iconSize: size,
//       iconRotate: rotate,
//       iconColor: color,
//       icon: icon,
//     };
//     setUpdateStorage(updatedValue);
//     localStorage.setItem("value", JSON.stringify(updatedValue));
//   }, [size, rotate, color, icon]);


//   const windowChange = () => {
//     setWindowWidth(window.innerWidth);
//     if (window.innerWidth <= 640) {
//       setIsTabOne("tab1");
//     }
//     else {
//       setIsTabOne("both");
//     }
//   }

//   useEffect(() => {
//     windowChange();

//     window.addEventListener("resize", windowChange);


//     return () => window.removeEventListener("resize", windowChange);
//   }, []);

//   return (
//     <div>
//       <div className="max-sm:flex max-sm:w-screen relative">
//         <div className="flex absolute top-0 sm:hidden w-screen">
//           <div onClick={() => setIsTabOne("tab1")} className="w-[50%] p-2 border flex items-center justify-center">
//             Operation
//           </div>
//           <div onClick={() => setIsTabOne("tab2")} className="w-[50%] p-2 border flex items-center justify-center">
//             Color
//           </div>
//         </div>
//         {(isTabOne === "both" || isTabOne === "tab1") &&  <div className="max-sm:px-4 max-sm:w-[100%] max-sm:mt-10 max-sm:pb-6">
//           <IconList selectedIcon={(icon) => setIcon(icon)} />
//           <div className="py-2">
//             <label className="p-2 flex justify-between items-center">
//               Size <span>{size} px</span>
//             </label>
//             <Slider
//               defaultValue={[size]}
//               max={512}
//               step={1}
//               onValueChange={(event) => setSize(event[0])}
//             />
//           </div>
//           <div className="py-2">
//             <label className="p-2 flex justify-between items-center">
//               Rotate <span>{rotate} °</span>
//             </label>
//             <Slider
//               defaultValue={[rotate]}
//               max={360}
//               step={1}
//               onValueChange={(event) => setRotate(event[0])}
//             />
//           </div>
//         </div>}
//         {(isTabOne === "both" || isTabOne === "tab2") && <div className="py-2 max-sm:mt-10 max-sm:w-[95%] max-sm:flex max-sm:flex-col max-sm:items-center">
//           <label className="p-2 flex justify-between items-center max-sm:hidden">
//             Icon color
//           </label>
//           <ColorPickerController
//             hideController={true}
//             selectedColor={(color) => setColor(color)}
//             isMobileView={windowWidth <= 640?true:false}
//           />
//         </div>}
//       </div>
//     </div>
//   );
// };

// export default IconController;
import { Smile } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { UpdateStorageContext } from "@/context/UpdateStorageContext.jsx";
import ColorPickerController from "./ColorPickerController.jsx";
import IconList from "./IconList.jsx";

const IconController = () => {
  const [isTabOne, setIsTabOne] = useState("both");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const colorPaletteRef = useRef(null);

  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [size, setSize] = useState(storageValue ? storageValue.iconSize : 280);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue.iconRotate : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.iconColor : "#fff"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : 'Smile');

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

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
    <div>
      <div className="max-sm:flex max-sm:w-screen relative">
        <div className="flex absolute top-0 sm:hidden w-screen">
          <div onClick={() => setIsTabOne("tab1")} className="w-[50%] p-2 border flex items-center justify-center">
            Operation
          </div>
          <div onClick={() => setIsTabOne("tab2")} className="w-[50%] p-2 border flex items-center justify-center">
            Color
          </div>
        </div>
        {(isTabOne === "both" || isTabOne === "tab1") && (
          <div className="max-sm:px-4 max-sm:w-[100%] max-sm:mt-10 max-sm:pb-6">
            <IconList selectedIcon={(icon) => setIcon(icon)} />
            <div className="py-2">
              <label className="p-2 flex justify-between items-center">
                Size <span>{size} px</span>
              </label>
              <Slider
                defaultValue={[size]}
                max={512}
                step={1}
                onValueChange={(event) => setSize(event[0])}
              />
            </div>
            <div className="py-2">
              <label className="p-2 flex justify-between items-center">
                Rotate <span>{rotate} °</span>
              </label>
              <Slider
                defaultValue={[rotate]}
                max={360}
                step={1}
                onValueChange={(event) => setRotate(event[0])}
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
                  hideController={true}
                  selectedColor={(color) => setColor(color)}
                  isMobileView={windowWidth <= 640}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconController;
