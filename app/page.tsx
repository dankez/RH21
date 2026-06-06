export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-[#003399]">XTB ETF Portfolio Copilot</h1>
      <p className="mt-4 text-xl">Vitajte vo vašom investičnom asistentovi.</p>
      <div className="mt-8 p-4 border rounded shadow bg-white max-w-md text-center">
        <p className="text-sm text-gray-500 italic">
          Poznámka: Tento projekt je v štádiu návrhu dizajnu. Pre zobrazenie vizuálov použite Stitch dashboard.
        </p>
      </div>
      <footer className="mt-20 text-xs text-gray-400 text-center">
        Nie je to licencované investičné poradenstvo.<br/>
        Vytvorené pre slovenských retailových investorov.
      </footer>
    </main>
  )
}
