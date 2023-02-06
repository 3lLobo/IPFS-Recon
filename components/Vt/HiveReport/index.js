// import style from './hiveReport.module.scss';
import { List, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useEffect, useLayoutEffect } from 'react';
import ReactTimeago from 'react-timeago';


export const HiveReport = ({ content }) => {

  const [stats, setStats] = useState();
  const [total, setTotal] = useState();
  const [others, setOthers] = useState();
  // const [unsupported, setUnsupported] = useState(0);

  useLayoutEffect(() => {
    if (content.attributes.last_analysis_stats) {
      const stats = content.attributes.last_analysis_stats;
      setStats(stats);
      setTotal(stats.harmless + stats["type-unsupported"] + stats.suspicious + stats["confirmed-timeout"] + stats.timeout + stats.failure + stats.malicious + stats.undetected)
      setOthers(stats["type-unsupported"] + stats["confirmed-timeout"] + stats.timeout + stats.failure + stats.undetected)
    }
  }, [content.attributes.last_analysis_stats])

  if (content.errorMesage) {
    return (
      <div className="panel panel-danger" ng-if="!success">
        <div className="panel-heading">
          <span>VirusTotal GetReport</span>
        </div>
        <div className="panel-body">{content.errorMessage}</div>
      </div>
    );
  }
  //   return (
  //     <div>
  //       <div className="panel panel-info">
  //         <div className="panel-heading">
  //           <span>Summary</span>
  //         </div>
  //         <div className="panel-body">
  //           <div className="row">
  //             <div className="text-center col-md-6">
  //               {content.message &&
  //                 <dl className="dl-horizontal" >
  //                   <h2>Message</h2>
  //                   <p className="font-semibold">
  //                     {content?.message}
  //                   </p>
  //                 </dl>}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div
    // className='flex flex-col justify-center items-center overflow-x-scroll w-full '
    >
      <div className="panel panel-info">
        <div className="flex justify-center text-xl font-bold text-snow">
          <h2>VirusTotal Report</h2>
        </div>
        <div className="panel-body">
          <div className="grid grid-flow-row ">
            <div className="text-center col-md-6 divide-y-4">
              {content.message &&
                <dl className="flex divide-x-4">
                  <h2>Message</h2>
                  <span className="font-semibold">
                    {content?.message}
                  </span>
                </dl>}
              {content.attributes.last_analysis_stats &&
                <div className="grid grid-flow-col ">
                  <dl className="flex flex-col justify-center divide-y-4">

                    <h3>Malicious</h3>
                    <p className="font-semibold">
                      <span>{content.attributes.last_analysis_stats.malicious}</span>/{total}
                    </p>
                  </dl>
                  <dl className="flex flex-col justify-center  divide-y-4">
                    <h3>Suspicious</h3>
                    <p className="font-semibold">
                      <span >{content.attributes.last_analysis_stats.suspicious}</span>/{total}
                    </p>
                  </dl>
                  <dl className="flex flex-col justify-center  divide-y-4">
                    <h3>Undefined</h3>
                    <p className="font-semibold">
                      <span className="text-info">{others}</span>/{total}
                    </p>
                  </dl>
                  <dl className="flex flex-col justify-center  divide-y-4">
                    <h3>Last analysis date</h3>
                    <p className="font-semibold">
                      <ReactTimeago date={content.attributes.last_analysis_date} />
                    </p>
                  </dl>
                </div>
              }
            </div>
            {/* {content.attributes.size &&
              <div className="grid grid-cols-2 gap-4  divide-y-4">
                <dl className="flex flex-row justify-center gap-4">
                  <div>Size</div>
                  <p className="font-semibold">{content.attributes.size}B</p>
                </dl>
              </div>} */}
          </div>
          {content.attributes.names &&
            <div className="flex flex-col divide-y-4 gap-4">
              <dl className="flex flex-col justify-center align-middle gap-4 text-center">
                <h3>File-names with same hash</h3>
                <List
                  className='grid grid-flow-col gap-4 divide-x-4 overflow-x-scroll h-fit bg-charcoal/50 rounded-xl p-2'
                >

                  {content.attributes.names.map(name => (
                    <ListItem key={name + 'HiveReport'} className="col-span-1 truncate w-28 text-center " title={name}
                    >{name}</ListItem>
                  ))}
                </List>
              </dl>
              {content.attributes.url &&
                <dl className="flex flex-row justify-center gap-4" >
                  <div>Url</div>
                  <p className="font-semibold">{content.attributes.url}</p>
                </dl>}
              {(content.id && content.type != 'domain' && content.type != 'fqdn') &&
                <dl className="flex flex-row justify-center gap-4 divide-x-4">
                  <span>SHA-256</span>
                  <span className="pl-3 font-mono">{content.id}</span>
                </dl>}
              {(content.id && (content.type == 'domain' || content.type == 'fqdn')) &&
                <div className="col-md-6 text-center">
                  <dl className="flex flex-row justify-center gap-4">
                    <div>Resolution</div>
                    <span className="flex-wrap">{content.id}</span>
                  </dl>
                </div>
              }
            </div>}
          {/* {
            content.attributes.last_analysis_results &&
            <div className="gird grid-flow-row">
              <div>VirusTotal Report</div>
              {(content.type !== 'url') ?
                <Link href="{'https://www.virustotal.com/gui/search/'+content.id}"
                >
                  https://www.virustotal.com/gui/search/{content.id}
                </Link>
                :
                <Link href="{'https://www.virustotal.com/gui/url/'+content.id}"
                >
                  https://www.virustotal.com/gui/url/{content.id}
                </Link>
              }
            </div>
          } */}
        </div >
      </div >
    </div >
  )
}


