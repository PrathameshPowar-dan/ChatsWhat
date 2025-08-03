import React, { useEffect } from 'react'
import { ChatStore } from '../Api/chat'

const Sidebar = () => {
    const { GetUsers, users, selectedUser, setSelectedUser, isUsersLoading } = ChatStore();

    const ActiveUsers = [];


    useEffect(() => {
        GetUsers();
    }, [GetUsers])

    if (isUsersLoading) {
        
    }
    
  return (
    <aside className='h-full w-[23vw] md:w-[19vw] bg-amber-300 '>Sidebar</aside>
  )
}

export default Sidebar