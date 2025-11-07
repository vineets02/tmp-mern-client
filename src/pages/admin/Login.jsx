import { useState } from 'react'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [username, setUsername] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const { data } = await api.post('/api/auth/login', { username, password })
      localStorage.setItem('admintoken', data.token)
      nav('/admin')
    } catch (e) {
      setErr('Invalid credentials')
    }
  }

  return (
    <section className="container-max py-20">
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {err && <div className="mb-3 text-red-400">{err}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
          <button className="w-full bg-brand-yellow text-black font-semibold rounded-lg py-2">Login</button>
        </form>
      </div>
    </section>
  )
}
