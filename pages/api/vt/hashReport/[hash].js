// const sdk = require('api')('@virustotal/v3.0#g2g127ldiz2kf6');


// export default function handler(req, res) {

//   const md5hash = req.query.hash
//   console.log({ md5hash });
//   console.log('sdk', sdk.fileInfo);

//   sdk.fileInfo({
//     id: md5hash,
//     'x-apikey': process.env.VT_APIKEY,
//   }).then(({ data }) => {
//     console.log({ data });
//     res.status(200).json(data)
//   }).catch((err) => {
//     console.error(err);
//     res.status(500).json({ error: err })
//   })
// }

import axios from 'axios'
import Cors from 'cors'


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(
//   req,
//   res,
//   fn
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result?.error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

export default async function handler(req, res) {

  // Run the middleware
  // await runMiddleware(req, res, cors)
  // console.log('req.headers', req.headers)
  // Block all ephemeral hosts
  if ((req.headers.host.startsWith('localhost') || req.headers.host.startsWith('ipfs-recon') || req.headers.host.startsWith('fvm')) && (req.headers['x-apikey'] === 'xxx')) {

    const { hash } = req.query
    // console.log('res', res);
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log({ hash });

    try {
      const result = await axios({
        url: `https://www.virustotal.com/api/v3/files/${hash}`,
        method: 'GET',
        headers: {
          'x-apikey': process.env.VT_APIKEY,
          'accept': 'application/json',
        },
      })
      res
        .status(200)
        // .headers({ 'Access-Control-Allow-Origin': '*' })
        .json(result.data)
      return
    } catch (axiosError) {
      let err = axiosError
      // console.error({ err });
      const errCode = err.response?.status || 500
      res.status(errCode).json({
        error: {
          status: err.response?.status,
          code: err.code,
          message: err.message,
        }
      })
      return
    }
  }
  res.status(403).json({ error: 'Forbidden' })
  return
}
