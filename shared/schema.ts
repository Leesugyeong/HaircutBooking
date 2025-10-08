import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  time: text("time").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  school: text("school").notNull(),
  studentId: text("student_id").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  priceRange: text("price_range").notNull(),
  stylistGender: text("stylist_gender").notNull(),
  stylistAge: text("stylist_age").notNull(),
  desiredStyle: text("desired_style"),
  additionalNotes: text("additional_notes"),
  status: text("status").notNull().default("대기중"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
