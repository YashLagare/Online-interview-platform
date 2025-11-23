import { useUser } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import ScreenTooSmall from "./components/ScreenTooSmall/ScreenTooSmall.jsx";
import { useScreenSize } from "./hooks/useScreenSize.js";
import DashboardPage from "./pages/DashBoard/DashboardPage";
import HomePage from './pages/home/HomePage';
import ProblemPage from './pages/problem-section-pages/ProblemPage/ProblemPage.jsx';
import ProblemsPage from './pages/problem-section-pages/ProblemsPage';
import SessionPage from "./pages/SessionPage/SessionPage.jsx";

const App = () => {

  const { isSignedIn, isLoaded } = useUser();

  const isSmallScreen = useScreenSize();

  //this remove the flikering effect during the page change
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {isSmallScreen && <ScreenTooSmall />}
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />

        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to='/' />} />

        <Route path='/problems/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to='/' />} />

        <Route path='/session/:id' element={isSignedIn ? <SessionPage /> : <Navigate to='/' />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App