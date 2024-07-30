import { Download, DownloadIcon, AlignJustify } from "lucide-react"
import { Button } from "./ui/button.jsx"

function Header({DownloadIcon, setShowMenu, showMenu, menuBar}) {
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <div className="flex items-center gap-4">
        {menuBar && <AlignJustify size={35} onClick={()=> setShowMenu(!showMenu)}/>}
        <img className="h-[60px] w-[60px]" src="/penguin.svg"  />
      </div>
      <Button className="flex gap-2 items-center" onClick={()=>DownloadIcon(Date.now())}><Download className="h-4 w-4"/>Download</Button>
    </div>
  )
}

export default Header
