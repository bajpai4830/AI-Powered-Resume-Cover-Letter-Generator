import { z } from "zod";

// Personal Information Schema
export const PersonalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  address: z.string().max(200, "Address is too long").optional(),
});

// Links Schema
export const LinksSchema = z.object({
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid portfolio URL").optional().or(z.literal("")),
  other: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
}).refine(
  (data) => {
    // At least one link should be provided for professional profiles
    return data.linkedin || data.github || data.portfolio || data.other;
  },
  {
    message: "Please provide at least one professional link",
    path: ["linkedin"], // This will show the error on the linkedin field
  }
);

// Skills Schema
export const SkillsSchema = z.object({
  technical: z.array(z.string()).min(1, "Please add at least one technical skill"),
  soft: z.array(z.string()).min(1, "Please add at least one soft skill"),
});

// Education Item Schema
export const EducationItemSchema = z.object({
  school: z.string().min(2, "School name is required"),
  degree: z.string().min(2, "Degree is required"),
  field: z.string().min(2, "Field of study is required"),
  startYear: z.string().min(4, "Start year is required").max(4, "Invalid year"),
  endYear: z.string().min(4, "End year is required").max(4, "Invalid year"),
  gpa: z.string().optional(),
}).refine(
  (data) => {
    const start = parseInt(data.startYear);
    const end = parseInt(data.endYear);
    return start <= end;
  },
  {
    message: "End year must be after start year",
    path: ["endYear"],
  }
);

// Experience Item Schema
export const ExperienceItemSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  responsibilities: z.array(z.string()).min(1, "Please add at least one responsibility"),
}).refine(
  (data) => {
    if (!data.current && !data.endDate) {
      return false;
    }
    if (data.current && data.endDate) {
      return false;
    }
    return true;
  },
  {
    message: "Either mark as current position or provide end date",
    path: ["endDate"],
  }
);

// Project Item Schema
export const ProjectItemSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  description: z.string().min(10, "Please provide a more detailed description"),
  technologies: z.array(z.string()).min(1, "Please add at least one technology"),
  link: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Certification Item Schema
export const CertificationItemSchema = z.object({
  name: z.string().min(2, "Certification name is required"),
  issuer: z.string().min(2, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  expiryDate: z.string().optional(),
});

// Achievement Item Schema
export const AchievementItemSchema = z.object({
  title: z.string().min(2, "Achievement title is required"),
  description: z.string().min(10, "Please provide a more detailed description"),
  date: z.string().min(1, "Date is required"),
});

// Job Role Schema
export const JobRoleSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  company: z.string().optional(),
  description: z.string().min(50, "Please provide a more detailed job description (at least 50 characters)"),
});

// Complete Form Schema
export const CompleteFormSchema = z.object({
  personal: PersonalInfoSchema,
  links: LinksSchema,
  education: z.array(EducationItemSchema).min(1, "Please add at least one education entry"),
  skills: SkillsSchema,
  experience: z.array(ExperienceItemSchema).min(1, "Please add at least one work experience"),
  projects: z.array(ProjectItemSchema).optional(),
  certifications: z.array(CertificationItemSchema).optional(),
  achievements: z.array(AchievementItemSchema).optional(),
  jobRole: JobRoleSchema,
});

// Type definitions
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type Links = z.infer<typeof LinksSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type AchievementItem = z.infer<typeof AchievementItemSchema>;
export type JobRole = z.infer<typeof JobRoleSchema>;
export type CompleteForm = z.infer<typeof CompleteFormSchema>;

// Validation helper functions
export const validateSection = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; errors?: string[]; data?: T } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { success: false, errors: ['Unknown validation error'] };
  }
};

// Check if a section is complete
export const isSectionComplete = (section: keyof CompleteForm, data: any): boolean => {
  switch (section) {
    case 'personal':
      return validateSection(PersonalInfoSchema, data).success;
    case 'links':
      // Links are considered complete if at least one valid link is provided
      return data && (data.linkedin || data.github || data.portfolio || data.other);
    case 'skills':
      return validateSection(SkillsSchema, data).success;
    case 'education':
      return data && data.length > 0 && data.every((item: any) => validateSection(EducationItemSchema, item).success);
    case 'experience':
      return data && data.length > 0 && data.every((item: any) => validateSection(ExperienceItemSchema, item).success);
    case 'projects':
      // Projects show as incomplete until user adds at least one valid project
      return data && data.length > 0 && data.every((item: any) =>
        item.title && item.description && item.technologies && item.technologies.length > 0
      );
    case 'certifications':
      // Certifications show as incomplete until user adds at least one valid certification
      return data && data.length > 0 && data.every((item: any) =>
        item.name && item.issuer && item.date
      );
    case 'achievements':
      // Achievements show as incomplete until user adds at least one valid achievement
      return data && data.length > 0 && data.every((item: any) =>
        item.title && item.description && item.date
      );
    case 'jobRole':
      return validateSection(JobRoleSchema, data).success;
    default:
      return false;
  }
};
