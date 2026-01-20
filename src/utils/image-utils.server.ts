import { promises as fs } from 'fs';
import path from 'path';
import { ImageInfo } from '@/types/image';

export async function getImagesFromFolder(
  folderName: string
): Promise<ImageInfo[]> {
  try {
    const folderPath = path.resolve(process.cwd(), 'public', folderName);
    const files = await fs.readdir(folderPath);

    const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

    return files
      .filter(file =>
        VALID_EXTENSIONS.includes(path.extname(file).toLowerCase())
      )
      .map(file => ({
        src: `/${folderName}/${file}`,
        name: file,
        path: path.posix.join(folderName, file),
      }));
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error(`Error reading folder ${folderName}:`, error);
    }
    return [];
  }
}