import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard/Dashboard'
import { HomePage, LoginPage, SignupPage } from '../pages'
import { SingleVehiclePage } from '../pages/SingleVehiclePage'
// import { RequireAuth } from '../utils/RequireAuth'

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicle/:id" element={<SingleVehiclePage />} />
        </Routes>
    </>
)

export default App;