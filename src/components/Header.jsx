import { Download, DownloadIcon } from "lucide-react"
import { Button } from "./ui/button.jsx"

function Header({DownloadIcon}) {
  return (
    <div className="p-4 shadow-sm border flex justify-between items-center">
      <img className="h-[60px] w-[60px]" src="/penguin.svg"  />
      <Button className="flex gap-2 items-center" onClick={()=>DownloadIcon(Date.now())}><Download className="h-4 w-4"/>Download</Button>
    </div>
  )
}

export default Header
