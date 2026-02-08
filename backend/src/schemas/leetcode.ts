import z from 'zod';

export const matchedUserSchema = z.object({
  username: z.string(),
  githubUrl: z.string().url().nullable(),
  profile: z.object({
    realName: z.string().nullable(),
    aboutMe: z.string().nullable(),
    solutionCount: z.number(),
  }),
});

export const lastAcceptedSubmissionSchema = z.object({
  id: z.string(),
  title: z.string(),
  titleSlug: z.string(),
  timestamp: z.string(),
});
