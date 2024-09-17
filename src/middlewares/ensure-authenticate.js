
export async function ensureAuthenticate(
  request,
  reply
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send('Token inválido.')
  }
}
