export const enrolledCourses = [
  {
    href: "/student/course-player",
    title: "Graphic design",
    level: "Beginner",
    lessons: "7/40 lessons",
    progress: 18,
    mentor: "Nadia Rahman",
    mentorClassName: "mentor-face green",
  },
  {
    href: "/student/course-offline",
    title: "Web development",
    level: "Advanced",
    lessons: "23/54 lessons",
    progress: 43,
    mentor: "Kamrul Hasan",
    mentorClassName: "mentor-face violet",
  },
  {
    href: "/student/certificate",
    title: "Digital marketing",
    level: "Beginner",
    lessons: "24/24 lessons",
    progress: 100,
    mentor: "Imran Kabir",
    mentorClassName: "mentor-face neutral",
  },
];
export type EnrolledCourse = (typeof enrolledCourses)[number];
