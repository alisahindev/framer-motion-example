import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import Filter from './components/icons/Filter';
import './index.css';

function App() {

  const ref = useRef<HTMLUListElement>(null)
  const { scrollXProgress, scrollX } = useScroll({
    container: ref,
  })

  const [width, setWidth] = useState('auto')

  const handleWidthChange = (latest: number) => {
    console.log(latest)
    setWidth(`calc(100% - ${latest}px)`)
  }

  console.log(width)

  useMotionValueEvent(scrollX, 'change', handleWidthChange)

  return <AnimatePresence
    onExitComplete={() => console.log('exit complete')}
  >
    <motion.ul ref={ref}>
      <div className='left-wrap'>
        {
          Array.from({ length: 2 }).map((_, i) => (
            <motion.li
              key={`aliman ${i + 3}`}
              style={{
                width: 'auto',
              }}
            >
              <Filter width={24} height={24} style={{
                minWidth: 24,
                minHeight: 24,
              }} />
              <motion.div
                style={{
                  width,
                  overflow: 'hidden',
                }}
              >
                Item {i + 1}
              </motion.div>
            </motion.li>
          ))
        }
      </div>
      {
        Array.from({ length: 20 }).map((_, i) => (
          <motion.li
            key={`alimans ${i + 3}`}
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
          >
            Item {i + 3}
          </motion.li>
        ))
      }
    </motion.ul>
  </AnimatePresence>

}

export default App
