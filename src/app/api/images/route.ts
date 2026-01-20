import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderName = searchParams.get('folder');

  if (!folderName) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const folderPath = path.join(process.cwd(), 'public', folderName);
    const files = await fs.readdir(folderPath);

    const images = files
      .filter(file =>
        VALID_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .map(file => ({
        src: `/${folderName}/${file}`,
        name: file,
        path: `${folderName}/${file}`,
      }));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}
