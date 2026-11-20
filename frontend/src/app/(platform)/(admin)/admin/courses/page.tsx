import { AdminCatalog } from '@/components/catalog/admin-catalog';
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <AdminCatalog courseId={typeof params.courseId === 'string' ? params.courseId : ''} />;
}
