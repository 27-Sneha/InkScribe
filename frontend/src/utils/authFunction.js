import client from "./appwriteConfig";
import { ID, Account } from "appwrite";

const account = new Account(client);

export const useAuth = () => {
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
      const userResponse = await account.get();
      console.log(userResponse);
      localStorage.setItem("user", userResponse.name);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
  };
};
