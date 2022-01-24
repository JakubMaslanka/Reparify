import { Route, Routes } from 'react-router-dom';
import { 
    HomePage, 
    LoginPage, 
    SignupPage,
    DashboardPage,
    SingleVehiclePage, 
    NewVehiclePage,
    EditVehiclePage,
    SingleWorkshopPage,
    NotFoundPage
} from '../pages';

const App = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vehicle/:id" element={<SingleVehiclePage />} />
        <Route path="/vehicle/add" element={<NewVehiclePage  />} />
        <Route path="/vehicle/:id/edit" element={<EditVehiclePage  />} />
        <Route path="/workshop/:id" element={<SingleWorkshopPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default App;