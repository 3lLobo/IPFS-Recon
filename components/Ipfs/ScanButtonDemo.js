import { Box, Text, Button } from '@chakra-ui/react'
import { motion } from "framer-motion"
import { useEffect } from 'react'
import { IoSettings } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import useMyToast from '../../hooks/useMyToast'
import { addReport } from '../../reduxApp/ipfsReduxSlice'
import { useCheckHashQuery, useLazyCheckHashQuery, useCheckFileMutation } from '../../reduxApp/vtApi'


export default function DemoScanButton({ md5Hash, showButton }) {
  // const { data, isLoading, isError, isSuccess, error } = useCheckHashQuery({ hash: store.selectedIdx[idx] })
  // const [checkFile, { isLoading: isMutating, isError: isMutationError, isSuccess: isMutationSuccess, error: mutationError }] = useCheckFileMutation()
  // Lazy Hash check query
  const [checkFile, { isLoading: isMutating, isError: isMutationError, isSuccess: isMutationSuccess, error: mutationError }] = useCheckFileMutation()
  const [hashCheckTrigger, hashCheckResult, lastPromiseInfo] = useLazyCheckHashQuery()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.ipfsRedux)
  const toast = useMyToast()

  useEffect(() => {
    if (hashCheckResult.isSuccess) {
      toast('success', 'File hash has records on VirusTotal! 👀', 'hashScanSuccess')
      console.log('🚀 hashCheckResult', hashCheckResult)
      dispatch(addReport({ idx: 111, data: hashCheckResult.data }))
    }
    if (hashCheckResult.isError) {
      toast('error', 'File hash has not yet been reconed. Upload it for a scan! 🔍', 'hashScanError')
      console.log('🚀 scanError', hashCheckResult)
    }
  }, [hashCheckResult, dispatch, toast])

  useEffect(() => {
    if (isMutationSuccess) {
      toast('success', 'File scanned successfully! 🎉', 'fileScanSuccess')
      // dispatch(reset())
    }
    if (isMutationError) {
      toast('error', 'Something went wrong. Please try again later. 💔', 'fileScanError')
      console.log('🚀mutationError', mutationError)
      // dispatch(reset())
    }
  }, [isMutationSuccess, isMutationError, mutationError, dispatch, toast])

  const handleClick = async () => {
    // console.log("Clicqq", idx)
    if (isMutating) return
    if (!showButton) return
    // const fileIdx = store.selectedIdx.indexOf(idx)
    // checkFile({ file: store.selectedFiles[fileIdx] })
    hashCheckTrigger({ hash: md5Hash })
    // const res = await fetch(`http://localhost:3000/api/vt/hashReport/${md5Hash}`)
    // const data = await res.json()

  }

  return (
    <motion.div
      initial={false}
      animate={showButton ? 'visible' : 'hidden'}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: .5 }}
      variants={{
        visible: { opacity: 1, },
        hidden: { opacity: 0, },
      }}
    >
      <Box className="absolute z-30 h-full w-full flex flex-col justify-center items-center -m-2">
        <Button
          className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 "
          onClick={handleClick}
          isLoading={isMutating}
          disabled={isMutating || !showButton}
          size="lg"
          colorScheme="aqua"
          variant="solid"
          leftIcon={<IoSettings fill='snow' />}
        >
          <Text className="text-snow">Scan</Text>
        </Button>
      </Box>
    </motion.div>
  )
}