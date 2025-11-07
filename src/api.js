// import axios from 'axios'
// export const API_ROOT = import.meta.env.VITE_API_URL

// export const api = axios.create({ baseURL: API_ROOT })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('admintoken')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// export const fetchJSON = async (path) => {
//   const { data } = await api.get(path)
//   return data
// }

// // media resolvers
// export function resolveImg(p = '') {
//   if (!p) return ''
//   if (p.startsWith('http')) return p
//   if (p.startsWith('/uploads')) return `${API_ROOT}${p}`
//   return p // e.g. /thumbs/*
// }

// export function resolveVideo(p = '') {
//   if (!p) return ''
//   if (p.startsWith('http')) return p
//   if (p.startsWith('/uploads')) return `${API_ROOT}${p}`
//   return p
// }


import axios from 'axios'

// trim trailing slash so we don't get https://api//uploads
export const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export const api = axios.create({ baseURL: API_ROOT })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admintoken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const fetchJSON = async (path) => (await api.get(path)).data

const toAbs = (p = '') => {
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p          // already absolute
  if (p.startsWith('/'))        return `${API_ROOT}${p}`   // "/uploads/.."
  return `${API_ROOT}/${p}`                                // "uploads/.."
}

export const resolveImg   = toAbs
export const resolveVideo = toAbs
