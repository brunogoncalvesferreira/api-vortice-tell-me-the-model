export function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send('Não autorizado.')
    }
  }
}
