import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import '@avtopro/button/dist/style.css'
import '@avtopro/number-input/dist/style.css'
import '@avtopro/select/dist/style.css'
import '@avtopro/modal/dist/style.css'
import '@avtopro/slider/dist/style.css'
import '@avtopro/item-card/dist/style.css'
import { RootStoreContext } from './context/modelContext'
import Model from './model/index'
import { Auth } from './context/contextAuth'

const root = ReactDOM.createRoot(document.getElementById('root'))
const model = new Model()
root.render(
  <BrowserRouter>
    <Auth>
      <RootStoreContext.Provider value={{ model }}>
        <App />
      </RootStoreContext.Provider>
    </Auth>
  </BrowserRouter>
)
