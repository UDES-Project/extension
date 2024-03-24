import { useState } from "react"
import Tabs from "./components/tabs"

function App() {

    const [activeTab, setActiveTab] = useState("🏠 Home")
    const [tabContent, setTabContent] = useState(<></>)

    return <>
        <Tabs active={activeTab} setActive={setActiveTab} setTabContent={setTabContent}/>
        {tabContent}
    </>
}

export default App
