import { index, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  index('./app.tsx'),
  route('login', './routes/login.tsx'),
  route('profile', './routes/profile.tsx'),
  route('colaboradores', './routes/colaboradores.tsx'),
  route('cozinhas', './routes/kitchens.tsx'),
  route('labels', './routes/labels.tsx'),
  route('unidades', './routes/units.tsx'),
  route('tipos-produto', './routes/product-types.tsx')
] satisfies RouteConfig
