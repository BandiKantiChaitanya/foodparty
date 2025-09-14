import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Ingredients from './components/Ingredients'
import { DishContextProvider } from './context/dishContext'

function App() {
  return (
    <div>
      <DishContextProvider>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path="/ingredients/:id" element={<Ingredients />} />
      </Routes>
      </DishContextProvider>
    </div>
  )
}

export default App