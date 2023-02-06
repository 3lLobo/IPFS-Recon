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


export default async function handler(req, res) {
  const { hash } = req.query
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
    // console.log({ result });
    res.status(200).json(result.data)
  } catch (axiosError) {
    let err = axiosError
    console.error({ err });
    res.status(500).json({ error: err })
  }
}