import { prisma } from '../lib/prisma.js'

export async function compatibleFilmsRouter(app) {
  app.post('/', async (request, reply) => {
    try {
      const { model, mark, filmsId } = request.body

      await prisma.compatibleFilms.create({
        data: {
          model,
          mark,
          filmsId,
        },
      })

      return reply.status(201).send()
    } catch (error) {
      if (error) {
        return reply.status(400).send(error.issues)
      }
    }
  })

  app.get('/', async () => {
    const compatibleFilms = await prisma.compatibleFilms.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })

    return compatibleFilms
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const { id } = request.params

      await prisma.compatibleFilms.delete({
        where: { id },
      })

      return reply.status(204).send('Deletado com sucesso!')
    } catch (error) {
      
    }
  })
}
