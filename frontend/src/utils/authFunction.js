import { userAtom } from "../atoms/user";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import client from "./appwriteConfig";
import { ID, Account } from "appwrite";

const account = new Account(client);

export const useAuth = () => {
  const [userName, setUserName] = useRecoilState(userAtom);

  const registerUser = async (name, email, password) => {
    try {
      const response = await account.create(ID.unique(), email, password, name);
      console.log(response);
      if (response) {
        await loginUser(email, password);
      }
    } catch (err) {
      console.error("Error signing up:", err);
      throw err;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      localStorage.setItem("user", JSON.stringify(response));
      const userResponse = await account.get();
      console.log(userResponse);
      setUserName(userResponse.name);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      localStorage.removeItem("user");
      setUserName(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const checkAuth = async () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUserName(JSON.parse(storedUser));
    } else {
      setUserName(null);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
  };
};
