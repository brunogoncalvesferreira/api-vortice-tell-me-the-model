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

      const { id } = request.params

      const result = await prisma.films.findUnique({
        where: {
          id,
        },
        include: {
          compatibleFilms: true,
        },
      })

      return result
    } catch (error) { }
  })

  app.get('/search', async (request, reply) => {
    try {
      const { query, pageIndex } = request.query

      /* if (itemIndex !== undefined && itemIndex >= 5) {
        return reply.status(402).send({
          message: "Compre para ter acesso"
        })
      } */

      const result = await prisma.films.findMany({
        where: {
          model: {
            contains: query,
          },

        },
        take: 5,
        skip: pageIndex * 5,
        orderBy: {
          model: 'asc',

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

  app.get('/sample', async (request, reply) => {
    try {
      const { query, pageIndex } = request.query

      const result = await prisma.films.findMany({
        where: {
          model: {
            contains: query,
          },
        },
        take: 10,
        skip: 10,
        //skip: pageIndex * 10,
        orderBy: {
          model: 'asc'
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

  app.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params

      await prisma.films.delete({
        where: {
          id,
        },
      })

      return reply.status(204).send()
    } catch (error) {
      if (error) {
        return reply.status(400).send(error.issues)
      }
    }
  })
}
