import Tree from '@/components/tree'
import { getAll, selectServicesTree } from '@/features/service/api/get-all'

export default async function Home() {
  const tree = selectServicesTree(await getAll())

  return (
    <main className="">
      <Tree tree={tree} />
    </main>
  )
}
