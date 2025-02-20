import fastify from 'fastify'
import { userRouter } from './routes/user-router.js'
import { filmsRouter } from './routes/films-router.js'
import { compatibleFilmsRouter } from './routes/compatible-films-router.js'
import { sessionsRoutes } from './routes/sessions-router.js'
import fastifyJwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { jwtConfig } from './auth/auth.js'
import { paymentRoutes } from './routes/payment.js'

export const app = fastify()

await app.register(fastifyCors, {
  origin: ['https://www.tm3d.com.br', 'https://tm3d.com.br', 'http://localhost:5173',],
  credentials: true,
})

app.register(cookie)

app.register(fastifyJwt, {
  secret: jwtConfig.secret,
})

app.register(userRouter, { prefix: 'user' })
app.register(filmsRouter, { prefix: 'films' })
app.register(compatibleFilmsRouter, { prefix: 'compatible-films' })
app.register(paymentRoutes, { prefix: 'payment' })
app.register(sessionsRoutes, { prefix: 'sessions' })
