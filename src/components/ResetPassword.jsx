import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../services/auth'
import './ResetPassword.css'

function ResetPassword({ session }) {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setMessage(null)

    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    if (!session) {
      setError('Your password reset link is invalid or expired. Request a new one and open the link from your email.')
      return
    }

    setLoading(true)
    try {
      const res = await auth.updatePassword(password)
      if (res.error) setError(res.error.message ?? res.error)
      else setMessage('Password updated successfully.')
    } catch (caughtError) {
      setError(caughtError.message ?? String(caughtError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="center">
      <h1>Choose a new password</h1>
      {!session && <p role="alert">Open this page from the password reset link in your email.</p>}
      <form onSubmit={handleSubmit} class="form-centered">
        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          disabled={loading || Boolean(message)}
        />
        <label htmlFor="password-confirmation">Confirm new password</label>
        <input
          id="password-confirmation"
          type="password"
          value={confirmation}
          onChange={event => setConfirmation(event.target.value)}
          required
          disabled={loading || Boolean(message)}
        />
        <button type="submit" disabled={loading || Boolean(message)}>
          Update password
        </button>
      </form>
      {loading && <p>Updating password...</p>}
      {error && <p role="alert">{String(error)}</p>}
      {message && <p>{message}</p>}
      {message && <button onClick={() => navigate('/')}>Back to login</button>}
    </section>
  )
}

export default ResetPassword
