import { create } from 'ipfs-core'


const node = await create()

export default function handler(req, res) {

  const nodeId = await node.id()
  const nodeVersion = await node.version()
  const nodeIsOnline = await node.isOnline()

  res.status(200).json({
    id: nodeId.id.string,
    version: nodeVersion.version,
    isOnline: nodeIsOnline
  })
}
