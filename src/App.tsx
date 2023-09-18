import './App.css'
import {useParams, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {FC} from "react";

export type Result = {
  name: string
  url: string
}

export type Page = {
  count: number,
  next: string
  previous: string
  results: Result[]
}

const App: FC<Partial<Page>> = () => {
  const { resource } = useParams()
  const [params, setParams] = useSearchParams()
  const { page } = Object.fromEntries(params.entries());

  const { isLoading, data } = useQuery({
    queryKey: ['poke', resource, page],
    queryFn: () => fetch(`https://pokeapi.co/api/v2/${resource}?limit=5&offset=${Number(page) * 5}`).then<Page>(res => res.json())
  })

  if (isLoading) {
      return <>로딩중</>
  }

  return (
    <>
      <ul>
        {
          data?.results.map(item => {
            return <li key={item.url}>{item.name}</li>
          })
        }
      </ul>
      <button onClick={() => setParams({ page: `${Number(page) -1}` })}>이전</button>
      <button onClick={() => setParams({ page: `${Number(page) +1}` })}>다음</button>
    </>
  )
}

export default App
