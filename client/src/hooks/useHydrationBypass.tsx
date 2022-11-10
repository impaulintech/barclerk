/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const useHydrationBypass = (): any => {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    console.log(showChild)
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  }
}

export default useHydrationBypass
