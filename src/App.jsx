import './App.css'
import Login from './components/Login'

function App({appName}) {

  return (
    <>
      <section id="center">
        <div className="hero">
        </div>
        <div>
          <h1>Knowledge Vault</h1>
          <Login appName/>
        </div>
      </section>
    </>
  )
}

export default App
