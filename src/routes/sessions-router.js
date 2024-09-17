import { prisma } from '../lib/prisma.js'
import { compare } from 'bcrypt'
import { jwtConfig } from '../auth/auth.js'

export async function sessionsRoutes(app) {
  app.post('/', async (request, reply) => {
    try {

      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return reply.status(401).send({
          message: 'E-mail ou senha inválidos.',
        })
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        return reply.status(401).send({
          message: 'E-mail ou senha inválidos.',
        })
      }

      const { expiresIn } = jwtConfig

      const token = await reply.jwtSign(
        { role: user.role, id: user.id },
        {
          expiresIn,
        },
      )

      reply.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })

      return reply.status(200).send({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    } catch (error) {
      return reply.status(500).send(error)
    }
  })
}
