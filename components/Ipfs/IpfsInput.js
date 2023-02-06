import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Text,
  Image,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import useMyToast from '../../hooks/useMyToast'
import { reset, setCid } from '../../reduxApp/ipfsReduxSlice'
import isIpfs from 'is-ipfs'
import { DopeAlter } from '../Alert/dopeAlert'
import { motion, AnimatePresence } from 'framer-motion'



export default function IpfsInput() {
  const store = useSelector((state) => state.ipfsRedux)
  const toast = useMyToast()
  const dispatch = useDispatch()

  function handleInput(event) {
    event.preventDefault()
    const currentCid = event.target.value
    if (true) {
      // if (isIpfs.cid(currentCid)) {
      // const currentCid = 'QmcSn5SSDLNZZQGggKtnTquw2j7Smn971t5e2dyERAtuLX'
      dispatch(setCid({ cid: currentCid }))
    } else {
      dispatch(reset())
    }
  }

  return (
    <>
      <Box className="mx-3 -mt-3 absolute top-28 z-40 w-full max-w-[30rem]">
        <DopeAlter headText={'Paste your IPFS CID:'} color={'aqua'} show={!store.cid} />
        <div>
          <InputGroup
            h="7"
          >
            <InputLeftElement
              h="7"
            >
              <Image alt="ipfsSmallBox" src="/ipfs-logo.svg" h={41} />
            </InputLeftElement>
            <Input
              h="7"
              rounded="xl"
              // fontWeight="black"
              onChange={(e) => handleInput(e)}
              placeholder={store.cid || '<myCID>'}
              size="xs"
              variant="outline"
              value={store.cid}
            // value='QmcSn5SSDLNZZQGggKtnTquw2j7Smn971t5e2dyERAtuLX'
            ></Input>
          </InputGroup>
        </div>
      </Box>
    </>
  )
}
