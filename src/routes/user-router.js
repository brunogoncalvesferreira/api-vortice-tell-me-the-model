import { hash } from 'bcrypt'
import { prisma } from '../lib/prisma.js'
import { ensureAuthenticate } from '../middlewares/ensure-authenticate.js'

export async function userRouter(app) {
  app.post('/', async (request, reply) => {
    try {

      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        return reply.status(409).send('Usuário já existe!')
      }

      const hashedPassword = await hash(password, 6)

      await prisma.user.create({
        data: { name, email, password: hashedPassword },
      })

      return reply.status(201).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send(error.issues)
      }
    }
  })

  app.get('/', async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc',
      },
    })

    return users
  })

  app.get(
    '/valideted',
    { onRequest: [ensureAuthenticate] },
    async (request, reply) => {
      try {
        const { user } = request

        const checkExistsUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        })

        if (!checkExistsUser) {
          return reply.status(401).send('Não autorizado.')
        }

        return reply.status(200).send()
      } catch (error) {
        if (error) {
          return reply.status(400).send(error.issues)
        }
      }
    },
  )
}
