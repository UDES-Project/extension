export default function Home() {
    return <div>
        <div className="mt-20 flex flex-col justify-center items-center">
            <h1 className="text-center text-4xl font-bold text-green-700 mb-5">UDES</h1>
            <div className="flex gap-2">
                <a href="https://udes.app" className="px-4 py-2 bg-green-700 text-white rounded">Website</a>
                <a href="https://github.com/UDES-Project" className="px-4 py-2 bg-green-700 text-white rounded">Github</a>
            </div>
        </div>
    </div>
}