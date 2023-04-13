import { signInWithGoogle, signOut } from '../firebase.js';
import useUser from '../hooks/useUser.js';
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Login from './Cards/Login/Login.js';

function Header() {
  const user = useUser();
  const navigate = useNavigate(); // add this line

  // const handleSignIn = () => {
  //   signInWithGoogle()
  //     // .then(() => {
  //     //   navigate('/dashboard'); // redirect to dashboard after successful authentication
  //     // })
  //     // .catch(error => {
  //     //   console.log(error);
  //     // });
  // };

  return (
    <header>
      {/* {user === null ?
        <button onClick={handleSignIn}>Sign In</button>
        :
        <>
          <div className="user">
            <img src={user.photoURL} alt="User" />
            <strong>{user.displayName}</strong>
            <small>{user.email}</small>
          </div>

          <Navbar signOut={signOut} />
        </>
      } */}
       
      <Navbar/>
    </header>
  );
}

export default Header;
