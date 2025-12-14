import { z } from "zod";

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export const adminSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  imageUrl: z.string().url(),
  price: z.number().positive(),
});

export const updateCourseSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  imageUrl: z.string().url().optional(),
  price: z.number().positive().optional(),
});

export const deleteCourseSchema = z.object({
  courseId: z.string(),
});

export const purchaseCourseSchema = z.object({
  courseId: z.string(),
});
