'use client';
import React, { useState } from 'react';
import IconInfo from './iconInfo';
import { FileInfo } from '@/logic/filecrawler';

const IconList = ({ fileList }: { fileList: FileInfo[] }) => {
    const [filter, setFilter] = useState('');
    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value);
    }
    const filteredFiles = fileList.filter(f => {
        if (filter.length === 0) {
            return true;
        }
        const query = new RegExp(filter, 'gi');
        return query.test(f.name);
    });
    return (
        <div className='flex flex-col items-center justify-between gap-4 w-full'>
            <div className='text-3xl'>Icon List</div>
            <div className='flex flex-row gap-4'>
                <label className='text-xl'>Search:</label>
                <input type='text' className='caret-black bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' onChange={handleFilterChange}></input>
            </div>

            <div className='grid grid-flow-row-dense w-full grid-cols-2 2xl:grid-cols-10 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
                {filteredFiles.map((fileInfo, index) => {
                    return (
                        <IconInfo key={index} {...fileInfo} ></IconInfo>
                    );
                })}
            </div>
        </div>
    );
}

export default IconList;