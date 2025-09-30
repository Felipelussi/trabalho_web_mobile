import { useState, useEffect, useCallback } from 'react';
import { 
  listProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
} from '@/api/products';
import type { Product, CreateProductDTO, UpdateProductDTO } from '@/features/products/types/product';

export function useListProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await listProducts();
      setData(products);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

export function useGetProduct(id: number) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const product = await getProduct(id);
      setData(product);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar produto');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: CreateProductDTO): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const product = await createProduct(payload);
      return product;
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao criar produto');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: number, payload: UpdateProductDTO): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const product = await updateProduct(id, payload);
      return product;
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao atualizar produto');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await deleteProduct(id);
      return true;
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao deletar produto');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}
