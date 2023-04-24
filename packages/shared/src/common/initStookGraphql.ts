import { config, applyMiddleware } from 'stook-graphql'
import { API_BASE_URL, subscriptionsEndpoint } from './constants'

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
    endpoint: API_BASE_URL + '/graphql',
    subscriptionsEndpoint,
  })
}
