import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import http from 'http'
import log4js from 'log4js'
import routes from './routes'

const env = process.env.NODE_ENV
const isDev = env === 'dev' || env === 'test'

log4js.configure({
    appenders: {console: {type: 'console', layout: {type: isDev ? 'colored' : 'basic'}}},
    categories: {default: {appenders: ['console'], level: isDev ? 'DEBUG' : 'INFO'}}
})

const log = log4js.getLogger('server')
log.info('Environment was set to [' + env + ']')



const app = express()
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(cors())

routes.configure(app)

export default (() => {
    return http.createServer(app)
})()
