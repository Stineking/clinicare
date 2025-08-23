import React from 'react'
import Logo from './Logo'
import Drawer from './Drawer'
import { useAuth } from '@/store';

export default function MobileNav() {
    const { user } = useAuth();
  
  return (
    <div className='lg:hidden fixed bg-white z-10 shadow w-full'>
        <div className='px-4 md:px-8 py-5 flex items-center justify-between'>
            <Logo/>
            <Drawer user={user}/>
        </div>
    </div>
  )
}
