import { useEffect, useState } from "react";

function App() {

  const [planets, setPlanets] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [end, setEnd] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (data.next === null) {
          setEnd(true)
        }
        console.log(data)
        setPlanets(p => [...p, ...data.results])
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  return (
    <section className="container py-5">
      <h1 className="mb-5">Planètes dans l'univer Star Wars</h1>
      <div className="row">
        {loading && <p>Loading....</p>}
        {error && <p>{error}</p>}
        {planets.map((planet) => {
          return (
            <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={planet.name}>
              <article className="bg-warning p-3">
                <h2 className="h5">{planet.name}</h2>
                <p className="mb-0"><b>population</b><br />{planet.population}</p>
                <p className="mb-0"><b>climat</b><br />{planet.climate}</p>
              </article>
            </div>
          )
        })}
      </div>
      {end ? <p className="bg-dark text-white p-3">Nous avons listé toutes les planètes recensées.</p> : <button type="button" className="btn btn-dark" onClick={() => setPage(p => p + 1)} >Suivantes</button>}
    </section>
  );
}

export default App;
