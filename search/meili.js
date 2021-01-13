const MeiliSearch = require('meilisearch')
const fs = require('fs');
const yaml = require('js-yaml');
const crypto = require('crypto')


;(async () => {
  const client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'masterKey',
  })

  let fileContents = fs.readFileSync('../awesome.yaml', 'utf8');
  let data = yaml.load(fileContents);

  var documents = [];
  for (const item of data.list) {
    if (!item.name) {
        continue
    }
    console.log("Inserting: "+item.name)
    let id = crypto.createHash('md5').update(item.url).digest("hex")
    item.id = id
    documents.push(item)
    
  }
  console.log(documents)

  //process.exit()

  const index = client.index('awesome')
  let response = await index.addDocuments(documents)
  console.log(response)
})()