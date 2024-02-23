import Profile from '@/components/profile';
import SideBar from '@/components/sideBar';
import React from 'react';

export default function page({
  params: { user },
}: {
  params: {
    user: string;
  };
}) {
  return (
    <>
      <SideBar />
      <Profile user={{ user }} />
    </>
  );
}
