import { z } from "zod";

export const leadCaptureSchema = z.object({
  email: z.email(
    "Please enter a valid email"
  ),
  companyName: z.string().optional(),
  role: z.string().optional(),
    // Honeypot field
    companyFax:
      z.string().optional(),
 
});

export type LeadCaptureFormData = z.infer<
  typeof leadCaptureSchema
>;