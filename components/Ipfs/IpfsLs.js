import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useLsCidQuery } from '../../reduxApp/bridgeApi'
import useMyToast from '../../hooks/useMyToast'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { IoSettings } from 'react-icons/io5'
import { v4 as uuid } from 'uuid'
import { IpfsCard } from './IpfsCard'
import { BezierSpinner } from '../Spinner/BezierSpinner'
import { reset } from '../../reduxApp/ipfsReduxSlice'
import { DopeAlter } from '../Alert/dopeAlert'
import { motion, AnimatePresence } from 'framer-motion'
import { skipToken } from '@reduxjs/toolkit/dist/query'

export default function IpfsLs() {
  const store = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()
  const toast = useMyToast()
  const { currentData, data, error, isLoading, isError } = useLsCidQuery({ cid: store.cid ? store.cid : skipToken })

  useEffect(() => {
    if (store.cid && isError) {
      toast('error', 'No files found related to this CID 💔', 'ipfsCidError')
      console.log('🚀 ~ file: IpfsLs.js ~ line 11 ~ IpfsLs ~ error', error)
      dispatch(reset())
    }
    console.log(store.cid)
  }, [isError, dispatch, toast, error, store.cid])

  return (
    <Box className="absolute -top-9 flex flex-col w-full max-w-[45vw]">
      {isLoading ? (
        <BezierSpinner></BezierSpinner>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={(currentData && store.cid) ? 'visible' : 'hidden'}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: .5 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 100 },
            }}
          >
            <Box className="flex flex-col w-full ">
              <div className="sticky top-52 mt-0">
                <DopeAlter
                  headText="Scan Data"
                  bodyText="Select files to scan."
                  color="aqua"
                  show={store.selectedIdx.length === 0 && store.cid}
                />
              </div>
              <div
                className="flex  sm:flex-col overflow-y-scroll scroll-smooth scrollbar-hide z-30 max-w-[40vw]  max-h-[95vh]  pt-52"
              >
                {[...data, ...data, ...data].map((file, i) => {
                  return (
                    <IpfsCard ls={file} idx={i} key={uuid()} />
                  )
                })}
              </div>
            </Box>
          </motion.div>
        </AnimatePresence>
      )
      }
    </Box >
  )
}
