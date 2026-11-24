import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Job from '@/models/Job';
import { INITIAL_JOBS } from '@/lib/seedJobs';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Check if initial seed is needed
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany(INITIAL_JOBS);
    }

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const minSalary = searchParams.get('minSalary');
    const featured = searchParams.get('featured');

    const filter: any = { status: 'active' };

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (city && city !== 'all') {
      filter.city = city;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    if (minSalary && Number(minSalary) > 0) {
      filter.salaryMax = { $gte: Number(minSalary) };
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const jobs = await Job.find(filter).sort({ featured: -1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'فشل جلب الوظائف' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.company || !body.category || !body.city || !body.whatsappContact) {
      return NextResponse.json(
        { success: false, message: 'يرجى استكمال الحقول الأساسية المطلوبة' },
        { status: 400 }
      );
    }

    const code = `JOB-${Math.floor(1000 + Math.random() * 9000)}`;
    const baseSlug = (body.title + '-' + body.city)
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newJob = await Job.create({
      code,
      title: body.title,
      slug,
      company: body.company,
      companyLogo: body.companyLogo || '🏢',
      category: body.category,
      city: body.city,
      district: body.district || '',
      type: body.type || 'دوام كامل',
      experienceLevel: body.experienceLevel || 'متوسط',
      salaryMin: Number(body.salaryMin) || 0,
      salaryMax: Number(body.salaryMax) || 0,
      currency: body.currency || 'ج.م',
      hideSalary: Boolean(body.hideSalary),
      description: body.description || 'لم يتم إضافة وصف مفصل',
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      whatsappContact: body.whatsappContact,
      emailContact: body.emailContact || '',
      source: body.source || 'web',
      status: 'active',
      featured: false,
      urgent: Boolean(body.urgent),
    });

    return NextResponse.json({
      success: true,
      message: 'تم إضافة الوظيفة بنجاح!',
      job: newJob,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'فشل إضافة الوظيفة' },
      { status: 500 }
    );
  }
}
