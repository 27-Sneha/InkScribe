import client from "./appwriteConfig";
import { ID, Account } from "appwrite";

const account = new Account(client);

export const registerUser = async (name, email, password) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    console.log(response);
    if (response) {
      await loginUser(email, password);
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await account.createSession(email, password);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  console.log("logout");
};
