export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-blue-500 p-5 text-white text-center">
        <h1>Eksamens øvelse</h1>
      </header>
      <main className="p-5">
        <img src="/eksamensoevelse.PNG" alt="Eksamens øvelse" className="w-full" />
      </main>
      <footer className="bg-gray-800 p-5 text-white text-center">
        <p>© Eksamens øvelse</p>
      </footer>
    </div>
  );
}