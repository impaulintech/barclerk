import React, { useState } from 'react'

const SeeMore = ({text, maxLength}: {text: string, maxLength: number}) => {
  const [seeMore, setSeeMore] = useState<boolean>(false)

  return (
    <>
      {text.length > maxLength ? (
        <>
          {!seeMore ? <>{text?.slice(0, 200)}...</> : <>{text}</>}

          {!seeMore ? (
            <>
              <button className="ml-1 font-normal" onClick={() => setSeeMore(!seeMore)}>
                &#91;see more&#93;
              </button>
            </>
          ) : (
            <button className="ml-1 font-normal" onClick={() => setSeeMore(!seeMore)}>
              &#91;see less&#93;
            </button>
          )}
        </>
      ) : (
        <>{text}</>
      )}
    </>
  )
}

export default SeeMore
