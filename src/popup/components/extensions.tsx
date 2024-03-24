function ExtensionCard({ name, icon, showcase, github, install }: { name: string, icon: string, showcase?: string, github?: string, install: string }) {
    return <div className="flex border-b p-3 justify-between bg-gray-50">
        <div className="flex gap-2 items-center ml-4">
            <img src={icon} className="h-6" alt="" />
            <h1>{name}</h1>
        </div>
        <div className="flex gap-3 items-center">
            { showcase && <a href={showcase} className="text-sm">Showcase</a> }
            { github && <a href="#" className="text-sm">Github</a>}
            <div className="h-full w-[1px] bg-gray-300"></div>
            <a href={install} className="p-2 px-3 rounded bg-green-700 text-white">Install</a>
        </div>
    </div>
}

export default function Extensions() {
    return <div>
        <div className="flex flex-col gap-2">
            <ExtensionCard name="Discord" icon="http://localhost:3000/assets/discord.svg" install="#" github="#" showcase="#"/>
            <ExtensionCard name="WhatsApp Web" icon="http://localhost:3000/assets/whatsapp.svg" install="#" github="#"/>
        </div>
    </div>
}