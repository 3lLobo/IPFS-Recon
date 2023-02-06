import { motion, AnimatePresence } from 'framer-motion'


export function DopeAlter({ color, headText, bodyText, show, axis, pref }) {

  const dirValue = pref ? pref : -500

  const directionVis = axis ? { opacity: 1, axis: 0 } : { opacity: 1, x: 0 }
  const directionHid = axis ? { opacity: 0, axis: dirValue } : { opacity: 0, x: dirValue }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className='w-full flex justify-center'
          initial={{ opacity: 1 }}
          animate={show ? 'visible' : 'hidden'}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: .5 }}
          variants={{
            visible: directionVis,
            hidden: directionHid,
          }}
        >
          <div
            className={`w-4/5 sm:w-full flex flex-col bg-gradient-to-b from-slate-900 border-t border-b border-${color || 'slate-900'
              } text-snow px-6 py-3 mb-4 shadow-md rounded-xs`}
            role="alert"
          >

            <p className="font-semibold px-2">{headText}</p>
            <p className="text-sm ">{bodyText}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
