import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Job from '@/models/Job';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const job = await Job.findOneAndUpdate(
      { slug, status: 'active' },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'الوظيفة غير موجودة أو انتهى موعد التقديم عليها' },
        { status: 404 }
      );
    }

    // Get related jobs in the same category
    const relatedJobs = await Job.find({
      category: job.category,
      _id: { $ne: job._id },
      status: 'active',
    })
      .limit(3)
      .select('code title slug company city type salaryMin salaryMax currency');

    return NextResponse.json({
      success: true,
      job,
      relatedJobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'فشل جلب تفاصيل الوظيفة' },
      { status: 500 }
    );
  }
}
