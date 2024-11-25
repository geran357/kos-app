import axios from 'axios';

export const loginUserByName = async (username: string, password: string): Promise<{ error?: string, user?: any }> => {
  try {
    // Mengirimkan request untuk login berdasarkan username dan password
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: username, // Menggunakan username untuk login
      password: password
    });

    // Jika berhasil login, kita akan mendapatkan data user
    const user = response.data.user;

    // Mengecek apakah Nama (atau kamar) sesuai
    if (user && user.username && user.name) {
      return { user: response.data.user };  // Mengembalikan data user jika valid
    } else {
      return { error: 'Nama atau informasi pengguna tidak ditemukan.' };
    }
  } catch (error: any) {
    // Menangani error jika login gagal
    if (error.response) {
      console.error('Login gagal:', error.response.data || error.response.status);
      return { error: error.response.data?.message || 'Terjadi kesalahan, coba lagi.' };
    } else {
      console.error('Login gagal:', error.message);
      return { error: error.message };
    }
  }
};
