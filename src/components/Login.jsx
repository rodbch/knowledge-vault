import './Login.css'
import * as auth from '../services/auth'
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const handleSignUp = async () => {
    setLoading(true)
    setError(null)
    try{
      const res = await auth.signUp(email, password)
      if (res.error) setError(res.error.message ?? res.error)
      else setUser(res.user ?? res.data?.user ?? null)
    } catch (e) {
      setError(e.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await auth.signIn(email, password)
      if (res.error) setError(res.error.message ?? res.error)
      else setUser(res.user ?? res.data?.user ?? null)
    } catch (e) {
      setError(e.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await auth.resetPassword(email)
      if (res.error) setError(res.error.message ?? res.error)
      else setError('Password reset email sent.')
    } catch (e) {
      setError(e.message ?? String(e))
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
      <div id="center">
        <input 
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input 
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button onClick={handleLogin} disabled={loading}>Login</button>
        <button onClick={handleSignUp} disabled={loading}>Create Account</button>
        <button onClick={handleReset} disabled={loading}>Forgot Password</button>

        {loading && <p>Loading...</p>}
        {error && <p>{String(error)}</p>}
        {user && <p>Signed in as: {user.email ?? user.id}</p>}
      </div>
    </>
  )
}

export default Login