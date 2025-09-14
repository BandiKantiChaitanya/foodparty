import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Ingredients from './components/Ingredients'
import { DishContextProvider } from './context/dishContext'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <DishContextProvider>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path="/ingredients/:id" element={<Ingredients />} />
      </Routes>
      </DishContextProvider>
      <Footer/>
    </div>
  )
}

export default App