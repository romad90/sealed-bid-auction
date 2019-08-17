'use strict'

module.exports = () => {
  const pino = require('pino')
  const log = pino({
    prettyPrint: {
      levelFirst: true
    },
    prettifier: require('pino-pretty')
  })
  const fastify = require('fastify')({
    logger: log
  })
  fastify.register(require('./endpoints/routes.js'))
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
