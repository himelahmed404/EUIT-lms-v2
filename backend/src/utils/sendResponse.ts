import type { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  code?: string;
  data?: T;
  meta?: { page: number; limit: number; total: number };
}

export function sendResponse<T>(res: Response, body: ApiResponse<T>): void {
  res.status(body.statusCode).json(body);
}
