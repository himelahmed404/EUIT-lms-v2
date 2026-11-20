import { BatchDetail } from '@/components/catalog/batch-detail';
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <BatchDetail id={typeof params.id === 'string' ? params.id : ''} />;
}
