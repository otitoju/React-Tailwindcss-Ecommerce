import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const EcommerceShop = lazy(() => import('./Pages/Shop'))

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<EcommerceShop />}/>
    </Routes>
    // <Suspense fallback={null}>
    //   <Router />
    // </Suspense>
  )
}

export default App
