import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <div className="min-h-full">
          <Navigation/>
          <main className="-mt-32">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                <h1 className="text-3xl">AlgoExplorer</h1>
              </div>
            </div>
          </main>
      </div>
    </>
  )
}

export default App
