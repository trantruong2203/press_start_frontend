
import { useContext } from 'react'
import './App.css'
import { ContextAuth } from './contexts/AuthContext'
import HomeAdmin from './page/admin/HomeAdmin'
import Home from './page/client/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  const { accountLogin } = useContext(ContextAuth)
  const accountRole = accountLogin?.role

  return (
    <div>
      {accountRole === 'admin' ? <HomeAdmin/> : <Home />}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
