import { Branch } from '@/components/branch'
import { Tree } from '@/components/tree'
import { getServicesResponseMock } from './mock'

export interface Service {
  id: number
  head?: number
  name: string
  node: number
  price: number
  sorthead: number
}

interface BranchWithSortHead extends Branch {
  sorthead: number
  sub: BranchWithSortHead[]
}

export interface GetAllResponse {
  services: Service[]
}

export const getAll = async () => {
  return await new Promise<GetAllResponse>((resolve) => {
    setTimeout(
      () => {
        resolve(getServicesResponseMock)
      },
      500 * Math.random() + 500,
    )
  })
}

export const selectServicesTree = (data: GetAllResponse): Tree => {
  const paths: Map<number, number[]> = new Map()
  const servicesWithoutParent: Map<number, Service[]> = new Map()
  const branches: BranchWithSortHead[] = []

  for (const service of data.services) {
    if (service.head) {
      const path = paths.get(service.head)

      if (path) {
        let parent = branches

        for (let p of path) {
          parent = parent[p].sub
        }

        const indexes = []

        servicesWithoutParent.get(service.head)?.map((service) => ({
          id: service.id,
          index: parent.push(serviceToBranchWithSortHead(service)) - 1,
        }))

        servicesWithoutParent.delete(service.head)

        indexes.push({
          id: service.id,
          index: parent.push(serviceToBranchWithSortHead(service)) - 1,
        })

        if (service.node) {
          for (const index of indexes)
            paths.set(index.id, [...path, index.index])
        }
      } else {
        const temporaryParent = servicesWithoutParent.get(service.head)

        if (temporaryParent) {
          temporaryParent.push(service)
        } else {
          servicesWithoutParent.set(service.head, [service])
        }
      }
    } else {
      const index = branches.push(serviceToBranchWithSortHead(service)) - 1

      if (service.node) {
        paths.set(service.id, [index])
      }
    }
  }

  const { sub } = deepSort({ sub: branches })

  return {
    branches: sub,
  }
}

const serviceToBranchWithSortHead = ({
  name,
  price,
  sorthead,
}: Service): BranchWithSortHead => ({
  name: `${name} (${price})`,
  sorthead: sorthead,
  sub: [],
})

const deepSort = <T extends { sub: T[] }>(data: T): T => {
  for (const it of data.sub.sort()) {
    deepSort(it)
  }

  return data
}
