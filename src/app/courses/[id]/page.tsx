import { notFound } from 'next/navigation';
import { getCourseById } from '@/data/courses';
import CourseDetail from '@/components/CourseDetail';

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const { courses } = await import('@/data/courses');
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { id } = await params;
  const course = getCourseById(id);
  
  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} - ${course.subtitle} | RajeshwariTech`,
    description: course.description,
    keywords: course.category.join(', '),
  };
}
