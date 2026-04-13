import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

interface RevalidateBody {
  paths: string[];
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-secret');

  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = (await request.json()) as RevalidateBody;

  if (!Array.isArray(body.paths) || body.paths.length === 0) {
    return NextResponse.json({ message: 'Missing paths' }, { status: 400 });
  }

  for (const path of body.paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: body.paths });
}
