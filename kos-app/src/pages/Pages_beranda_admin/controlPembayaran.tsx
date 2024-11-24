import React from "react";
import KamarTable from "../../../my-frontend/src/components/TablePembayaran";

const AdminPage = () => {
  return (
    <div>
      <h1>control kamar</h1>
      {/* Menampilkan tabel kamar */}
      <KamarTable />
    </div>
  );
};

export default AdminPage;