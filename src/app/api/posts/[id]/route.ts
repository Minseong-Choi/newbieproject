import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { connectDB } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    console.log(`DELETE /api/posts/${id} - 게시글 삭제 시도`);

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '게시글이 삭제되었습니다.', _id: id },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/posts/[id] 오류:', error);
    return NextResponse.json({ message: '게시글 삭제 실패', error }, { status: 500 });
  }
}
