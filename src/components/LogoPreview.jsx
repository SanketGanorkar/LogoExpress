import { useEffect, useState, useContext } from "react";
import { UpdateStorageContext } from "@/context/UpdateStorageContext.jsx";
import { icons } from "lucide-react";
import html2canvas from "html2canvas";

const LogoPreview = ({ downloadIcon }) => {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  const BASE_URL = "https://logoexpress.tubeguruji.com";

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
    }
  }, [downloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv");

    // This html2canvas does not downloads images from url because of security purposes
    html2canvas(downloadLogoDiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      downloadLink.href = pngImage;
      downloadLink.download = "Logo_Maker.png";
      downloadLink.click();
    });
  };
  const Icon = ({ name, color, size, rotate }) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) {
      return;
    }
    return (
      <LucideIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      />
    );
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{
          padding: storageValue?.bgPadding,
        }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {" "}
          {storageValue?.icon?.includes(".png") ? (
            <img src={"/png/"+storageValue?.icon} style={{
              height:storageValue?.iconSize,
              width:storageValue?.iconSize,
            }}/>
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;
