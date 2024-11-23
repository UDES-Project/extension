import { useEffect, useState } from "react"
import { defaults } from "../../defaults"

// function Checkbox({ name, checked, onChange }: { name: string, checked: boolean, onChange: (checked: boolean) => void }) {
//     return <div className="flex gap-4 items-center justify-between p-2 px-4 border-b">
//         <label>{name}</label>
//         <input
//             type="checkbox"
//             name={name}
//             checked={checked}
//             onChange={() => onChange(!checked)}
//         />
//     </div>
// }

function Input({ name, value, onChange }: { name: string, value: string, onChange: (value: string) => void }) {
    return <div className="flex gap-4 items-center justify-between p-2 px-8 border-b">
        <label>{name}</label>
        <input
            className="border p-1 px-2 rounded"
            type="text"
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

// function Select({ name, options, value, onChange }: { name: string, options: string[], value: string, onChange: (value: string) => void }) {
//     return <div className="flex gap-4 items-center justify-between p-2 px-4 border-b">
//         <label>{name}</label>
//         <select className="border p-1 px-2 rounded bg-white" onChange={(e) => onChange(e.target.value)}>
//             {options.map((option) => <option key={option} selected={option === value}>{option}</option>)}
//         </select>
//     </div>
// }

function Button({ name, onClick }: { name: string, onClick: () => void }) {
    return <button className="p-2 px-4 border m-4" onClick={onClick}>{name}</button>
}

function setting(name: string, defaultValue: any) {
    name = "UDES_" + name
    const [value, setValue] = useState("" as any)
    const setValueWrapper = (v: any) => {
        setValue(v)
        // @ts-ignore
        browser.storage.local.set({
            [name]: v
        })
    }
    
    return [
        value,
        setValueWrapper,
        {
            name,
            defaultValue,
            setValueWrapper
        }
    ]
}

export default function Settings() {

    const [serverUrl, setServerUrl, serverUrlSetting] = setting("serverUrl", defaults.UDES_serverUrl)

    const settings = [serverUrlSetting]

    useEffect(() => {
        settings.forEach((s) => {
            // @ts-ignore
            browser.storage.local.get(s.name).then((res) => {
                s.setValueWrapper(res[s.name] || s.defaultValue)
            })
        })
    }, [])

    const [testConnectionResult, setTestConnectionResult] = useState("")
    const testConnection = () => {
        fetch(serverUrl + "/info").then((res) => res.json()).then((data) => {
            if (data.server_name) {
                setTestConnectionResult("Connected to " + data.server_name)
            } else {
                setTestConnectionResult(`Bad response from ${serverUrl}`)
            }
        }).catch(() => {
            setTestConnectionResult(`Failed to connect to ${serverUrl}`)
        })
    }
    
    return <div className="flex flex-col">
        <Input name="Server URL" value={serverUrl} onChange={setServerUrl}/>
        <Button name="Test Connection" onClick={testConnection}/>
        <span className="px-4">{testConnectionResult}</span>
        {/* <Checkbox name="Setting 1" checked={true} onChange={() => {}}/>
        <Input name="Setting 2" value="Value" onChange={() => {}}/>
        <Select name="Setting 3" options={["Option 1", "Option 2", "Option 3"]} value="Option 1" onChange={() => {}}/> */}
    </div>
}