// import style from './hiveReport.module.scss';
import { List, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useEffect, useLayoutEffect } from 'react';
import ReactTimeago from 'react-timeago';
import ProgressCircle from './ProgressCircle';


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
          <span>VirusTotal Summary</span>
        </div>
        <div className="panel-body">{content.errorMessage}</div>
      </div>
    );
  }

  return (
    <div
    >
      {stats &&
        <ProgressCircle stats={stats} total={total} others={others} />
      }
      <div className="panel panel-info">
        <div className="flex justify-center text-xl font-bold text-charcoal dark:text-snow">
          <h2>VirusTotal Summary</h2>
        </div>
        <div className="overflow-scroll scrollbar-hide">
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
                <div className="grid grid-flow-row sm:grid-flow-col ">
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
                    <h3>First sigthed</h3>
                    <p className="font-semibold">
                      <ReactTimeago date={content.attributes.first_submission_date * 1000} />
                    </p>
                  </dl>
                  <dl className="flex flex-col justify-center  divide-y-4">
                    <h3>Last analysis</h3>
                    <p className="font-semibold">
                      <ReactTimeago date={content.attributes.last_analysis_date * 1000} />
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
              <dl className="flex flex-col justify-center align-middle text-center">
                <h3>Filenames with same hash</h3>
                <List
                  className='grid grid-flow-col gap-2 divide-x-2 overflow-x-scroll scrollbar-hide h-fit bg-slate-600/50 rounded-full'
                >

                  {content.attributes.names.map(name => (
                    <li key={name + 'HiveReport'} className="col-span-1 truncate w-28 text-center text-snow text-sm" title={name}
                    >{name}</li>
                  ))}
                </List>
              </dl>
              {content.attributes.url &&
                <dl className="flex flex-row justify-center gap-4" >
                  <div>Url</div>
                  <p className="font-semibold">{content.attributes.url}</p>
                </dl>}
              {(content.id && content.type != 'domain' && content.type != 'fqdn') &&
                <div className="flex flex-col justify-center align-middle text-center">
                  <h3>SHA-256</h3>
                  <dl className="flex flex-row justify-center gap-4 divide-x-4 text-snow bg-slate-600/50 rounded-full py-1">
                    <span className="pl-3 font-mono">{content.id}</span>
                  </dl>
                </div>
              }
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


