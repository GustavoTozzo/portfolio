import { z } from "zod";

export const localeSchema = z.enum(["pt", "en"]);
export type Locale = z.infer<typeof localeSchema>;

export const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  positioning: z.string().min(1).max(240),
  cvHref: z.string().min(1).optional(),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url().optional(),
    email: z.string().email(),
  }),
  about: z.tuple([z.string().min(1), z.string().min(1)]),
  languages: z.array(z.string().min(1)).optional(),
});
export type Profile = z.infer<typeof profileSchema>;

export const skillGroupSchema = z.object({
  category: z.enum(["linguagens", "frontend", "backend", "dados", "ferramentas"]),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        usageContext: z.string().min(1).optional(),
      }),
    )
    .min(1),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  problem: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  metrics: z.array(z.string().min(1)).max(3),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  category: z.enum(["web", "mobile", "backend", "fullstack"]),
  featured: z.boolean().default(false),
  caseStudy: z
    .object({
      context: z.string().min(1),
      decisions: z.array(z.string().min(1)).min(1),
      challenges: z.array(z.string().min(1)).min(1),
      retrospective: z.string().min(1),
    })
    .optional(),
});
export type Project = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  period: z.object({ start: z.string(), end: z.string().nullable() }),
  bullets: z.array(z.string().min(1)).min(1).max(4),
});
export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: z.string().min(1),
  program: z.string().min(1),
  period: z.object({ start: z.string(), end: z.string().nullable() }),
  status: z.enum(["cursando", "concluido"]),
});
export type Education = z.infer<typeof educationSchema>;

export const contentSchema = z.object({
  profile: profileSchema,
  skills: z.array(skillGroupSchema).min(1),
  projects: z.array(projectSchema).min(1),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema).min(1),
});
export type SiteContent = z.infer<typeof contentSchema>;

export const courseworkCaseSchema = z.object({
  title: z.string().min(1),
  context: z.string().min(1),
  points: z.array(z.string().min(1)).min(1),
  demonstrates: z.string().min(1),
  sourceUrl: z.string().url().optional(),
});
export type CourseworkCase = z.infer<typeof courseworkCaseSchema>;

export const courseworkGroupSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  focus: z.string().min(1),
  cases: z.array(courseworkCaseSchema).min(1),
});
export type CourseworkGroup = z.infer<typeof courseworkGroupSchema>;

export const courseworkSchema = z.object({
  discipline: z.string().min(1),
  intro: z.string().min(1),
  repoUrl: z.string().url(),
  concepts: z.array(z.string().min(1)).min(1),
  groups: z.array(courseworkGroupSchema).min(1),
});
export type Coursework = z.infer<typeof courseworkSchema>;
