import { prisma } from '../lib/prisma.js'

export async function filmsRouter(app) {
  app.post('/', async (request, reply) => {
    try {
    
      const { model, mark } = request.body

      await prisma.films.create({
        data: {
          model,
          mark,
        },
      })

      return reply.status(201).send()
    } catch (error) {
      if (error) {
        return reply.status(400).send(error.issues)
      }
    }
  })

  app.get('/:id', async (request) => {
    try {
      const filmsBodySchema = z.object({
        id: z.string(),
      })

      const { id } = filmsBodySchema.parse(request.params)

      const result = await prisma.films.findUnique({
        where: {
          id,
        },
        include: {
          compatibleFilms: true,
        },
      })

      return result
    } catch (error) {}
  })

  app.get('/search', async (request, reply) => {
    try {
      const { query, pageIndex } = request.query

      const result = await prisma.films.findMany({
        where: {
          model: {
            contains: query,
          },
        },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          compatibleFilms: true,
        },
      })

      const total = await prisma.films.count({
        where: {
          model: {
            contains: query,
          },
        },
      })

      const totalPages = Math.ceil(total / 10)

      return { result, totalPages }
    } catch (error) {
      if (error) {
        return reply.status(400).send(error.issues)
      }
    }
  })
}
