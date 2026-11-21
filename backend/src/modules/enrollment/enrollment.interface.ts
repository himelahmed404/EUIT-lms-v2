export interface EnrollmentQuoteInput {
  courseId: string;
  batchId: string;
  format?: "ONLINE" | "OFFLINE";
}

export interface DemoCheckoutInput {
  courseId: string;
  batchId: string;
  format?: "ONLINE" | "OFFLINE";
}

export interface EnrollmentQuoteResponse {
  courseId: string;
  courseTitle: string;
  batchId: string;
  batchName: string;
  format: "ONLINE" | "OFFLINE";
  fee: number;
  seatsRemaining: number;
  schedule: {
    startDate: string;
    repeatDays: number[];
    startTime: string;
    endTime: string;
    timeZone: string;
    classCount: number;
  };
}

export interface DemoCheckoutResponse {
  enrollmentId: string;
  status: string;
  course: {
    id: string;
    title: string;
  };
  batch: {
    id: string;
    name: string;
    format: string;
    startDate: string;
    startTime: string;
    endTime: string;
  };
  enrolledAt: Date;
  message: string;
}
