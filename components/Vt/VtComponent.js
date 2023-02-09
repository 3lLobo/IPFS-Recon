import { useSelector, useDispatch } from "react-redux";
import { DopeAlter } from "../Alert/dopeAlert";
import { VtReport } from "./VtReport";
import demoReport from "../../reduxApp/demoResHash.json";


export default function VtComponent() {
  const store = useSelector((state) => state.ipfsRedux)
  const dispatch = useDispatch()

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <DopeAlter headText="Reports" bodyText="Your reports for the Scanned files." show={store.reports.length > 0} color="aqua" />
      <div
        className="grid grid-flow-col sm:grid-flow-row grid-cols-1 justify-center items-center gap-3 my-11 overflow-x-scroll scrollbar-hide p-20 pt-3"
      >{store.reports.length > 0 &&
        <>
          {store.reports.map((report) => {
            console.log(report)
            const { idx, fileName, data } = report
            return (
              <VtReport
                key={idx}
                name={fileName}
                idx={idx}
                // cid
                report={data}
              />
            )
          })}
        </>
        }
      </div>
    </div>
  )
}