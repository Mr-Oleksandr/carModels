import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RobotPreloader from '@avtopro/preloader/dist/index'
import PrivateRoute from './PrivateRoutes/PrivateRoutes'
import EditCard from '../Components/EditCard/EditCard'
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))

const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<RobotPreloader fixed />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/edit/:id" element={<EditCard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MainRoutes
