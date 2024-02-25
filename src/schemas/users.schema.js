export const updateSchema = z.object({
  name: z.string({
    required_error: "User name is required",
  }).optional(),
  email: z.string({}).email({ message: "Invalid email" }).optional(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .optional(),

  phone: z.string().optional(),
  role: z.enum(["ADMIN", "EMPLOYEE", "CLIENT"]),
});
