const express = require("express");
const app = express();
app.use(express.json());

const karyawan = [
    { 
        id: "K001", 
        nama: "Budi Santoso", 
        divisi: "IT Support", 
        status: "Tetap" },
    { 
        id: "K002", 
        nama: "Siti Aminah", 
        divisi: "HRD", 
        status: "Kontrak" },
    { 
        id: "K003", 
        nama: "Andi Saputra", 
        divisi: "Finance", 
        status: "Tetap" },
    { 
        id: "K004", 
        nama: "Dewi Lestari", 
        divisi: "Marketing", 
        status: "Kontrak" },
    { 
        id: "K005", 
        nama: "Fajar Nugraha", 
        divisi: "Operasional", 
        status: "Tetap" 
    }
];

app.get("/karyawan", (req, res) => {
    res.status(200).json(karyawan);
});

app.get("/karyawan/:id", (req, res) => {
    const data = karyawan.find(k => k.id === req.params.id);
    if (data) res.status(200).json(data);
    else res.status(404).json({ message: "Karyawan tidak ditemukan" });
});

app.post("/karyawan", (req, res) => {
    const karyawanBaru = req.body;
    karyawan.push(karyawanBaru);
    res.status(201).json(karyawanBaru);
});

app.patch("/karyawan/:id", (req, res) => {
    const index = karyawan.findIndex(k => k.id === req.params.id);
    if (index !== -1) {
        karyawan[index] = { ...karyawan[index], ...req.body };
        res.status(200).json(karyawan[index]);
    } else {
        res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }
});

app.delete("/karyawan/:id", (req, res) => {
    const index = karyawan.findIndex(k => k.id === req.params.id);
    if (index !== -1) {
        const terhapus = karyawan.splice(index, 1);
        res.status(200).json({ message: "Data berhasil dihapus", data: terhapus[0] });
    } else {
        res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }
});

app.listen(3000, () => console.log("Server Karyawan berjalan di port 3000"));