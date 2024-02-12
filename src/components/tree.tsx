import { FC } from 'react'

export interface Branch {
  name: string
  sub: Branch[]
}

export interface Tree {
  branches: Branch[]
}

interface Properties {
  tree: Tree
}

const Tree: FC<Properties> = ({ tree: { branches } }) => {
  return (
    <ul className="grid pr-5">
      {branches.map(({ name, sub }, index) => {
        const haveSub = sub.length > 0

        return (
          <li className="py-2 pl-7" key={index}>
            <p className="relative flex items-center [&>*]:flex-shrink-0">
              {haveSub && (
                <svg
                  className="absolute right-full w-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-5 5a3 3 0 0 1-4 0L5 9"
                  />
                </svg>
              )}

              <span className="pl-2">{name}</span>
            </p>

            {haveSub && <Tree tree={{ branches: sub }} />}
          </li>
        )
      })}
    </ul>
  )
}

export default Tree
