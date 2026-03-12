import { index, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  index('./app.tsx'),
  route('login', './routes/login.tsx'),
  route('profile', './routes/profile.tsx'),
  route('colaboradores', './routes/colaboradores.tsx')
] satisfies RouteConfig
