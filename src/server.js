import { app } from './app.js'

app
  .listen({
    port: 3000,
    host: '0.0.0.0'
  })
  .then(() => console.log(`🚀 Server is running on http://localhost:3000`))
