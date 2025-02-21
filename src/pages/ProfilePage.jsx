import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import GeneralInfo from '../components/Profile/GeneralPostsInfo';
import ProfilePosts from '../components/Profile/MyPosts';
import Profile from '../components/Profile/Profile';
import Settings from '../components/Profile/Settings';

export default function ProfilePage() {
  return (
    <>
      <Header></Header>
      <div className="container">
        <Profile></Profile>
        <GeneralInfo></GeneralInfo>
        <ProfilePosts></ProfilePosts>
        <Settings />
      </div>
    </>
  );
}
