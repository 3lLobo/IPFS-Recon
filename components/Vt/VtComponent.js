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
      className="flex flex-col w-full sm:max-w-[30vw] overflow-y-clip "
    >
      <div
        className="max-w-4xl w-full h-full flex flex-col justify-center items-center mb-3 "
      >

        <DopeAlter headText="Reports" bodyText="Your reports for the Scanned files." show={store.reports.length > 0} color="aqua" />
      </div>
      <div
      >
        <div
          className="absolute top-[55vh] sm:-top-9 flex flex-col w-full sm:max-w-[30vw] overflow-y-clip max-h-[104vh]"
        >

          <motion.div
            className="grid grid-flow-col sm:grid-flow-row sm:grid-cols-1 gap-3 mt-11 overflow-x-scroll sm:overflow-y-scroll scrollbar-hide px-3 pt-24 sm:py-60 max-h-[99vh] "
            // className="flex sm:flex-col overflow-y-scroll gap-y-3 scroll-smooth scrollbar-hide z-10  max-h-[97vh] pt-60 "
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