// LoginUser .ts
import axios from "axios";

export const loginUser  = async (identifier: string, password: string): Promise<{ error?: string }> => {
  try {
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier,
      password,
    });

    console.log("Login berhasil:", response.data);
    localStorage.setItem("token", response.data.jwt);
    return {}; // Kembalikan objek kosong jika berhasil
  } catch (error: any) {
    if (error.response) {
      console.error("Login gagal:", error.response.data || error.response.status);
      return { error: error.response.data?.message || 'Terjadi kesalahan, coba lagi.' };
    } else if (error.request) {
      console.error("Login gagal: Tidak ada respons dari server");
      return { error: "Tidak dapat terhubung ke server. Pastikan server berjalan." };
    } else {
      console.error("Login gagal:", error.message);
      return { error: error.message };
    }
  }
};