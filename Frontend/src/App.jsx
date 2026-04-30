import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import './App.css'
import AppRoutes from './Routes/AppRoutes'

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-container-lowest text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-primary font-medium tracking-wide">Loading Blockstay...</p>
        </div>
      </div>
    );
  }

  return (
    <>
     <AppRoutes/>
    </>
  )
}

export default App
