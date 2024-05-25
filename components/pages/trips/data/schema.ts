import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  driverId: z.number(),
  status: z.number(),
  price: z.number(),
  distance: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  source: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  destination: z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  travelers: z.array(z.number()),
});

export type Task = z.infer<typeof taskSchema>;
