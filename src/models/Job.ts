import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobDocument extends Document {
  code: string;
  title: string;
  slug: string;
  company: string;
  companyLogo?: string;
  category: string;
  city: string;
  district?: string;
  type: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  hideSalary: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
  whatsappContact: string;
  emailContact?: string;
  source: 'web' | 'whatsapp_bot';
  status: 'active' | 'closed' | 'pending';
  viewsCount: number;
  applicationsCount: number;
  featured: boolean;
  urgent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJobDocument> = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'المسمى الوظيفي مطلوب'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: [true, 'اسم الشركة أو جهة العمل مطلوب'],
      trim: true,
    },
    companyLogo: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'تصنيف الوظيفة مطلوب'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'المدينة مطلوبة'],
      trim: true,
    },
    district: {
      type: String,
      default: '',
      trim: true,
    },
    type: {
      type: String,
      required: true,
      default: 'دوام كامل',
    },
    experienceLevel: {
      type: String,
      default: 'متوسط',
    },
    salaryMin: {
      type: Number,
      default: 0,
    },
    salaryMax: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'ج.م',
    },
    hideSalary: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'تفاصيل الوظيفة مطلوبة'],
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    whatsappContact: {
      type: String,
      required: [true, 'رقم واتساب للتواصل مطلوب'],
      trim: true,
    },
    emailContact: {
      type: String,
      default: '',
      trim: true,
    },
    source: {
      type: String,
      enum: ['web', 'whatsapp_bot'],
      default: 'web',
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'pending'],
      default: 'active',
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    urgent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job: Model<IJobDocument> =
  mongoose.models.Job || mongoose.model<IJobDocument>('Job', JobSchema);

export default Job;
