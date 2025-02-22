import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('GET /api/posts 오류:', error);
    return NextResponse.json({ message: '게시글 조회 실패', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, content, author, userId } = await req.json();
    console.log('POST /api/posts - 데이터 확인:', { title, content, author, userId });

    if (!title || !content || !author || !userId) {
      return NextResponse.json(
        { message: '모든 필드를 입력해야 합니다.' },
        { status: 400 }
      );
    }

    const newPost = await Post.create({ title, content, author, userId });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts 오류:', error);
    return NextResponse.json({ message: '게시글 생성 실패', error }, { status: 500 });
  }
}
