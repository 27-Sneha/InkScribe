import { Client } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "6685384300256d8c8d3a";

const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);
export default client;
