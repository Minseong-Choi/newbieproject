import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  name: string;
  tier?: string;
  score?: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '아이디는 필수입니다.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
  },
  name: {
    type: String,
    required: [true, '이름은 필수입니다.'],
  },
  tier: {
    type: String,
    default: 'Bronze',
  },
  score: {
    type: Number,
    default: 1000,
  }
}, {
  timestamps: true  
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);