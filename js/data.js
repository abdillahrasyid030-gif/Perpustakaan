// data slider iklan
const dataSlider = [
  {
    id: 1,
    judul: "Selamat Datang di Perpustakaan Kampus",
    deskripsi:
      "Temukan buku akademik, teknologi, jurnal, dan bacaan pilihan dengan lebih mudah.",
    tombol: "Lihat Koleksi",
    link: "page/koleksi.html",
    gambar: "pemrograman web dasar.png",
  },
  {
    id: 2,
    judul: "Pinjam Buku dengan Sistem Digital",
    deskripsi:
      "Ajukan peminjaman buku secara online dan pantau status persetujuannya langsung dari halaman peminjaman.",
    tombol: "Ajukan Peminjaman",
    link: "page/peminjaman.html",
    gambar: "buku manajemen perpustakaan.png",
  },
  {
    id: 3,
    judul: "Kumpulkan EXP dari Aktivitas Membaca",
    deskripsi:
      "User aktif dapat mengumpulkan EXP dari peminjaman buku dan kunjungan perpustakaan.",
    tombol: "Lihat Profile",
    link: "page/profile.html",
    gambar: "algoritma dan struktur data.png",
  },
  {
    id: 4,
    judul: "Reward untuk Pembaca Aktif",
    deskripsi:
      "Tingkatkan level akunmu dan dapatkan kesempatan mengikuti program reward perpustakaan.",
    tombol: "Mulai Sekarang",
    link: "page/koleksi.html",
    gambar: "jurnal SI.png",
  },
];

// kategori buku
const kategoriBuku = [
  "Semua",
  "Teknologi",
  "Akademik",
  "Desain",
  "Informatika",
  "Jurnal",
  "Non-Fiksi",
];

// data buku 
const daftarBuku = [
  {
    id: "pemrograman-web-dasar",
    judul: "Pemrograman Web Dasar",
    penulis: "Andi Pratama",
    kategori: "Teknologi",
    jenis: "Buku Akademik",
    tag: ["Teknologi", "Web Development", "HTML", "CSS", "Pemula"],
    gambar: "pemrograman web dasar.png",
    rak: "Rak A1",
    stok: 12,
    tahun: "2024",
    pembaca: "1.2k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar pembuatan website, mulai dari pengenalan HTML, CSS, struktur halaman, sampai membuat tampilan web sederhana.",
    karakteristik: [
      "Cocok untuk pembaca pemula",
      "Membahas struktur dasar HTML dan CSS",
      "Berisi contoh penerapan tampilan website sederhana",
      "Sesuai untuk mahasiswa yang baru belajar pemrograman web",
    ],
  },
  {
    id: "basis-data-modern",
    judul: "Basis Data Modern",
    penulis: "Rina Kurniawati",
    kategori: "Akademik",
    jenis: "Buku Referensi",
    tag: ["Akademik", "Database", "SQL", "Sistem Informasi"],
    gambar: "basis data.png",
    rak: "Rak B2",
    stok: 0,
    tahun: "2023",
    pembaca: "980 pembaca",
    status: "Dipinjam",
    sinopsis:
      "Buku ini menjelaskan konsep dasar basis data, pengelolaan data, relasi antar tabel, dan penerapannya pada sistem informasi.",
    karakteristik: [
      "Membahas konsep tabel dan relasi data",
      "Cocok untuk pembelajaran sistem basis data",
      "Menjelaskan penerapan database pada sistem informasi",
      "Dapat digunakan sebagai referensi tugas kuliah",
    ],
  },
  {
    id: "desain-ui-dasar",
    judul: "Desain UI Dasar",
    penulis: "Yoga Saputra",
    kategori: "Desain",
    jenis: "Buku Akademik",
    tag: ["Desain", "UI", "UX", "Interface", "Pemula"],
    gambar: "desain UIUX.png",
    rak: "Rak C1",
    stok: 7,
    tahun: "2024",
    pembaca: "860 pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar desain antarmuka, penggunaan warna, layout, komponen UI, dan pengalaman pengguna pada aplikasi.",
    karakteristik: [
      "Membahas prinsip dasar desain antarmuka",
      "Cocok untuk belajar UI/UX dari awal",
      "Menjelaskan penggunaan warna dan layout",
      "Relevan untuk pengembangan tampilan website",
    ],
  },
  {
    id: "logika-informatika",
    judul: "Logika Informatika",
    penulis: "Fajar Nugroho",
    kategori: "Informatika",
    jenis: "Buku Akademik",
    tag: ["Informatika", "Logika", "Algoritma", "Dasar Pemrograman"],
    gambar: "Logika Informatika.png",
    rak: "Rak A3",
    stok: 5,
    tahun: "2022",
    pembaca: "1.0k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar logika informatika, operator logika, penalaran, dan penerapannya dalam pemrograman.",
    karakteristik: [
      "Membahas logika dasar dalam informatika",
      "Cocok untuk memahami alur berpikir komputasi",
      "Berisi pengenalan operator logika",
      "Dapat membantu pemahaman dasar pemrograman",
    ],
  },
  {
    id: "algoritma-dan-struktur-data",
    judul: "Algoritma dan Struktur Data",
    penulis: "Fajar Nugroho",
    kategori: "Informatika",
    jenis: "Buku Akademik",
    tag: ["Informatika", "Algoritma", "Struktur Data", "Pemrograman"],
    gambar: "algoritma dan struktur data.png",
    rak: "Rak A2",
    stok: 9,
    tahun: "2021",
    pembaca: "1.5k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas algoritma, array, stack, queue, linked list, tree, dan graph sebagai dasar penyelesaian masalah dalam pemrograman.",
    karakteristik: [
      "Membahas struktur data dasar",
      "Cocok untuk mahasiswa informatika dan sistem informasi",
      "Menjelaskan alur penyelesaian masalah",
      "Membantu memahami logika pemrograman lebih lanjut",
    ],
  },
  {
    id: "manajemen-perpustakaan",
    judul: "Manajemen Perpustakaan",
    penulis: "Sari Handayani",
    kategori: "Non-Fiksi",
    jenis: "Buku Non-Fiksi",
    tag: ["Non-Fiksi", "Manajemen", "Perpustakaan", "Administrasi"],
    gambar: "buku manajemen perpustakaan.png",
    rak: "Rak D2",
    stok: 8,
    tahun: "2023",
    pembaca: "620 pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini menjelaskan pengelolaan perpustakaan, mulai dari layanan, koleksi, katalog, anggota, sampai sistem peminjaman.",
    karakteristik: [
      "Membahas pengelolaan layanan perpustakaan",
      "Cocok untuk memahami administrasi perpustakaan",
      "Menjelaskan pengelolaan koleksi dan anggota",
      "Relevan dengan sistem informasi perpustakaan",
    ],
  },
  {
    id: "dasar-kecerdasan-buatan",
    judul: "Dasar Kecerdasan Buatan",
    penulis: "Dewi Lestari",
    kategori: "Teknologi",
    jenis: "Buku Akademik",
    tag: ["Teknologi", "AI", "Machine Learning", "Data", "Pemula"],
    gambar: "AI.png",
    rak: "Rak C3",
    stok: 0,
    tahun: "2024",
    pembaca: "1.1k pembaca",
    status: "Dipinjam",
    sinopsis:
      "Buku ini mengenalkan konsep kecerdasan buatan, machine learning, data, algoritma, dan contoh penerapan AI secara sederhana.",
    karakteristik: [
      "Mengenalkan konsep dasar kecerdasan buatan",
      "Cocok untuk pembaca yang baru mengenal AI",
      "Membahas data dan algoritma secara sederhana",
      "Relevan dengan perkembangan teknologi saat ini",
    ],
  },
  {
    id: "jurnal-sistem-informasi",
    judul: "Jurnal Sistem Informasi",
    penulis: "Tim Akademik",
    kategori: "Jurnal",
    jenis: "Jurnal Akademik",
    tag: ["Jurnal", "Sistem Informasi", "Penelitian", "Teknologi"],
    gambar: "jurnal SI.png",
    rak: "Rak J1",
    stok: 14,
    tahun: "2024",
    pembaca: "740 pembaca",
    status: "Tersedia",
    sinopsis:
      "Jurnal ini berisi kumpulan artikel tentang sistem informasi, pengembangan sistem, dan penerapan teknologi informasi dalam organisasi.",
    karakteristik: [
      "Berisi kumpulan artikel akademik",
      "Cocok untuk referensi penelitian",
      "Membahas pengembangan sistem informasi",
      "Relevan untuk mahasiswa sistem informasi",
    ],
  },
];


// aturan peminjaman buku
const aturanPeminjaman = {
  durasiPinjamHari: 7,
  dendaPerHari: 1000,
  timerPersetujuanDetik: 30,
  batasPinjamLevelAwal: 1,
  batasPinjamLevelSepuluh: 2,
  levelBonusPinjam: 10,
};

// aturan exp dan gamifikasi
const aturanExp = {
  peminjamanDisetujui: 10,

  // exp pengembalian tidak dipakai 
  pengembalianTepatWaktu: 0,
  kunjunganPerpustakaan: 5,
  terlambatMengembalikan: -10,

  // exp review buku
  reviewDiterima: 100,
  reviewDitolak: 20,
  reviewKadaluarsa: 10,
  expPerLevel: 100,
};

// status peminjaman
const statusPeminjaman = {
  menunggu: "Menunggu Persetujuan",
  disetujui: "Disetujui",
  dipinjam: "Sedang Dipinjam",
  terlambat: "Terlambat",
  denda: "Denda Belum Dibayar",
  selesai: "Selesai",
};

// status review buku
const statusReviewBuku = {
  belum: "Belum Review",
  menunggu: "Menunggu Validasi",
  diterima: "Review Diterima",
  ditolak: "Review Ditolak",
  kadaluarsa: "Review Kadaluarsa",
};

// aturan validasi review
const aturanReviewBuku = {
  batasIsiHari: 3,
  timerValidasiDetik: 30,
  peluangDiterima: 0.8,
  minimalKarakter: 50,
};



// data awal akun untuk kebutuhan demo sistem
const dataAkunAwal = [
  {
    nama: "Jack Borrow",
    nim: "2026000001",
    programStudi: "Sistem Informasi",
    password: "jack123",
    totalKunjungan: 2,
    totalPeminjaman: 2,
    totalDikembalikan: 2,
    totalExp: 150,
    level: 2,
    dendaAktif: 0,
  },
  {
    nama: "Rani Putri",
    nim: "2026000002",
    programStudi: "Sistem Informasi",
    password: "rani123",
    totalKunjungan: 1,
    totalPeminjaman: 2,
    totalDikembalikan: 1,
    totalExp: 35,
    level: 1,
    dendaAktif: 0,
  },
];

// Data dummy ini dipakai saat localStorage masih kosong.
const dataPeminjamanAwal = [
  {
    id: 1001,
    nama: "Jack Borrow",
    nim: "2026000001",
    idBuku: "pemrograman-web-dasar",
    judul: "Pemrograman Web Dasar",
    kategori: "Teknologi",
    tanggalPinjam: "2026-06-01",
    tanggalKembali: "2026-06-08",
    status: statusPeminjaman.selesai,
    denda: 0,
    bolehKembali: true,
    waktuDibuat: new Date("2026-06-01T08:00:00").getTime(),
    waktuDisetujui: new Date("2026-06-01T08:01:00").getTime(),
    tanggalSelesai: "2026-06-08",
    notifTerlambat: false,
    pengembalianSudahDihitung: true,
    statusReview: statusReviewBuku.diterima,
    judulReview: "Ringkasan Pemrograman Web Dasar",
    statusMembaca: "Penuh",
    bagianDibaca: "",
    isiReview:
      "Buku ini menjelaskan dasar pembuatan website mulai dari HTML, CSS, struktur halaman, hingga cara menyusun tampilan yang rapi untuk pemula.",
    tanggalReview: "2026-06-08",
    deadlineReview: "2026-06-11",
    waktuReviewDikirim: new Date("2026-06-08T14:00:00").getTime(),
    waktuHasilReview: new Date("2026-06-08T14:01:00").getTime(),
    expReview: 100,
    reviewSudahDihitung: true,
  },
  {
    id: 1002,
    nama: "Jack Borrow",
    nim: "2026000001",
    idBuku: "desain-ui-dasar",
    judul: "Desain UI Dasar",
    kategori: "Desain",
    tanggalPinjam: "2026-06-04",
    tanggalKembali: "2026-06-11",
    status: statusPeminjaman.selesai,
    denda: 0,
    bolehKembali: true,
    waktuDibuat: new Date("2026-06-04T09:00:00").getTime(),
    waktuDisetujui: new Date("2026-06-04T09:01:00").getTime(),
    tanggalSelesai: "2026-06-11",
    notifTerlambat: false,
    pengembalianSudahDihitung: true,
    statusReview: statusReviewBuku.ditolak,
    judulReview: "Review Singkat Desain UI Dasar",
    statusMembaca: "Sebagian",
    bagianDibaca: "Bab 1-2",
    isiReview:
      "Buku ini membahas pengenalan desain antarmuka, warna, dan layout, tetapi ringkasan yang dikirim masih terlalu umum sehingga ditolak oleh sistem.",
    tanggalReview: "2026-06-11",
    deadlineReview: "2026-06-14",
    waktuReviewDikirim: new Date("2026-06-11T16:00:00").getTime(),
    waktuHasilReview: new Date("2026-06-11T16:01:00").getTime(),
    expReview: 20,
    reviewSudahDihitung: true,
  },
  {
    id: 1003,
    nama: "Rani Putri",
    nim: "2026000002",
    idBuku: "manajemen-perpustakaan",
    judul: "Manajemen Perpustakaan",
    kategori: "Non-Fiksi",
    tanggalPinjam: "2026-06-02",
    tanggalKembali: "2026-06-09",
    status: statusPeminjaman.selesai,
    denda: 0,
    bolehKembali: true,
    waktuDibuat: new Date("2026-06-02T10:00:00").getTime(),
    waktuDisetujui: new Date("2026-06-02T10:01:00").getTime(),
    tanggalSelesai: "2026-06-09",
    notifTerlambat: false,
    pengembalianSudahDihitung: true,
    statusReview: statusReviewBuku.kadaluarsa,
    judulReview: "",
    statusMembaca: "",
    bagianDibaca: "",
    isiReview: "",
    tanggalReview: null,
    deadlineReview: "2026-06-12",
    waktuReviewDikirim: null,
    waktuHasilReview: new Date("2026-06-13T08:00:00").getTime(),
    expReview: 10,
    reviewSudahDihitung: true,
  },
  {
    id: 1004,
    nama: "Rani Putri",
    nim: "2026000002",
    idBuku: "algoritma-dan-struktur-data",
    judul: "Algoritma dan Struktur Data",
    kategori: "Informatika",
    tanggalPinjam: "2026-06-20",
    tanggalKembali: "2026-06-27",
    status: statusPeminjaman.dipinjam,
    denda: 0,
    bolehKembali: false,
    waktuDibuat: new Date("2026-06-20T09:00:00").getTime(),
    waktuDisetujui: new Date("2026-06-20T09:01:00").getTime(),
    tanggalSelesai: null,
    notifTerlambat: false,
    pengembalianSudahDihitung: false,
    statusReview: statusReviewBuku.belum,
    judulReview: "",
    statusMembaca: "",
    bagianDibaca: "",
    isiReview: "",
    tanggalReview: null,
    deadlineReview: null,
    waktuReviewDikirim: null,
    expReview: 0,
    reviewSudahDihitung: false,
  },
  {
    id: 1005,
    nama: "Rani Putri",
    nim: "2026000002",
    idBuku: "jurnal-sistem-informasi",
    judul: "Jurnal Sistem Informasi",
    kategori: "Jurnal",
    tanggalPinjam: "2026-06-23",
    tanggalKembali: "2026-06-30",
    status: statusPeminjaman.menunggu,
    denda: 0,
    bolehKembali: false,
    waktuDibuat: Date.now() - 5000,
    waktuDisetujui: null,
    tanggalSelesai: null,
    notifTerlambat: false,
    pengembalianSudahDihitung: false,
    statusReview: statusReviewBuku.belum,
    judulReview: "",
    statusMembaca: "",
    bagianDibaca: "",
    isiReview: "",
    tanggalReview: null,
    deadlineReview: null,
    waktuReviewDikirim: null,
    expReview: 0,
    reviewSudahDihitung: false,
  },
];


// Notifikasi user awal
// Untuk tahap awal dibiarkan kosong. 
// Kemudian notifikasi lain akan dibentuk melalui scripts.js.
const dataNotifikasiUser = [];