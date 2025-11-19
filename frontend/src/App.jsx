import { useUser } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import DashboardPage from "./pages/DashBoard/DashboardPage";
import HomePage from './pages/home/HomePage';
import ProblemPage from './pages/problem-section-pages/ProblemPage/ProblemPage.jsx';
import ProblemsPage from './pages/problem-section-pages/ProblemsPage';

const App = () => {

  const { isSignedIn, isLoaded } = useUser();

  //this remove the flikering effect during the page change
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={ !isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"}/>} />

        <Route path='/dashboard' element={ isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/>} />

        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to='/' />} />
        
        <Route path='/problems/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to='/' />} />
      </Routes>

      <Toaster toastOptions={{duration: 3000}} />
    </>
  )
}

export default App