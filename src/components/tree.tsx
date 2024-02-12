import { FC } from 'react'
import Branch, { Branch as BranchType } from './branch'

export interface Tree {
  branches: BranchType[]
}

interface Properties {
  tree: Tree
}

const Tree: FC<Properties> = ({ tree: { branches } }) => {
  return (
    <ul className="grid pr-5">
      {branches.map((branch, index) => {
        return <Branch branch={branch} key={index} />
      })}
    </ul>
  )
}

export default Tree
