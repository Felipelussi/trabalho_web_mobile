import { useCallback, useEffect, useState } from 'react'
import {
  createSale,
  type CreateSaleDTO,
  deleteSale,
  getSale,
  listSales,
  updateSale,
} from '@/api/sales'
import type { Sale, UpdateSaleDTO } from '@/features/sales/types/sale'

export function useListSales() {
  const [data, setData] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const sales = await listSales()
      setData(sales)
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar vendas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refetch: load }
}

export function useGetSale(id: number) {
  const [data, setData] = useState<Sale | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      const sale = await getSale(id)
      setData(sale)
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar venda')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refetch: load }
}

export function useCreateSale() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(
    async (payload: CreateSaleDTO): Promise<Sale | null> => {
      try {
        setLoading(true)
        setError(null)

        return await createSale(payload)
      } catch (e: any) {
        setError(e?.message ?? 'Falha ao criar venda')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { create, loading, error }
}

export function useUpdateSale() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback(
    async (id: number, payload: UpdateSaleDTO): Promise<Sale | null> => {
      try {
        setLoading(true)
        setError(null)
        return await updateSale(id, payload)
      } catch (e: any) {
        setError(e?.message ?? 'Falha ao atualizar venda')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { update, loading, error }
}

export function useDeleteSale() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await deleteSale(id)
      return true
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao deletar venda')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return { remove, loading, error }
}
