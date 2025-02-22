import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Purchase from '@/models/Purchase';
import { auth } from '@/lib/auth';

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const user = await auth(req);
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 
    const purchase = await Purchase.findById(id);
    await Purchase.findByIdAndDelete(id);
    return NextResponse.json({ message: '구매 신청이 취소되었습니다.' });
  } catch (error) {
    console.error('Cancel participation error:', error);
    return NextResponse.json(
      { error: '구매 신청 취소에 실패했습니다.' },
      { status: 500 }
    );
  }
}
