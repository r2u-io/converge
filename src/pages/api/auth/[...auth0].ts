// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin, handleLogout, HandlerError } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: 'https://converge.land/poap',
          scope: 'openid email'
        },
        returnTo: '/poap'
      })
    } catch (err) {
      const error = err as HandlerError
      res.status(error.status || 400).end(error.message)
    }
  },
  async logout(req, res) {
    try {
      await handleLogout(req, res, {
        returnTo: '/poap'
      })
    } catch (err) {
      const error = err as HandlerError
      res.status(error.status || 400).end(error.message)
    }
  }
})
