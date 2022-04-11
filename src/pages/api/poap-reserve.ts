import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { NextApiRequest } from 'next'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://9mviupbeub.execute-api.us-east-1.amazonaws.com/production'
      : 'http://localhost:4000/dev',
  headers: {
    'Content-Type': 'application/json'
  }
})

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    code: string
  }
}

export default withApiAuthRequired(async (req: ExtendedNextApiRequest, res) => {
  const { accessToken } = await getAccessToken(req, res)

  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

  const { data, status } = await api.post('/reserve', req.body)

  res.status(status).json(data)
})
