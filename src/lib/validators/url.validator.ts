import { z } from "zod";

export const linkedInUrlSchema = z.object({
    profileUrl: z.string().url("Please enter valid URL").regex(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/, "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)"),
})

export type LinkedInUrlInput = z.infer<typeof linkedInUrlSchema>;