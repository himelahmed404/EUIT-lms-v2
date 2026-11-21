export interface EnrolledCourseSummary {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  track: string;
  batchId: string;
  batchName: string;
  format: string;
  status: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  enrolledAt: Date;
  resumeLessonId: string | null;
  nextClass: {
    sequence: number;
    startsAt: Date;
    endsAt: Date;
  } | null;
}

export interface LessonOutlineItem {
  id: string;
  title: string;
  type: string;
  durationSeconds: number;
  orderIndex: number;
  completed: boolean;
  watchedSeconds: number;
  isLocked: boolean;
}

export interface ModuleOutlineItem {
  id: string;
  title: string;
  orderIndex: number;
  lessons: LessonOutlineItem[];
}

export interface CourseOutlineResponse {
  enrollmentId: string;
  status: string;
  progress: number;
  course: {
    id: string;
    title: string;
    summary: string;
    track: string;
  };
  batch: {
    id: string;
    name: string;
    format: string;
    leadMentor: {
      fullName: string;
      jobTitle: string | null;
    } | null;
  };
  modules: ModuleOutlineItem[];
  resumeLessonId: string | null;
}

export interface LessonDetailResponse {
  id: string;
  title: string;
  type: string;
  videoProvider: string;
  videoUrl: string;
  durationSeconds: number;
  content: string | null;
  orderIndex: number;
  watchedSeconds: number;
  completed: boolean;
  completedAt: Date | null;
  module: {
    id: string;
    title: string;
    orderIndex: number;
  };
  previousLessonId: string | null;
  nextLessonId: string | null;
}

export interface UpdateProgressInput {
  watchedSeconds?: number;
  completed?: boolean;
}

export interface RoutineItemResponse {
  id: string;
  sequence: number;
  courseTitle: string;
  batchName: string;
  format: string;
  startsAt: Date;
  endsAt: Date;
  location: string | null;
  mentorName: string | null;
}
