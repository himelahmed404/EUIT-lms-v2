import { BatchEditor } from '@/components/catalog/batch-editor';
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <BatchEditor id={typeof params.id === 'string' ? params.id : ''} />;
}
