/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000'; // Use your actual server URL

export const addBook = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addBook`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const searchBooks = async (title : string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/searchBooks`, {
        params: { title },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };