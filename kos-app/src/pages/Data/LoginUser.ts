import axios from "axios";

export const loginUser = async (identifier: string, password: string): Promise<{ error?: string, userData?: any }> => {
  try {
    // Mengirim permintaan login ke server Strapi
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier,
      password,
    });

    // Cek apakah response berisi data yang diperlukan
    console.log("Login berhasil:", response.data);

    // Menyimpan token dan data pengguna di localStorage
    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("username", response.data.user.username); // Menyimpan username

    // Mengembalikan data pengguna dan token, jika login berhasil
    return { userData: response.data.user };
  } catch (error: any) {
    if (error.response) {
      // Menangani error yang datang dari respons server
      console.error("Login gagal:", error.response.data || error.response.status);
      return { error: error.response.data?.message || 'Terjadi kesalahan, coba lagi.' };
    } else if (error.request) {
      // Menangani error jika tidak ada respons dari server
      console.error("Login gagal: Tidak ada respons dari server");
      return { error: "Tidak dapat terhubung ke server. Pastikan server berjalan." };
    } else {
      // Menangani error lain seperti kesalahan di aplikasi
      console.error("Login gagal:", error.message);
      return { error: error.message };
    }
  }
};
