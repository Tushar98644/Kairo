import { UserProfile } from '@clerk/nextjs';
import { FC } from 'react'
;

const ProfilePage: FC = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;