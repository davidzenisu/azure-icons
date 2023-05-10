import CrawlDirectory from '@/logic/filecrawler';
import path from 'path';
import IconInfo from './iconInfo';

async function getFileList() {
  const publicDirectory = path.join(process.cwd(), 'public');
  const postsDirectory = path.join(publicDirectory, 'icons');
  const fileList = await CrawlDirectory(postsDirectory);
  const filteredList = fileList.filter(f => f.type === '.svg');
  // fix names of files and path
  filteredList.forEach(file => {
    file.path = file.path.replace(publicDirectory, '');
    const fileRegex = /\d+-icon-service-(?<Name>.*)\.svg/u;
    const fileNameInfo = fileRegex.exec(file.name)?.groups;
    let changedName = fileNameInfo?.Name ?? '';
    changedName = changedName.replace('-', ' ');
    file.name = changedName;

  });
  return filteredList;
}

export default async function Home() {
  const fileList = await getFileList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid grid-flow-row-dense 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
        {fileList.map((fileInfo, index) => {
          return (
            <IconInfo key={index} {...fileInfo} ></IconInfo>
          );
        })}
      </div>
    </main>
  )
}