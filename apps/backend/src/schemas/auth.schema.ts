import { registry } from '../swagger/registry';
import { z } from 'zod';

const AddressInputSchema = z
  .object({
    street: z
      .string()
      .max(180)
      .optional()
      .openapi({ example: '221B Baker Street' }),
    city: z
      .string()
      .max(120)
      .optional()
      .openapi({ example: 'London' }),
    state: z
      .string()
      .max(120)
      .optional()
      .openapi({ example: 'Greater London' }),
    pincode: z
      .string()
      .max(12)
      .regex(/^[A-Za-z0-9\s-]*$/)
      .optional()
      .openapi({ example: 'NW1 6XE' })
  })
  .strict()
  .openapi({ description: 'Optional primary address information' });

export const RegisterInputSchema = registry.register(
  'RegisterInput',
  z
    .object({
      name: z
        .string()
        .min(2, 'Name must contain at least 2 characters.')
        .max(120, 'Name must be 120 characters or fewer.')
        .openapi({ example: 'Priya Sharma' }),
      email: z
        .string()
        .email('A valid email is required.')
        .max(160, 'Email must be 160 characters or fewer.')
        .transform((value) => value.toLowerCase())
        .openapi({ example: 'priya@example.com' }),
      password: z
        .string()
        .min(12, 'Password must be at least 12 characters long.')
        .max(128, 'Password must be 128 characters or fewer.')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/, 'Password must include upper, lower, number, and symbol.')
        .openapi({ example: 'Str0ngP@ssword!' }),
      mobile: z
        .string()
        .regex(/^\+?[0-9]{8,15}$/, 'Mobile number must contain 8-15 digits and may include a leading +.')
        .optional()
        .openapi({ example: '+919871234567' }),
      avatar: z
        .string()
        .url('Avatar must be a valid URL.')
        .optional()
        .openapi({
          example: 'https://cdn.example.com/profiles/priya.png'
        }),
      address: AddressInputSchema.optional(),
      platform: z
        .enum(['android', 'ios', 'web'])
        .transform((value) => value.toLowerCase() as 'android' | 'ios' | 'web')
        .default('web')
        .openapi({ example: 'android' })
    })
    .strict()
);

export const RegisterResponseSchema = registry.register(
  'RegisterResponse',
  z
    .object({
      id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Identifier must be a 24-character hex string.')
        .openapi({ example: '65f0d0f1208b5f23d0a5b123' }),
      name: z.string().openapi({ example: 'Priya Sharma' }),
      email: z.string().email().openapi({ example: 'priya@example.com' }),
      mobile: z.string().nullable().openapi({ example: '+919871234567' }),
      avatar: z.string().url().nullable().openapi({ example: 'https://cdn.example.com/profiles/priya.png' }),
      address: AddressInputSchema.nullable(),
      role: z.enum(['user', 'admin']).openapi({ example: 'user' }),
      isEmailVerified: z.boolean().openapi({ example: false }),
      isMobileVerified: z.boolean().openapi({ example: false }),
      isProfileComplete: z.boolean().openapi({ example: false }),
      isBlocked: z.boolean().openapi({ example: false }),
      orders: z
        .array(
          z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Order ids are 24-character hex strings.')
        )
        .openapi({ example: [] }),
      cart: z
        .array(
          z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Cart item ids are 24-character hex strings.')
        )
        .openapi({ example: [] }),
      wishlist: z
        .array(
          z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Wishlist item ids are 24-character hex strings.')
        )
        .openapi({ example: [] }),
      totalPurchase: z.number().openapi({ example: 0 }),
      platform: z.enum(['android', 'ios', 'web']).openapi({ example: 'android' }),
      createdAt: z.string().datetime().openapi({ example: '2025-11-11T09:30:00.000Z' }),
      verificationUrl: z.string().url().openapi({
        example: 'http://localhost:4000/api/auth/verify-email/09f13b63d7b24660a3f8fd9328e84fa8'
      }),
      message: z.string().openapi({ example: 'Verification email sent successfully.' })
    })
    .strict()
);

export const VerifyEmailResponseSchema = registry.register(
  'VerifyEmailResponse',
  z
    .object({
      email: z.string().email().openapi({ example: 'priya@example.com' }),
      verified: z.literal(true).openapi({ example: true }),
      message: z.string().openapi({ example: 'Email verified successfully.' }),
      verifiedAt: z.string().datetime().openapi({ example: '2025-11-12T09:30:00.000Z' })
    })
    .strict()
);

const VerificationTokenSchema = z
  .string()
  .regex(/^[a-f0-9]{64}$/i, 'Verification token must be a 64 character hex string.');

const VerificationOtpSchema = z
  .string()
  .regex(/^\d{6}$/, 'Verification OTP must be a 6 digit code.');

export const VerifyEmailBodySchema = z.object({
  token: VerificationTokenSchema,
  otp: VerificationOtpSchema
});

export const VerifyEmailRequestSchema = z.object({
  body: VerifyEmailBodySchema
});

export const RegisterRequestSchema = z.object({
  body: RegisterInputSchema
});

