// LoginUser.ts
import axios from "axios";

export const loginUser = async (identifier: string, password: string): Promise<{ error?: string; jwt?: string }> => {
  try {
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier, // Bisa berupa email atau username
      password,   // Kata sandi pengguna
    });

    const token = response.data.jwt;
    localStorage.setItem("jwt", token); // Menyimpan token ke localStorage

    return { jwt: token }; // Mengembalikan token jika login berhasil
  } catch (error: any) {
    console.error("Login gagal:", error.response?.data || error.message);

    // Mengembalikan error jika login gagal
    return { error: "Username atau password salah" };
  }
};
