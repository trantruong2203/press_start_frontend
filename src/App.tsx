
import { useContext } from 'react'
import './App.css'
import { ContextAuth } from './contexts/AuthContext'
import HomeAdmin from './page/admin/HomeAdmin'
import Home from './page/client/Home'

function App() {
  const { accountLogin } = useContext(ContextAuth)
  const accountRole = accountLogin?.role

  return (
    <div>
      {accountRole === 'admin' ? <HomeAdmin/> : <Home />}
    </div>
  )
}

export default App
