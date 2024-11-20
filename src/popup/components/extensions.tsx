import { useEffect, useState } from "react"
import { UDES_Popup } from "@udes-lib/web-ext"

interface Extension {
    name: string
    icon: string
    showcase?: string
    github?: string
    install?: string
}

function ExtensionCard({ name, icon, showcase, github, install }: Extension) {
    return <div className="flex border-b p-3 justify-between bg-gray-50">
        <div className="flex gap-4 items-center ml-2">
            <img src={icon} className="h-8" alt="" />
            <h1>{name}</h1>
        </div>
        <div className="flex gap-3 items-center">
            { showcase && <a href={showcase} className="text-sm">Showcase</a> }
            { github && <a href={github} className="text-sm">Github</a>}
            <div className="h-full w-[1px] bg-gray-300"></div>
            {
                install ?
                    <a href={install} className="p-2 px-3 rounded bg-green-700 text-white">Install</a>
                : <span className="p-2 px-3 text-gray-400">Installed</span>
            }
        </div>
    </div>
}

export default function Extensions() {

    const [extensions, setExtensions] = useState<Extension[]>([
        {
            "name": "Discord Web",
            "icon": "icons/discord.png",
            "install": "https://udes.app/",
            "github": "https://github.com/UDES-Project/discord-client"
        }
    ])

    useEffect(() => {
        UDES_Popup.getExtensions((ext: Extension) => setExtensions([ext, ...extensions]))
    }, [])

    return <div>
        <div className="flex flex-col gap-2">
            {
                extensions.map((ext) => {
                    return <ExtensionCard key={ext.name} name={ext.name} icon={ext.icon} showcase={ext.showcase} github={ext.github} install={ext.install}/>
                })
            }
        </div>
    </div>
}