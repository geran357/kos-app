import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tabelPembayaran.css";

type Payment = {
  id: number;
  documentId: string;
  Items: {
    items: {
      name: string;
      amount: number;
    }[];
  };
  Kamar: string; // Field baru
  Total: number;
  Pembayaran_Visa_Mandiri: string;
  Status_Pembayaran: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

const TabelPembayaran: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");

  const token =
    "3cbb3ee9648ee70b81adea6e54436d39e73b7fd64a03992829f774958f44383882e54758ee281cc31a3698b1c832ee8e5f6ebd90122a98fbe884d98aa62b2962226b455aab1deb9ca3b70310286582a7b8c8fe44635f00c273bca4a0d9542193f2915432c587948cf49e3c5864b4733be7e50977bfb2fb1128fb26194f090e44";

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:1337/api/tagihans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filters: filter ? { Status_Pembayaran: { $eq: filter } } : undefined,
        },
      });
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
    setLoading(false);
  };

  const updateStatus = async (documentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Berhasil" ? "Belum" : "Berhasil";

    try {
      const response = await axios.put(
        `http://localhost:1337/api/tagihans/${documentId}`,
        {
          data: {
            Status_Pembayaran: newStatus,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Status berhasil diperbarui!");
        fetchPayments();
      } else {
        throw new Error("Response status bukan 200");
      }
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      alert("Gagal memperbarui status!");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  return (
    <div className="table-container">
      <h2>Riwayat Pembayaran</h2>
      <div className="filter-container">
        <button onClick={() => setFilter("Berhasil")}>Berhasil</button>
        <button onClick={() => setFilter("Belum")}>Belum</button>
        <button onClick={() => setFilter("")}>Semua</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Document ID</th>
              <th>Items</th>
              <th>Kamar</th>
              <th>Total</th>
              <th>Pembayaran Visa Mandiri</th>
              <th>Status Pembayaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.documentId}</td>
                <td>
                  <ul>
                    {payment.Items.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name}: Rp. {item.amount.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{payment.Kamar}</td> {/* Field baru */}
                <td>Rp. {payment.Total.toLocaleString()}</td>
                <td>{payment.Pembayaran_Visa_Mandiri}</td>
                <td>{payment.Status_Pembayaran}</td>
                <td>
                  <button
                    className="payment-btn"
                    onClick={() =>
                      updateStatus(
                        payment.documentId,
                        payment.Status_Pembayaran
                      )
                    }
                  >
                    Ubah Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabelPembayaran;
