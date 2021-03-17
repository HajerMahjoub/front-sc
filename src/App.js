import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios';
import qs from 'qs';

const queryClient = new QueryClient()

function Products() {
  const { isLoading, error, data } = useQuery('getProducts', () =>
    axios.post('http://localhost:3000/products/related', {
      url: qs.parse(document.location.search, { ignoreQueryPrefix: true }).url
    })
  )
  console.log({error, data})
  if (isLoading) return 'Loading';
  if (error) return null;
  return (
    <div className="App">
      {
        data.data.map(e => {
          return <div>
            <h1>
              <a href={e.url}>{e.title}</a>
            </h1>
            <b>
              {
                e.prices.join(' - ')
              }
            </b>
            <p>
              {e.description}
            </p>
            <div>
              {
                e.images.map(im => {
                  return <img src={im} />
                })
              }
            </div>
          </div>
        })
      }
    </div>
  );
}

function App() {
  return <QueryClientProvider client={queryClient}>
    <Products />
  </QueryClientProvider>
}

export default App;
