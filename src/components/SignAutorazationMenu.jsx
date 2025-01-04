import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";
import { useUserContext } from "../context/UserContext";

export  const LogoutAcc = async () => {
  try {
    await signOut(auth);
    alert("User logged out");
  } catch (error) {
    alert("Error during logout:", error.message);
    throw error;
  }
};

export const DelateAcc = async () => {
  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
      alert("User account deleted");
    } else {
      throw new Error("No user is logged in");
    }
  } catch (error) {
    alert("Error during account deletion:", error.message);
    throw error;
  }
}

export default function SignAutorazationMenu({ isLogin, setIsLogin,   setIsLoginFinished, setTextIntoWorryPopup,
  setIsNoteInfoFill }) {

  let [nameValue, setNameValue] = useState();
  let [passwordValue, setPasswordValue] = useState();
  const auth = getAuth();
 

  function changeNameValue(event) {
    setNameValue(event.target.value); 
  }
  function changePasswordValue(event) {
    setPasswordValue(event.target.value);
  }
   const AutorizationAcc = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     
      return userCredential.user;
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw error;
    }
  };
  let {updatedUserId} = useUserContext()
  const LoginAcc = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
      const userId = userCredential.user.uid
      updatedUserId(userId)
      return userCredential.user;
    } catch (error) {
    
      throw error;
    }
  };



  const handleRegister = async () => {
    try {
      await AutorizationAcc(nameValue, passwordValue);
      setIsLoginFinished(true)
    } catch (error) {
      setTextIntoWorryPopup("Your email or password is uncorrect! Please check your info and try again")
      setIsNoteInfoFill(true)
      setIsLoginFinished(false)
    }
  };

  const handleLogin = async () => {
    try {
      await LoginAcc(nameValue, passwordValue);
      setIsLoginFinished(true)
    } catch (error) {
      setTextIntoWorryPopup("Account didn`t find! Please check your login or password and try again")
      setIsNoteInfoFill(true)
      setIsLoginFinished(false)
    }
  };


  function submutOnClickHandler() {
    (isLogin
      ? 
      handleLogin()
      : 
      handleRegister()
    )
  }
  return (
    <div className=" h-screen flex items-center justify-center">
      <div>
        <div>
          <p className="w-fit text-[white] text-[25px] mx-[auto]">
            {isLogin ? "Log in" : "Registration"}
          </p>
        </div>
        <div className="mt-[35px]">
          <div>
            {isLogin ? (
              <input
                value={nameValue}
                onChange={changeNameValue}
                type="text"
                placeholder="Write login"
                className="text-[white] text-[20px] bg-[#3B3B3B] rounded-[15px] py-[5px] px-[20px] outline-0"
              />
            ) : (
              <input
                value={nameValue}
                onChange={changeNameValue}
                type="text"
                placeholder="Write name"
                className="text-[white] text-[20px] bg-[#3B3B3B] rounded-[15px] py-[5px] px-[20px] outline-0"
              />
            )}
          </div>
          <div className="mt-[20px]">
            <input
              value={passwordValue}
              onChange={changePasswordValue}
              type="text"
              placeholder="Write password"
              className="text-[white] text-[20px] bg-[#3B3B3B] rounded-[15px] py-[5px] px-[20px] outline-0"
            />
          </div>
        </div>
        <div className="w-[170px] mx-[auto] mt-[25px]">
          <button
            className="w-[170px] mx-[auto] text-[#3B3B3B] bg-[white] text-[20px]  py-[2px] px-[10px] rounded-[15px] hover:text-white hover:bg-[#3B3B3B]"
            onClick={() => {
              submutOnClickHandler();
            }}
          >
            Submit
          </button>
        </div>
        <div className="w-full mt-[10px] text-center">
          <button
            className="text-[17px] text-white hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin
              ? "You don`t have an account?"
              : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}