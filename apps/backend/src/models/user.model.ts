import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model, models } = mongoose;

const AddressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true }
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
    password: { type: String, select: false },
    googleId: { type: String, default: null },
    avatar: { type: String },
    mobile: { type: String },
    address: AddressSchema,
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    totalPurchase: { type: Number, default: 0 },
    platform: {
      type: String,
      enum: ['android', 'ios', 'web'],
      default: 'web',
      set: (value: string) => value?.toLowerCase()
    },
    emailVerificationToken: { type: String, select: false },
    emailVerificationOtp: { type: String, select: false },
    emailVerificationOtpExpiresAt: { type: Date, select: false }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationOtp;
        delete ret.emailVerificationOtpExpiresAt;
        return ret;
      }
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationOtp;
        delete ret.emailVerificationOtpExpiresAt;
        return ret;
      }
    }
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 12);
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

export const UserModel = models.User ?? model('User', UserSchema);

