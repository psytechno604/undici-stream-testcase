
const { Client } = require('undici')
const { Writable } = require('stream')

const client = new Client(`http://ad.service.serverside.ai`)
const bufs = [];

 (async () => {
    try {
      await client.stream({
        path: '/api/ad-server-static_2.xml',
        method: 'GET',
        opaque: { bufs }
      }, ({ statusCode, headers, opaque: { bufs } }) => {
        console.log(`response received ${statusCode}`)
        console.log('headers', headers)
        return new Writable({
          write (chunk, encoding, callback) {
            bufs.push(chunk)
            callback()
          }
        })
      })

      console.log(Buffer.concat(bufs).toString('utf-8'))

      client.close()
    } catch (error) {
      console.error(error)
    }
})()