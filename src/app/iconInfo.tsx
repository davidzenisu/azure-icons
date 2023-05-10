import React from 'react';
import Image from 'next/image';

const IconInfo = ({ name, parent, path }: { name: string, parent: string, path: string }) => {
  return (
    <div className='flex flex-col items-center justify-between p-4 gap-4 text-center aspect-square'>
      <div className='relative flex-initial h-full w-full'>
        <Image
          src={path}
          fill
          sizes="(max-width: 768px) 10vw, (max-width: 1200px) 10vw, 10vw"
          alt={name}
        />
      </div>
      <div className='flex-initial text-xl'>{parent}</div>
      <div className='flex-initials text-xl'>{name}</div>
    </div>
  );
}

export default IconInfo;