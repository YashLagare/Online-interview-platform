import { useUser } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/home/HomePage';
import ProblemsPage from './pages/problems/ProblemsPage';

const App = () => {

  const { isSignedIn } = useUser();

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to='/' />} />

      </Routes>

      <Toaster toastOptions={{duration: 3000}} />
    </>
  )
}

export default App