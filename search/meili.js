const MeiliSearch = require('meilisearch')
// Or if you are on a front-end environment:
//import MeiliSearch from 'meilisearch'

;(async () => {
  const client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'masterKey',
  })

  // An index is where the documents are stored.
  const index = client.index('books') // If your index exists

  const documents = [
    { book_id: 123, title: 'Pride and Prejudice' },
    { book_id: 456, title: 'Le Petit Prince' },
    { book_id: 1, title: 'Alice In Wonderland' },
    { book_id: 1344, title: 'The Hobbit' },
    { book_id: 4, title: 'Harry Potter and the Half-Blood Prince', genre: 'fantasy' },
    { book_id: 42, title: "The Hitchhiker's Guide to the Galaxy", genre: 'fantasy' }
  ]

  // If the index 'movies' does not exist, MeiliSearch creates it when you first add the documents.
  let response = await index.addDocuments(documents)

  console.log(response) // => { "updateId": 0 }
})()