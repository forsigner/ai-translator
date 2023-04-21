import { config, applyMiddleware } from 'stook-graphql'
import { baseURL, subscriptionsEndpoint } from './constants'

export function initStookGraphql() {
  applyMiddleware(async (ctx, next) => {
    await next()

    if (typeof ctx.body !== 'object') return

    if (ctx.body?.errors) {
      const error = ctx.body.errors[0]

      ctx.body = error
      return
    }

    if (Object.keys(ctx.body || {}).length === 1) {
      ctx.body = ctx.body[Object.keys(ctx.body)[0]]
    }
  })

  config({
    endpoint: baseURL + '/graphql',
    subscriptionsEndpoint,
  })
}
