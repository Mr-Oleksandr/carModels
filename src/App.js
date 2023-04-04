import MainRoutes from './routes/MainRoutes'
import { Auth } from './context/contextAuth'

function App() {
  return (
    <div className="App">
      <Auth>
        <MainRoutes />
      </Auth>
    </div>
  )
}

export default App
