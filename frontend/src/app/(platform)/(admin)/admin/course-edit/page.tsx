import { CourseEditor } from '@/components/catalog/course-editor';
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <CourseEditor id={typeof params.id === 'string' ? params.id : ''} />;
}
