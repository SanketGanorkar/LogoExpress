import { PencilRuler, ChevronRight, Image, Shield } from "lucide-react";
import { useState } from "react";

function SideNav({ selectedIndex, setShowMenu }) {
  const menuList = [
    {
      id: 1,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="relative border shadow-sm h-screen">
      <div>
        {menuList.map((menu, index) => (
          <h2
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
              if(window.innerWidth < 640) setShowMenu(false);
            }}
            className={`p-3 text-lg px-7 text-gray-500 my-2 cursor-pointer hover:bg-primary hover:text-white flex items-center gap-2 ${
              activeIndex == index && `bg-primary text-white`
            }`}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
