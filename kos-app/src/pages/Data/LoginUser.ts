import axios from "axios";

export const loginUser = async (
  identifier: string,
  password: string
): Promise<{ error?: string; userData?: any }> => {
  try {
    // Mengirim permintaan login ke server Strapi
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier, // username atau email
      password,
    });

    // Menyimpan data pengguna dan token
    const user = response.data.user;
    console.log("Login berhasil:", user); // Menampilkan data user yang diterima

    // Simpan token dan username di localStorage
    localStorage.setItem("token", response.data.jwt);
    localStorage.setItem("username", user.username);

    // Kembalikan data user untuk digunakan di login
    return { userData: user }; 
  } catch (error: any) {
    if (error.response) {
      console.error("Login gagal:", error.response.data);
      return { error: error.response.data?.message || "Terjadi kesalahan, coba lagi." };
    } else if (error.request) {
      console.error("Login gagal: Tidak ada respons dari server");
      return { error: "Tidak dapat terhubung ke server. Pastikan server berjalan." };
    } else {
      console.error("Login gagal:", error.message);
      return { error: error.message };
    }
  }
};
