import { app } from './app.js'

app
  .listen({
    port: 5173,
    host: '0.0.0.0'
  })
  .then(() => console.log(`🚀 Server is running on http://localhost:5173`))
