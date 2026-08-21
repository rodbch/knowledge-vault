import { useEffect, useState } from 'react'
import * as auth from './services/auth'
import './App.css'
import Login from './components/Login'

function App({ appName }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

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
    <>
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
    </>
  )
}

export default App
