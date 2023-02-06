### IPFS Recon

## TLDR

> IPFS Recon offers OSINT reconnaissance on any file on IPFS for malware.

## Description

Ever wondered if the file you are about to download is safe? 
IPFS Recon let's you inspect any file on IPFS for viruses and malware.

Web3 is a young and fast moving space and suffers from hacks and exploits.
While IPFS is a genius innovation, attackers are already using it to distribute malware.
This pilot project demonstrates how files shared on IPFS can be inspected before downloading them.

Future work could include doing this on-chain by integrating security scans in the FileCoin Virtual Machine.

## Reconnaissance

It hashes the file and checks it against a list of OSINT (Open Source Intelligence) sources.
A report is generated with the results and warn the user if the file is malicious.

If the hash has not been sighted yet, the user can upload the file to [VirusTotal](https://www.virustotal.com/gui/) to scan it for viruses and get a report in return.

All this from the browser without downloading the file to your computer.

Main Features:

- Inspect CID content if available ✅
- fetch the data into memory from IPFS through it's CID ✅
- Scan the file for viruses ✅
- Generate a report based on gethered OSINT ✅

[Live Demo](https://ipfs-recon.vercel.app/)

## Get Started 🚀

Spin up an IPFS deamon:

```bash
ipfs daemon
```

> Add your VirusTotal API key to the `.env` file:

Build and launch the app:

```bash
yarn 
yarn build
yarn start
```

Enter any CID and select the nested files you wish to inspect.


## Resources


### Color palette

Used the [IPFS color pallette](https://github.com/ipfs-shipyard/ipfs-css/blob/main/theme.json#L2).

[Tailwind animations](https://www.devwares.com/blog/create-animation-with-tailwind-css/)

## IPFS

Two options available to fetch files over IPFS.

### Browser

Starts an IPFS node inside the browser. This takes considerably longer than the second option. Further, the node is node not closed properly when closing the tap and might not clean up configuration files. File size might be limited by browser configurations.

### HTTP client

Connects to a running local IPFS node on port 5001. This option is faster, more stable and doens't limit file size. User must run a local instance of IPFS.

To spin up an IPFS node on the browser, use the `create()` from ipfs-core.
To connect to a running node on localhost, use the ipfs-http-client library like [here](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client)

The browser extension can not be connected to as it runs in Braves native IPFS mode, which refuses API connections.
Switching this to `local` will make it connectable.

[IPFS hooks](https://github.com/ipfs-examples/js-ipfs-examples/blob/master/examples/browser-create-react-app/src/App.js)

