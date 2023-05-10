import CrawlDirectory from '@/logic/filecrawler';
import path from 'path';
import IconInfo from './iconInfo';
import iconConfig from '@/configuration/icons-config.json';
import IconList from './iconList';

async function getFileList() {
  const publicDirectory = path.join(process.cwd(), 'public');
  const postsDirectory = path.join(publicDirectory, 'icons');
  const fileList = await CrawlDirectory(postsDirectory);
  // fix names of files and path
  fileList.forEach(file => {
    file.path = file.path.replace(publicDirectory, '');
    const fileRegex = /\d+-icon-service-(?<Name>.*)\.svg/u;
    const fileNameInfo = fileRegex.exec(file.name)?.groups;
    let changedName = fileNameInfo?.Name ?? path.parse(file.name).name;
    changedName = changedName.replace(/-/g, ' ');
    file.name = changedName;
  });

  let filteredList = fileList.filter(f => {
    if (f.type !== '.svg') {
      return false;
    }
    if (iconConfig?.include) {
      if (iconConfig.include.names?.length > 0) {
        const includeNames = iconConfig.include.names.some(ex => f.name.includes(ex));
        if (!includeNames){
          return false;
        }
      }
      if (iconConfig.include.parents.length > 0) {
        const includeParents = iconConfig.include.parents.some(ex => f.parent.includes(ex));
        if (!includeParents){
          return false;
        }
      }
    }
    if (iconConfig?.exclude) {
      if (iconConfig.exclude.names.length > 0) {
        const excludeNames = iconConfig.exclude.names.some(ex => f.name.includes(ex));
        if (excludeNames){
          return false;
        }
      }
      if (iconConfig.exclude.parents.length > 0) {
        const excludeParents = iconConfig.exclude.parents.some(ex => f.parent.includes(ex));
        if (excludeParents){
          return false;
        }
      }
    }
    return true;
  });

  // finally, exclude all duplicates (dirty hack for now)
  filteredList = filteredList.filter((f1, index, self) =>
    index === self.findIndex((f2) => (
      f1.name === f2.name
    ))
  );

  console.log(filteredList.map(f => f.name));
  console.log(`So many icons: ${filteredList.length}`);
  return filteredList;
}

export default async function Home() {
  const fileList = await getFileList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <IconList fileList={fileList}></IconList>
    </main>
  )
}