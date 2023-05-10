import CrawlDirectory from '@/logic/filecrawler';
import path from 'path';
import IconInfo from './iconInfo';

async function getFileList() {
  const postsDirectory = path.join(process.cwd(), 'public', 'icons');
  const fileList = await CrawlDirectory(postsDirectory);
  const filteredList = fileList.filter(f => f.name.includes('svg'));
  return filteredList;
}

export default async function Home() {
  const fileList = await getFileList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Hello World!
      </div>
      <ul>
        {fileList.map((fileInfo, index) => {
          return (
            <IconInfo key={index} {...fileInfo} ></IconInfo>
          );
        })}
      </ul>
    </main>
  )
}