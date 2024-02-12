'use client'

import { FC, useState } from 'react'
import Tree from './tree'

export interface Branch {
  name: string
  sub: Branch[]
}

interface Properties {
  branch: Branch
}

const Branch: FC<Properties> = ({ branch: { name, sub } }) => {
  const [open, setFolded] = useState(false)
  const haveSub = sub.length > 0

  return (
    <li className={`pl-11 ${open && 'h-[43px] overflow-hidden'}`}>
      <p className="relative flex items-center py-2 [&>*]:flex-shrink-0">
        {haveSub && (
          <button
            className={`absolute right-full aspect-square h-full fill-none stroke-current stroke-2 p-2 duration-300 ${
              open && '-rotate-90'
            }`}
            onClick={() => setFolded(!open)}
          >
            <span className="sr-only">{open ? 'закрыть' : 'открыть'}</span>

            <svg viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19 9-5 5a3 3 0 0 1-4 0L5 9"
              />
            </svg>
          </button>
        )}

        {name}
      </p>

      {haveSub && <Tree tree={{ branches: sub }} />}
    </li>
  )
}

export default Branch
