import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import * as auth from './services/auth'
import './App.css'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'

function App({ appName }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    let mounted = true

    async function loadSession() {
      const { data, error } = await auth.getSession()

      if (mounted) {
        if (!error) setSession(data.session)
        setLoading(false)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    await auth.signOut()
  }

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword session={session} />} />
      <Route
        path="/"
        element={
          <section id="center">
            <div className="hero"/>
            <h1>{appName}</h1>
            {session ? (
              <div>
                <h1>Logged In as: {session.user.email}</h1>
                <button onClick={handleLogout}>Log out</button>
              </div>
            ) : (
              <Login appName={appName}/>
            )}
          </section>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
