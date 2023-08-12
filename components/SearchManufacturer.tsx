"use client";
import Image from 'next/image';
import { useState, Fragment } from 'react';

import { Transition, Combobox } from '@headlessui/react';
import { SearchManufacturerProps } from '@/types';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');

    const filteredManufacturers = 
        query === '' ? manufacturers
            : manufacturers.filter((item) => (
            item.toLocaleLowerCase().replace(/\s+/g, "").includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        ))

    return (
        <div className='search-manufacturer'>
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className='relative w-full'>
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image
                            src='/car-logo.svg'
                            alt='logo'
                            width={20}
                            height={20} 
                            className='ml-4'
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className='search-manufacturer__input'
                        placeholder='WolksWagen'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='absolute z-20 bg-white' static>
                            <>
                                {filteredManufacturers.map((item) => (
                                    <Combobox.Option
                                        value={item}
                                        key={item}
                                        className={({active}) => `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                                    >
                                        {({ active, selected }) => (
                                            <li
                                                className={`${active ? ' text-white' : 'bg-white text-black'}`}
                                            >
                                                {item}
                                            </li>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </>
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox> 
        </div>
    )
}

export default SearchManufacturer