// data buku 
const daftarBuku = [
  {
    id: "pemrograman-web-dasar",
    judul: "Pemrograman Web Dasar",
    penulis: "Andi Pratama",
    kategori: "Teknologi",
    gambar: "pemrograman web dasar.png",
    rak: "Rak A1",
    stok: "Stok 12",
    tahun: "2024",
    pembaca: "1.2k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar pembuatan website, mulai dari pengenalan HTML, CSS, struktur halaman, sampai membuat tampilan web sederhana.",
  },
  {
    id: "basis-data-modern",
    judul: "Basis Data Modern",
    penulis: "Rina Kurniawati",
    kategori: "Akademik",
    gambar: "basis data.png",
    rak: "Rak B2",
    stok: "Stok 0",
    tahun: "2023",
    pembaca: "980 pembaca",
    status: "Dipinjam",
    sinopsis:
      "Buku ini menjelaskan konsep dasar basis data, pengelolaan data, relasi antar tabel, dan penerapannya pada sistem informasi.",
  },
  {
    id: "desain-ui-dasar",
    judul: "Desain UI Dasar",
    penulis: "Yoga Saputra",
    kategori: "Desain",
    gambar: "desain UIUX.png",
    rak: "Rak C1",
    stok: "Stok 7",
    tahun: "2024",
    pembaca: "860 pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar desain antarmuka, penggunaan warna, layout, komponen UI, dan pengalaman pengguna pada aplikasi.",
  },
  {
    id: "logika-informatika",
    judul: "Logika Informatika",
    penulis: "Fajar Nugroho",
    kategori: "Informatika",
    gambar: "Logika Informatika.png",
    rak: "Rak A3",
    stok: "Stok 5",
    tahun: "2022",
    pembaca: "1.0k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas dasar logika informatika, operator logika, penalaran, dan penerapannya dalam pemrograman.",
  },
  {
    id: "algoritma-dan-struktur-data",
    judul: "Algoritma dan Struktur Data",
    penulis: "Fajar Nugroho",
    kategori: "Informatika",
    gambar: "algoritma dan struktur data.png",
    rak: "Rak A2",
    stok: "Stok 9",
    tahun: "2021",
    pembaca: "1.5k pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini membahas algoritma, array, stack, queue, linked list, tree, dan graph sebagai dasar penyelesaian masalah dalam pemrograman.",
  },
  {
    id: "manajemen-perpustakaan",
    judul: "Manajemen Perpustakaan",
    penulis: "Sari Handayani",
    kategori: "Non-Fiksi",
    gambar: "buku manajemen perpustakaan.png",
    rak: "Rak D2",
    stok: "Stok 8",
    tahun: "2023",
    pembaca: "620 pembaca",
    status: "Tersedia",
    sinopsis:
      "Buku ini menjelaskan pengelolaan perpustakaan, mulai dari layanan, koleksi, katalog, anggota, sampai sistem peminjaman.",
  },
  {
    id: "dasar-kecerdasan-buatan",
    judul: "Dasar Kecerdasan Buatan",
    penulis: "Dewi Lestari",
    kategori: "Teknologi",
    gambar: "AI.png",
    rak: "Rak C3",
    stok: "Stok 0",
    tahun: "2024",
    pembaca: "1.1k pembaca",
    status: "Dipinjam",
    sinopsis:
      "Buku ini mengenalkan konsep kecerdasan buatan, machine learning, data, algoritma, dan contoh penerapan AI secara sederhana.",
  },
  {
    id: "jurnal-sistem-informasi",
    judul: "Jurnal Sistem Informasi",
    penulis: "Tim Akademik",
    kategori: "Jurnal",
    gambar: "jurnal SI.png",
    rak: "Rak J1",
    stok: "Stok 14",
    tahun: "2024",
    pembaca: "740 pembaca",
    status: "Tersedia",
    sinopsis:
      "Jurnal ini berisi kumpulan artikel tentang sistem informasi, pengembangan sistem, dan penerapan teknologi informasi dalam organisasi.",
  },
];

// mengambil semua buku
const docBuku = document.querySelectorAll(".book-card");

// menu baca dengan event klik
docBuku.forEach(function (card) {
  card.style.cursor = "pointer";

  card.addEventListener("click", function () {
    const idBuku = card.getAttribute("data-id");

    if (idBuku) {
      if (window.location.pathname.includes("/page/")) {
        window.location.href = "detailbuku.html?id=" + idBuku;
      } else {
        window.location.href = "page/detailbuku.html?id=" + idBuku;
      }
    }
  });
});

// pencarian buku
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

if (searchInput && searchButton) {
  function cariBuku() {
    const keyword = searchInput.value.toLowerCase();

    docBuku .forEach(function (card) {
      const judul = card.querySelector("h3").textContent.toLowerCase();
      const penulis = card.querySelector(".author").textContent.toLowerCase();

      if (judul.includes(keyword) || penulis.includes(keyword)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    cariBuku();
  });

  searchInput.addEventListener("keyup", function () {
    cariB()
  });
}

// filter kategori pada beranda
const semuaKategori = document.querySelectorAll(".category");

semuaKategori.forEach(function (category) {
  category.addEventListener("click", function () {
    semuaKategori.forEach(function (item) {
      item.classList.remove("active");
    });

    category.classList.add("active");

    const kategoriDipilih = category.textContent.toLowerCase();

    semuaCard.forEach(function (card) {
      const kategoriBuku = card
        .querySelector(".book-tag")
        .textContent.toLowerCase();

      if (kategoriDipilih === "semua" || kategoriBuku === kategoriDipilih) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// filter kategori pada koleksi
const semuaChip = document.querySelectorAll(".category-chip");

semuaChip.forEach(function (chip) {
  chip.addEventListener("click", function () {
    semuaChip.forEach(function (item) {
      item.classList.remove("active");
    });

    chip.classList.add("active");

    const kategoriDipilih = chip.textContent.toLowerCase();

    semuaCard.forEach(function (card) {
      const kategoriBuku = card
        .querySelector(".book-tag")
        .textContent.toLowerCase();

      if (kategoriDipilih === "semua" || kategoriBuku === kategoriDipilih) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// detail buku
const detailJudul = document.getElementById("detailJudul");

if (detailJudul) {
  const parameterUrl = new URLSearchParams(window.location.search);
  const idBuku = parameterUrl.get("id");

  const buku = daftarBuku.find(function (item) {
    return item.id === idBuku;
  });

  if (buku) {
    document.getElementById("detailGambar").src = "../image/" + buku.gambar;
    document.getElementById("detailGambar").alt = buku.judul;

    document.getElementById("detailKategori").textContent = buku.kategori;
    document.getElementById("detailJudul").textContent = buku.judul;
    document.getElementById("detailPenulis").textContent = buku.penulis;
    document.getElementById("detailRak").textContent = buku.rak;

    document.getElementById("detailStatus").textContent = buku.status;
    document.getElementById("detailStok").textContent = buku.stok;
    document.getElementById("detailSinopsis").textContent = buku.sinopsis;

    document.getElementById("detailTahun").textContent = buku.tahun;
    document.getElementById("detailPembaca").textContent = buku.pembaca;
    document.getElementById("detailRakInfo").textContent = buku.rak;
    document.getElementById("detailStatusInfo").textContent = buku.status;
  } else {
    detailJudul.textContent = "Buku tidak ditemukan";
    document.getElementById("detailSinopsis").textContent =
      "Data buku tidak tersedia atau halaman detail tidak sesuai.";
  }
}
