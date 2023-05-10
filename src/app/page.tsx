import CrawlDirectory from '@/logic/filecrawler';
import path from 'path';
import IconInfo from './iconInfo';
import iconConfig from '@/configuration/icons-config.json';

async function getFileList() {
  const publicDirectory = path.join(process.cwd(), 'public');
  const postsDirectory = path.join(publicDirectory, 'icons');
  const fileList = await CrawlDirectory(postsDirectory);
  // fix names of files and path
  fileList.forEach(file => {
    file.path = file.path.replace(publicDirectory, '');
    const fileRegex = /\d+-icon-service-(?<Name>.*)\.svg/u;
    const fileNameInfo = fileRegex.exec(file.name)?.groups;
    let changedName = fileNameInfo?.Name ?? '';
    changedName = changedName.replace('-', ' ');
    file.name = changedName;
  });

  const filteredList = fileList.filter(f => {
    if (f.type !== '.svg') {
      return false;
    }
    if (iconConfig?.include) {
      if (iconConfig.include.names) {
        const includeNames = iconConfig.include.names.some(ex => f.name.includes(ex));
        if (!includeNames){
          return false;
        }
      }
      if (iconConfig.include.parents) {
        const includeParents = iconConfig.include.parents.some(ex => f.parent.includes(ex));
        if (!includeParents){
          return false;
        }
      }
    } else if (iconConfig?.exclude) {
      if (iconConfig.exclude.names) {
        const excludeNames = iconConfig.exclude.names.some(ex => f.name.includes(ex));
        if (!excludeNames){
          return false;
        }
      }
      if (iconConfig.exclude.parents) {
        const excludeParents = iconConfig.exclude.parents.some(ex => f.parent.includes(ex));
        if (excludeParents){
          return false;
        }
      }
    }
    return true;
  });

  console.log(filteredList.map(f => f.name));
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