const express = require("express");
const app = express();
app.use(express.json());

const mahasiswa = [
    {
        nim : "362558302096",
        nama : "Rizky Tri Anggara",
        status : "Aktif"
    },
    {
        nim : "362558302044",
        nama : "Adam Marchelino",
        status : "Aktif"
    },
    {
        nim : "362558302098",
        nama : "Wildan Daffa Akmal Putra",
        status : "Aktif"
    },
    {
        nim : "3625558302135",
        nama : "Muhammad Hasbiallah Habibi",
        status : "Aktif"
    },
];

app.get("/", (req, res) =>
  res.json({ message: "HTTP Server Praktikum Interopabilitas" }),
);

app.get("/mahasiswa", (req, res) => {
    res.status(200).json(mahasiswa);
});

app.post("/mahasiswa", (req, res) => {
    const dataMahasiswaBaru = req.body;
    
    mahasiswa.push(dataMahasiswaBaru);
    
    res.status(201).json(dataMahasiswaBaru);
});

app.patch("/mahasiswa/:nim", (req, res) => {
    const nimYangDicari = req.params.nim;
    const dataUpdate = req.body;

    const index = mahasiswa.findIndex(mhs => mhs.nim === nimYangDicari);

    if (index !== -1) {
        mahasiswa[index] = { ...mahasiswa[index], ...dataUpdate };
        
        res.status(200).json(mahasiswa[index]);
    } else {
        res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });
    }
});

app.delete("/mahasiswa/:nim", (req, res) => {
    const nimYangDicari = req.params.nim;

    const index = mahasiswa.findIndex(mhs => mhs.nim === nimYangDicari);

    if (index !== -1) {
        const dataDihapus = mahasiswa.splice(index, 1);
        
        res.status(200).json({
            message: `Data mahasiswa dengan NIM ${nimYangDicari} berhasil dihapus`,
            data: dataDihapus[0]
        });
    } else {
        res.status(404).json({ message: "Data mahasiswa tidak ditemukan" });
    }
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
