import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import ProfileUser from './pages/ProfileUser';
import { SubscribePage, SubscribeToMePage } from './pages/StaticProfile';

function App() {
  return (
    <Routes>
      <Route path="Article/" element={<HomePage />} />
      <Route path="Article/home" element={<HomePage />} />
      <Route path="Article/register" element={<RegisterPage />} />
      <Route path="Article/login" element={<LoginPage />} />
      <Route path="Article/post/:id" element={<PostPage />} />
      <Route path="Articleprofile/:id" element={<ProfileUser />} />
      <Route path="Article/editPost" element={<EditPostPage />} />
      <Route path="Article/profile" element={<ProfilePage />} />

      <Route path="Article/subscribeToMe" element={<SubscribeToMePage />} />
      <Route path="Article/subscribe" element={<SubscribePage />} />
    </Routes>
  );
}

export default App;
