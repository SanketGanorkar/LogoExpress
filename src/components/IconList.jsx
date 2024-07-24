import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { iconList } from "@/constants/icons";
import { useEffect, useState } from "react";
import { icons } from "lucide-react";
import axios from "axios";
const BASE_URL = "https://logoexpress.tubeguruji.com";
function IconList({ selectedIcon }) {
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [pngIconList, setPngIconlist] = useState([]);
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getPngIcon();
  }, []);
  const Icon = ({ name, color, size }) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) {
      return;
    }
    return <LucideIcon color={color} size={size} />;
  };

  const getPngIcon = () => {
    axios.get(BASE_URL + "/getIcons.php").then((resp) => {
      console.log(resp.data);
      setPngIconlist(resp.data);
    });
  };
  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2"
          onClick={() => setOpenDialog(true)}
        >
          {icon?.includes(".png") ? (
            <img src={BASE_URL + "/png/" + icon} alt="" />
          ) : (
            <Icon name={icon} color={"#000"} size={20} />
          )}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Favourite Icon</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Colour Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                    {iconList.map((icon, index) => (
                      <div
                        key={index}
                        className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                        onClick={() => {
                          selectedIcon(icon);
                          setOpenDialog(false);
                          setIcon(icon);
                        }}
                      >
                        <Icon name={icon} color={"#000"} size={20} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color-icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                    {pngIconList.map((icon, index) => (
                      <div
                        key={index}
                        className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                        onClick={() => {
                          selectedIcon(icon);
                          setOpenDialog(false);
                          setIcon(icon);
                        }}
                      >
                        <img src={BASE_URL + "/png/" + icon} alt="" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconList;
