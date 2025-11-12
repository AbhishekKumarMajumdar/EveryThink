import { Router } from 'express';
import crypto from 'node:crypto';
import { validateRequest } from '../middleware/validate-request';
import { AppError } from '../errors/app-error';
import {
  RegisterInputSchema,
  RegisterRequestSchema,
  RegisterResponseSchema,
  VerifyEmailBodySchema,
  VerifyEmailRequestSchema,
  VerifyEmailResponseSchema
} from '../schemas/auth.schema';
import { registry } from '../swagger/registry';
import type { z } from 'zod';
import { UserModel } from '../models/user.model';
import { sendVerificationEmail } from '../lib/mailer';

const router = Router();

type RegisterInput = z.infer<typeof RegisterInputSchema>;
type VerifyEmailBody = z.infer<typeof VerifyEmailBodySchema>;

registry.registerPath({
  method: 'post',
  path: '/api/auth/register',
  tags: ['Auth'],
  summary: 'Register a new customer account',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: RegisterInputSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Account successfully created',
      content: {
        'application/json': {
          schema: RegisterResponseSchema
        }
      }
    },
    400: {
      description: 'Validation failed'
    },
    409: {
      description: 'Email already registered'
    }
  }
});

registry.registerPath({
  method: 'post',
  path: '/api/auth/verify-email',
  tags: ['Auth'],
  summary: 'Verify email address using token & OTP',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: VerifyEmailBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Email verified successfully',
      content: {
        'application/json': {
          schema: VerifyEmailResponseSchema
        }
      }
    },
    400: {
      description: 'Invalid or expired verification token/OTP'
    },
    404: {
      description: 'Token not found or already used'
    }
  }
});

router.post(
  '/register',
  validateRequest(RegisterRequestSchema),
  async (req, res, next) => {
    try {
      const payload = req.body as RegisterInput;

      const existingUser = await UserModel.findOne({ email: payload.email }).lean().exec();
      if (existingUser) {
        throw new AppError('Email is already registered.', 409, true);
      }

      const { password, platform, ...rest } = payload;

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpTtlMinutes = Number(process.env.EMAIL_VERIFICATION_OTP_TTL_MINUTES ?? 10);
      const otpExpiresAt = new Date(Date.now() + otpTtlMinutes * 60 * 1000);

      const user = await UserModel.create({
        ...rest,
        password,
        platform: platform ?? 'web',
        emailVerificationToken: verificationToken,
        emailVerificationOtp: verificationOtp,
        emailVerificationOtpExpiresAt: otpExpiresAt
      });

      const savedUser = user.toObject();

      const createdAtIso =
        savedUser.createdAt instanceof Date ? savedUser.createdAt.toISOString() : new Date().toISOString();

      const appUrl = process.env.APP_URL ?? `http://localhost:${process.env.PORT ?? 4000}`;
      const verificationUrl = `${appUrl.replace(/\/$/, '')}/api/auth/verify-email?token=${verificationToken}`;

      const normalizeObjectIdArray = (value: unknown): string[] => {
        if (!Array.isArray(value)) {
          return [];
        }

        return value
          .map((entry) => {
            if (typeof entry === 'string') {
              return entry;
            }

            if (entry && typeof entry === 'object' && 'toString' in entry) {
              return (entry as { toString: () => string }).toString();
            }

            return null;
          })
          .filter((entry): entry is string => Boolean(entry));
      };

      try {
        await sendVerificationEmail({
          to: savedUser.email,
          name: savedUser.name,
          otp: verificationOtp,
          verificationUrl,
          expiresAt: otpExpiresAt
        });
      } catch (error) {
        throw new AppError('Failed to send verification email.', 500, false);
      }

      res.status(201).json({
        id: user.id,
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile ?? null,
        avatar: savedUser.avatar ?? null,
        address: savedUser.address ?? null,
        role: savedUser.role,
        isEmailVerified: savedUser.isEmailVerified,
        isMobileVerified: savedUser.isMobileVerified,
        isProfileComplete: savedUser.isProfileComplete,
        isBlocked: savedUser.isBlocked,
        orders: normalizeObjectIdArray(savedUser.orders),
        cart: normalizeObjectIdArray(savedUser.cart),
        wishlist: normalizeObjectIdArray(savedUser.wishlist),
        totalPurchase: Number(savedUser.totalPurchase ?? 0),
        platform: savedUser.platform ?? 'web',
        createdAt: createdAtIso,
        verificationUrl,
        message: 'Verification email sent successfully.'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/verify-email',
  validateRequest(VerifyEmailRequestSchema),
  async (req, res, next) => {
    try {
      const { token, otp } = req.body as VerifyEmailBody;

      const user = await UserModel.findOne({ emailVerificationToken: token })
        .select('+emailVerificationToken +emailVerificationOtp +emailVerificationOtpExpiresAt')
        .exec();

      if (!user) {
        throw new AppError('Invalid or expired verification token.', 404, true);
      }

      if (user.isEmailVerified) {
        res.status(200).json({
          email: user.email,
          verified: true as const,
          message: 'Email is already verified.',
          verifiedAt: new Date().toISOString()
        });
        return;
      }

      if (!user.emailVerificationOtp || user.emailVerificationOtp !== otp) {
        throw new AppError('Invalid verification OTP.', 400, true);
      }

      if (user.emailVerificationOtpExpiresAt && user.emailVerificationOtpExpiresAt.getTime() < Date.now()) {
        throw new AppError('Verification OTP has expired.', 400, true);
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationOtp = undefined;
      user.emailVerificationOtpExpiresAt = undefined;
      await user.save();

      res.status(200).json({
        email: user.email,
        verified: true as const,
        message: 'Email verified successfully.',
        verifiedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
);

export const authRouter = router;

