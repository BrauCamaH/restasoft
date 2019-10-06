import proxy from 'http-proxy-middleware'
export default function expressMiddleware (router) {
router.use('/api', proxy({
target: 'http://localhost:8080',
changeOrigin: true
}))
}