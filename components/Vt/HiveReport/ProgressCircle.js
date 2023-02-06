
export const ProgressCircle = ({ stats, total, others }) => {

  // const malicious = 11;
  const malicious = stats.malicious;
  // const suspicious = 3
  const suspicious = stats.suspicious;

  const dangerColor = "#C10408E6";
  const warningColor = "#E7C013E6";

  const strokeColor = malicious > 0 ? dangerColor : warningColor
  const textColor = malicious > 0 ? `text-[#C10408E6]` : suspicious > 0 ? `text-[#E7C013E6]` : `text-lime-400`

  return (
    <div className={"flex flex-col justify-center items-center "}>
      <div
        className="flex flex-col justify-center items-center z-30"
      >
        <div className={"text-3xl font-bold  " + textColor}>
          {malicious + suspicious}
        </div>
        <div className="text-sm text-snow"> / {total} </div>
      </div>
      {/* <svg id="circularProgressbar" class="circle-progressbar" height="100" width="100"
        style="stroke-dashoffset: 0; stroke-dasharray: 282.743;">
        <circle cx="50" cy="50" r="45" stroke-width="10" fill="transparent" stroke="var(--bs-primary)"></circle>
      </svg> */}
      <svg id="circularProgressbar" height="100" width="100"

        className="rounded-full shadow-2xl absolute -rotate-90"

      >
        <circle cx="50" cy="50" r="45" stroke-width="10" stroke="url(#MyGradient)" fill="transparent"

        // stroke="black"
        ></circle>
        <circle cx="50" cy="50" r="40"
          fill="#1B1D512B"
        ></circle>
        <circle cx="50" cy="50" r="45" stroke-width="10" fill="transparent"
          strokeDasharray="360"
          strokeDashoffset={`${(1 - (malicious + suspicious) / total) * 360}`}
          strokeLinecap="round"
          stroke={strokeColor}

        ></circle>
        <defs>
          <radialGradient id="MyGradient">
            <stop offset="15%" stop-color="#1B1D512B" />
            <stop offset="95%" stop-color="#1B1D514F" />
          </radialGradient>
        </defs>
      </svg >
    </div >
  )
}

export default ProgressCircle

