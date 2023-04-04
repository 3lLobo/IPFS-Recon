import { useSelector, useDispatch } from "react-redux";
import { DopeAlter } from "../Alert/dopeAlert";
import { VtReport } from "./VtReport";
import demoReport from "../../reduxApp/demoResHash.json";
import { motion } from "framer-motion";


export default function VtComponent() {
  const store = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()

  return (
    <div
      className="flex flex-col w-full overflow-y-clip h-full justify-center "
    >
      <div
        className="w-full h-full flex flex-col justify-center items-center "
      >

        <DopeAlter headText="Reports" bodyText="Your reports for the Scanned files." show={store.reports.length > 0} color="aqua" />
      </div>
      <div
      >
        <div
          className='absolute  sm:-top-9 w-full sm:max-w-[35vw]  max-h-[60vw] sm:h-[102vh] sm:max-h-[122rem] justify-center items-center  max-w-[100vw] scrollbar-hide overflow-y-scroll -mx-8 sm:mx-3'
        >

          <motion.div
            className="grid grid-flow-col sm:grid-flow-row sm:grid-cols-1 gap-3 overflow-x-scroll  sm:overflow-y-scroll scrollbar-hide px-6 sm:px-0 xl:px-6 pb-6 sm:pt-[22rem] xl:py-[30vh] sm:mx-2 "
            initial={{ opacity: 0 }}
            animate={store.reports.length > 0 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >

            {store.reports.map((report, i) => {
              console.log(report)
              const { idx, fileName, data, cid } = report
              // console.log("CIDDD" + cid)
              return (
                <VtReport
                  key={idx + fileName + i}
                  name={fileName}
                  idx={idx}
                  fileCid={cid}
                  report={data}
                />
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}