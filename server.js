const express = require('express')
const controller=require('./controller.js')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('get-all-book',controller.getBook)

app.post('add-book',controller.addBook)

app.put('update-book',controller.updateBook)

app.delete('delete-book',controller.deleteBook)

app.get('get-book',controller.getBookById)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
