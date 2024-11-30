import { useEffect } from "react"
import Home from "./home"
import Extensions from "./extensions"
import Settings from "./settings"

export default function Tabs({active, setActive, setTabContent}: {active: string, setActive: (key: string) => void, setTabContent: (content: JSX.Element) => void}) {

    const tabs: any = {
        "Home": <Home/>,
        "Extensions": <Extensions/>,
        "Settings": <Settings/>
    }

    useEffect(() => {
        setTabContent(tabs[active])
    }, [active])

    return <div className="w-full h-12 flex">
        {Object.keys(tabs).map((key) => <div onClick={() => setActive(key)} className={`transition cursor-pointer border-b-2 flex-1 flex items-center justify-center ${active === key ? "border-green-500 bg-gray-100" : ""}`} key={key}>{key}</div>)}
    </div>
}