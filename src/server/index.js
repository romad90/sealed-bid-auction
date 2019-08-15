'use strict'

module.exports = () => {
  const fastify = require('fastify')({
    logger: true
  })
  fastify.register(require('./src/routes'))
  fastify.listen(3000, err => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(
      `Fastify server listening on ${fastify.server.address().port}`
    )
  })
}
