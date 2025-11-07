import axios from 'axios'
export const API_ROOT = import.meta.env.VITE_API_URL

export const api = axios.create({ baseURL: API_ROOT })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admintoken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const fetchJSON = async (path) => {
  const { data } = await api.get(path)
  return data
}

// media resolvers
export function resolveImg(p = '') {
  if (!p) return ''
  if (p.startsWith('http')) return p
  if (p.startsWith('/uploads')) return `${API_ROOT}${p}`
  return p // e.g. /thumbs/*
}

export function resolveVideo(p = '') {
  if (!p) return ''
  if (p.startsWith('http')) return p
  if (p.startsWith('/uploads')) return `${API_ROOT}${p}`
  return p
}
