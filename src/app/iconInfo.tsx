import React from 'react';
import Image from 'next/image';

const IconInfo = ({name, parent, path} : {name: string, parent: string, path: string}) => {
  return (
    <div>
      <Image
      src={path}
      width={500}
      height={500}
      alt="Picture of the author"
    />
    <div>{parent}</div>
    <div>{name}</div>
    </div>
  );
}

export default IconInfo;