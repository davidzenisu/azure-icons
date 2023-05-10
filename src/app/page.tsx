import CrawlDirectory from '@/logic/filecrawler';
import path from 'path';

async function getFileList() {
  const postsDirectory = path.join(process.cwd(), 'public', '');
  const fileList = await CrawlDirectory(postsDirectory);
  return fileList;
}

export default async function Home() {
  const fileList = await getFileList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Hello World!
      </div>
    </main>
  )
}