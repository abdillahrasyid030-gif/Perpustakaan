// fungsi untuk mengambil elemen agar penulisan kode lebih singkat
function pilih(selector) {
  return document.querySelector(selector);
}

function pilihSemua(selector) {
  return document.querySelectorAll(selector);
}

// data diambil dari data.js
const dataBukuWebsite = daftarBuku;
const dataSliderWebsite = dataSlider;

const aturanPinjam = aturanPeminjaman;
const aturanPoin = aturanExp;
const statusPinjam = statusPeminjaman;
const statusReview = statusReviewBuku;
const aturanReview = aturanReviewBuku;

const dataAkunDefault = dataAkunAwal;
const dataPeminjamanDefault = dataPeminjamanAwal;
const dataNotifikasiDefault = dataNotifikasiUser;

// key localStorage
const KEY_AKUN = "dataAkunPerpustakaan";
const KEY_LOGIN = "akunLoginPerpustakaan";
const KEY_USER = "dataUser";
const KEY_PEMINJAMAN = "dataPeminjaman";
const KEY_BUKU = "dataBukuPerpustakaan";

let idEditPeminjaman = null;
let idBukuDipilih = null;
let filterKoleksi = "Semua";
let keywordKoleksi = "";
let sortKoleksi = "Terbaru";
let filterNotifAktif = "semua";
let idReviewAktif = null;

// fungsi mengecek akses halaman agar user wajib login terlebih dahulu
function cekAksesLogin() {
  const akunLogin = localStorage.getItem(KEY_LOGIN);

  const namaFile = window.location.pathname.split("/").pop();

  const halamanLogin = namaFile === "login.html";
  const halamanRegister = namaFile === "register.html";
  const halamanIndex = namaFile === "" || namaFile === "index.html";

  const halamanAuth = halamanLogin || halamanRegister;

  // jika belum login dan membuka halaman selain login/register
  if (!akunLogin && !halamanAuth) {
    if (halamanIndex) {
      window.location.replace("page/login.html");
    } else {
      window.location.replace("login.html");
    }

    return;
  }

  // jika sudah login tetapi membuka login/register
  if (akunLogin && halamanAuth) {
    window.location.replace("../index.html");
  }
}


// mengecek path file html
function adaDiFolderPage() {
  return window.location.pathname.includes("/page/");
}

function namaHalamanAktif() {
  return window.location.pathname.split("/").pop();
}

function pathGambar(namaGambar) {
  if (adaDiFolderPage()) {
    return "../image/" + namaGambar;
  }

  return "image/" + namaGambar;
}

function pathHalaman(namaHalaman) {
  if (adaDiFolderPage()) {
    return namaHalaman;
  }

  return "page/" + namaHalaman;
}

function pathBeranda() {
  if (adaDiFolderPage()) {
    return "../index.html";
  }

  return "index.html";
}

// Membuat fungsi untuk format data agar rapi
function formatRupiah(angka) {
  return "Rp " + Number(angka || 0).toLocaleString("id-ID");
}

function formatTanggal(tanggal) {
  if (!tanggal) {
    return "-";
  }

  const dataTanggal = new Date(tanggal + "T00:00:00");

  if (isNaN(dataTanggal)) {
    return "-";
  }

  return dataTanggal.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function tanggalHariIni() {
  const sekarang = new Date();
  const zonaLokal = new Date(
    sekarang.getTime() - sekarang.getTimezoneOffset() * 60000
  );

  return zonaLokal.toISOString().split("T")[0];
}

function tambahHari(tanggal, jumlahHari) {
  const hasilTanggal = new Date(tanggal + "T00:00:00");
  hasilTanggal.setDate(hasilTanggal.getDate() + jumlahHari);

  return hasilTanggal.toISOString().split("T")[0];
}

function salinData(data) {
  return JSON.parse(JSON.stringify(data));
}

// mengambil dan menyimpan data ke localStorage
function ambilData(key, dataAwal) {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return salinData(dataAwal);
}

function simpanData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// menyiapkan data awal jika localStorage masih kosong
function siapkanDataAwal() {
  if (!localStorage.getItem(KEY_AKUN)) {
    simpanData(KEY_AKUN, dataAkunDefault);
  }

  if (!localStorage.getItem(KEY_BUKU)) {
    simpanData(KEY_BUKU, dataBukuWebsite);
  }

  if (!localStorage.getItem(KEY_PEMINJAMAN)) {
    simpanData(KEY_PEMINJAMAN, dataPeminjamanDefault);
  }
}

// toast pesan
function tampilkanPesan(pesan, tipe = "info") {
  let wrapper = pilih(".toast-wrapper");

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "toast-wrapper";
    document.body.appendChild(wrapper);
  }

  const toast = document.createElement("div");
  toast.className = "toast toast-" + tipe;

  toast.innerHTML = `
    <div class="toast-icon">${ambilIconToast(tipe)}</div>
    <div class="toast-text">${pesan}</div>
    <button class="toast-close" type="button">&times;</button>
  `;

  wrapper.appendChild(toast);

  const tombolClose = toast.querySelector(".toast-close");

  tombolClose.addEventListener("click", function () {
    toast.remove();
  });

  setTimeout(function () {
    toast.classList.add("show");
  }, 50);

  setTimeout(function () {
    toast.classList.remove("show");

    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 3000);
}

function ambilIconToast(tipe) {
  if (tipe === "success") {
    return "✓";
  }

  if (tipe === "error") {
    return "!";
  }

  if (tipe === "warning") {
    return "⚠";
  }

  return "i";
}

// konfirmasi
function tampilkanKonfirmasi(pesan, aksiSetuju, judul = "Konfirmasi") {
  const modalLama = pilih(".modal-overlay");

  if (modalLama) {
    modalLama.remove();
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-box">
      <h3>${judul}</h3>
      <p>${pesan}</p>
      <div class="modal-actions">
        <button type="button" class="btn-secondary modal-batal">Batal</button>
        <button type="button" class="btn-primary modal-setuju">Ya, Lanjutkan</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-batal").addEventListener("click", function () {
    modal.remove();
  });

  modal.querySelector(".modal-setuju").addEventListener("click", function () {
    aksiSetuju();
    modal.remove();
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.remove();
    }
  });
}

// data akun
function ambilDataAkun() {
  return ambilData(KEY_AKUN, dataAkunDefault);
}

function simpanDataAkun(dataAkun) {
  simpanData(KEY_AKUN, dataAkun);
}

function ambilNimLogin() {
  const nimLogin = localStorage.getItem(KEY_LOGIN);

  if (nimLogin) {
    return nimLogin;
  }

  const dataAkun = ambilDataAkun();

  if (dataAkun.length > 0) {
    return dataAkun[0].nim;
  }

  return "";
}

function hapusPasswordUser(user) {
  const dataUser = { ...user };
  delete dataUser.password;
  return dataUser;
}

function hitungLevel(totalExp) {
  return Math.floor((totalExp || 0) / aturanPoin.expPerLevel) + 1;
}

function ambilDataUser() {
  const dataAkun = ambilDataAkun();
  const nimLogin = ambilNimLogin();

  let user = dataAkun.find(function (akun) {
    return akun.nim === nimLogin;
  });

  if (!user && dataAkun.length > 0) {
    user = dataAkun[0];
  }

  if (!user) {
    return {
      nama: "Mahasiswa Perpustakaan",
      nim: "2026000001",
      programStudi: "Sistem Informasi",
      totalKunjungan: 0,
      totalPeminjaman: 0,
      totalDikembalikan: 0,
      totalExp: 0,
      level: 1,
      dendaAktif: 0,
    };
  }

  user.level = hitungLevel(user.totalExp);
  return hapusPasswordUser(user);
}

function simpanDataUser(user) {
  const dataAkun = ambilDataAkun();

  const indexUser = dataAkun.findIndex(function (akun) {
    return akun.nim === user.nim;
  });

  if (indexUser !== -1) {
    const passwordLama = dataAkun[indexUser].password;

    dataAkun[indexUser] = {
      ...dataAkun[indexUser],
      ...user,
      password: passwordLama,
      level: hitungLevel(user.totalExp),
    };

    simpanDataAkun(dataAkun);
  }

  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

function tambahExpKeUser(nim, jumlahExp) {
  const dataAkun = ambilDataAkun();

  const indexUser = dataAkun.findIndex(function (akun) {
    return akun.nim === nim;
  });

  if (indexUser === -1) {
    return;
  }

  dataAkun[indexUser].totalExp += jumlahExp;
  dataAkun[indexUser].level = hitungLevel(dataAkun[indexUser].totalExp);

  simpanDataAkun(dataAkun);

  if (localStorage.getItem(KEY_LOGIN) === nim) {
    const dataUserAktif = hapusPasswordUser(dataAkun[indexUser]);
    localStorage.setItem(KEY_USER, JSON.stringify(dataUserAktif));
  }
}

// data peminjaman
function ambilDataPeminjaman() {
  return ambilData(KEY_PEMINJAMAN, dataPeminjamanDefault);
}

function simpanDataPeminjaman(dataPeminjaman) {
  simpanData(KEY_PEMINJAMAN, dataPeminjaman);
}

// mengambil data buku
function ambilDataBuku() {
  return ambilData(KEY_BUKU, dataBukuWebsite);
}

// menyimpan perubahan data buku
function simpanDataBuku(dataBuku) {
  simpanData(KEY_BUKU, dataBuku);
}

// mengurangi stok buku saat peminjaman disetujui
function kurangiStokBuku(idBuku) {
  const dataBuku = ambilDataBuku();

  const buku = dataBuku.find(function (item) {
    return item.id === idBuku;
  });

  if (!buku) {
    return;
  }

  if (buku.stok > 0) {
    buku.stok -= 1;
  }

  if (buku.stok <= 0) {
    buku.stok = 0;
    buku.status = "Dipinjam";
  }

  simpanDataBuku(dataBuku);
}

// menambah stok buku saat buku dikembalikan
function tambahStokBuku(idBuku) {
  const dataBuku = ambilDataBuku();

  const buku = dataBuku.find(function (item) {
    return item.id === idBuku;
  });

  if (!buku) {
    return;
  }

  buku.stok += 1;

  if (buku.stok > 0) {
    buku.status = "Tersedia";
  }

  simpanDataBuku(dataBuku);
}

function ambilPeminjamanUserAktif() {
  const nimLogin = ambilNimLogin();
  const dataPeminjaman = ambilDataPeminjaman();

  return dataPeminjaman.filter(function (item) {
    return item.nim === nimLogin;
  });
}

// data review awal
function buatDataReviewAwal() {
  return {
    statusReview: statusReview.belum,
    judulReview: "",
    statusMembaca: "",
    bagianDibaca: "",
    isiReview: "",
    tanggalReview: null,
    deadlineReview: null,
    waktuReviewDikirim: null,
    waktuHasilReview: null,
    expReview: 0,
    reviewSudahDihitung: false,
  };
}

function lengkapiDataReview(item) {
  const dataAwal = buatDataReviewAwal();

  Object.keys(dataAwal).forEach(function (key) {
    if (item[key] === undefined) {
      item[key] = dataAwal[key];
    }
  });

  if (item.pengembalianSudahDihitung === undefined) {
    item.pengembalianSudahDihitung = false;
  }

  return item;
}

// register user
function aktifkanRegister() {
  const formRegister = pilih("#formRegister");

  if (!formRegister) {
    return;
  }

  formRegister.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = pilih("#regNama").value.trim();
    const nim = pilih("#regNim").value.trim();
    const prodi = pilih("#regProdi").value.trim();
    const password = pilih("#regPassword").value.trim();
    const konfirmasi = pilih("#regKonfirmasiPassword").value.trim();

    if (!nama || !nim || !prodi || !password || !konfirmasi) {
      tampilkanPesan(
        "Lengkapi seluruh data registrasi terlebih dahulu.",
        "error"
      );
      return;
    }

    if (password !== konfirmasi) {
      tampilkanPesan("Konfirmasi password belum sesuai.", "error");
      return;
    }

    const dataAkun = ambilDataAkun();

    const nimSudahAda = dataAkun.some(function (akun) {
      return akun.nim === nim;
    });

    if (nimSudahAda) {
      tampilkanPesan("NIM ini sudah digunakan. Gunakan NIM lain.", "warning");
      return;
    }

    const akunBaru = {
      nama: nama,
      nim: nim,
      programStudi: prodi,
      password: password,
      totalKunjungan: 0,
      totalPeminjaman: 0,
      totalDikembalikan: 0,
      totalExp: 0,
      level: 1,
      dendaAktif: 0,
    };

    dataAkun.push(akunBaru);
    simpanDataAkun(dataAkun);

    formRegister.reset();
    tampilkanPesan("Registrasi berhasil. Silakan login.", "success");

    setTimeout(function () {
      window.location.href = "login.html";
    }, 1000);
  });
}

// login user
function aktifkanLogin() {
  const formLogin = pilih("#formLogin");

  if (!formLogin) {
    return;
  }

  formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const nim = pilih("#loginNim").value.trim();
    const password = pilih("#loginPassword").value.trim();

    if (!nim || !password) {
      tampilkanPesan("Lengkapi NIM dan password terlebih dahulu.", "error");
      return;
    }

    const dataAkun = ambilDataAkun();

    const akun = dataAkun.find(function (item) {
      return item.nim === nim;
    });

    if (!akun) {
      tampilkanPesan(
        "Akun tidak ditemukan. Silakan registrasi terlebih dahulu.",
        "error"
      );
      return;
    }

    if (akun.password !== password) {
      tampilkanPesan("Password yang dimasukkan belum sesuai.", "error");
      return;
    }

    localStorage.setItem(KEY_LOGIN, akun.nim);
    localStorage.setItem(KEY_USER, JSON.stringify(hapusPasswordUser(akun)));

    tampilkanPesan("Login berhasil. Selamat datang kembali.", "success");

    setTimeout(function () {
      window.location.href = pathBeranda();
    }, 900);
  });
}

// logout user
function aktifkanLogout() {
  const tombolLogout = pilih("#btnLogout");

  if (!tombolLogout) {
    return;
  }

  tombolLogout.addEventListener("click", function () {
    tampilkanKonfirmasi(
      "Apakah kamu yakin ingin logout dari akun ini?",
      function () {
        localStorage.removeItem(KEY_LOGIN);
        localStorage.removeItem(KEY_USER);

        tampilkanPesan("Logout berhasil.", "success");

        setTimeout(function () {
          window.location.href = "login.html";
        }, 700);
      }
    );
  });
}

// card buku
function buatCardBuku(buku) {
  const statusClass =
    buku.status.toLowerCase() === "tersedia" ? "tersedia" : "dipinjam";

  return `
    <article class="book-card" data-id="${buku.id}">
      <div class="book-image">
        <img src="${pathGambar(buku.gambar)}" alt="Cover buku ${buku.judul}">
        <span class="status ${statusClass}">${buku.status}</span>
      </div>

      <div class="book-content">
        <p class="book-tag">${buku.kategori}</p>
        <h3>${buku.judul}</h3>
        <p class="author">${buku.penulis}</p>

        <div class="meta">
          <span>${buku.rak}</span>
          <span>Stok ${buku.stok}</span>
          <span>${buku.tahun}</span>
          <span>${buku.pembaca}</span>
        </div>
      </div>
    </article>
  `;
}

function tampilkanBuku(selector, dataBuku) {
  const container = pilih(selector);

  if (!container) {
    return;
  }

  container.innerHTML = dataBuku
    .map(function (buku) {
      return buatCardBuku(buku);
    })
    .join("");

  aktifkanKlikBuku();
}

function aktifkanKlikBuku() {
  const semuaCard = pilihSemua(".book-card");

  semuaCard.forEach(function (card) {
    card.style.cursor = "pointer";

    card.onclick = function () {
      const idBuku = card.getAttribute("data-id");

      if (idBuku) {
        window.location.href = pathHalaman("detailbuku.html") + "?id=" + idBuku;
      }
    };
  });
}

// slider beranda
function aktifkanSliderBeranda() {
  const sliderTitle = pilih("#sliderJudul");
  const sliderDesc = pilih("#sliderDeskripsi");
  const sliderButton = pilih("#sliderTombol");
  const sliderImage = pilih("#sliderGambar");
  const tombolPrev = pilih("#sliderPrev");
  const tombolNext = pilih("#sliderNext");
  const indikator = pilih("#sliderIndikator");

  if (!sliderTitle || !sliderDesc || dataSliderWebsite.length === 0) {
    return;
  }

  let indexSlider = 0;

  function tampilkanSlide(index) {
    const slide = dataSliderWebsite[index];

    sliderTitle.textContent = slide.judul;
    sliderDesc.textContent = slide.deskripsi;

    if (sliderButton) {
      sliderButton.textContent = slide.tombol;
      sliderButton.href = slide.link;
    }

    if (sliderImage) {
      sliderImage.src = pathGambar(slide.gambar);
      sliderImage.alt = slide.judul;
    }

    if (indikator) {
      indikator.innerHTML = dataSliderWebsite
        .map(function (_, posisi) {
          const active = posisi === index ? "active" : "";
          return `<span class="slider-dot ${active}" data-index="${posisi}"></span>`;
        })
        .join("");

      pilihSemua(".slider-dot").forEach(function (dot) {
        dot.addEventListener("click", function () {
          indexSlider = Number(dot.getAttribute("data-index"));
          tampilkanSlide(indexSlider);
        });
      });
    }
  }

  function slideBerikutnya() {
    indexSlider++;

    if (indexSlider >= dataSliderWebsite.length) {
      indexSlider = 0;
    }

    tampilkanSlide(indexSlider);
  }

  function slideSebelumnya() {
    indexSlider--;

    if (indexSlider < 0) {
      indexSlider = dataSliderWebsite.length - 1;
    }

    tampilkanSlide(indexSlider);
  }

  if (tombolNext) {
    tombolNext.addEventListener("click", slideBerikutnya);
  }

  if (tombolPrev) {
    tombolPrev.addEventListener("click", slideSebelumnya);
  }

  tampilkanSlide(indexSlider);
  setInterval(slideBerikutnya, 5000);
}

// pencarian dan filter beranda
function aktifkanPencarianBeranda() {
  const formSearch = pilih(".search-box");

  if (!formSearch) {
    return;
  }

  const inputSearch = formSearch.querySelector("input");

  function cariBuku() {
    const keyword = inputSearch.value.toLowerCase();
    const semuaCard = pilihSemua(".book-card");

    semuaCard.forEach(function (card) {
      const judul = card.querySelector("h3").textContent.toLowerCase();
      const penulis = card.querySelector(".author").textContent.toLowerCase();

      if (judul.includes(keyword) || penulis.includes(keyword)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  formSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    cariBuku();
  });

  inputSearch.addEventListener("input", cariBuku);
}

function aktifkanFilterBeranda() {
  const semuaKategori = pilihSemua(".category");

  if (semuaKategori.length === 0) {
    return;
  }

  semuaKategori.forEach(function (kategori) {
    kategori.addEventListener("click", function () {
      semuaKategori.forEach(function (item) {
        item.classList.remove("active");
      });

      kategori.classList.add("active");

      const kategoriDipilih = kategori.textContent.toLowerCase();
      const semuaCard = pilihSemua(".book-card");

      semuaCard.forEach(function (card) {
        const kategoriBuku = card
          .querySelector(".book-tag")
          .textContent.toLowerCase();

        if (kategoriDipilih === "semua" || kategoriDipilih === kategoriBuku) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// koleksi buku
function tampilkanHalamanKoleksi() {
  const container = pilih("#koleksiGrid");

  if (!container) {
    return;
  }

  let data = ambilDataBuku().filter(function (buku) {
    const cocokKategori =
      filterKoleksi === "Semua" || buku.kategori === filterKoleksi;
    const cocokKeyword =
      buku.judul.toLowerCase().includes(keywordKoleksi.toLowerCase()) ||
      buku.penulis.toLowerCase().includes(keywordKoleksi.toLowerCase());

    return cocokKategori && cocokKeyword;
  });

  if (sortKoleksi === "Terlama") {
    data.sort(function (a, b) {
      return Number(a.tahun) - Number(b.tahun);
    });
  }

  if (sortKoleksi === "Terbaru") {
    data.sort(function (a, b) {
      return Number(b.tahun) - Number(a.tahun);
    });
  }

  if (sortKoleksi === "Stok Terbanyak") {
    data.sort(function (a, b) {
      return Number(b.stok) - Number(a.stok);
    });
  }

  if (sortKoleksi === "Terpopuler") {
    data.sort(function (a, b) {
      return (
        Number(String(b.pembaca).replace(/\D/g, "")) -
        Number(String(a.pembaca).replace(/\D/g, ""))
      );
    });
  }

  if (data.length === 0) {
    container.innerHTML = `
      <div class="profile-empty-state">
        Buku tidak ditemukan.
      </div>
    `;
    return;
  }

  tampilkanBuku("#koleksiGrid", data);
}

function aktifkanFiturKoleksi() {
  if (namaHalamanAktif() !== "koleksi.html") {
    return;
  }

  const formSearch = pilih(".toolbar-search");
  const inputSearch = formSearch ? formSearch.querySelector("input") : null;
  const selectSort = pilih("#sort");
  const kategoriChips = pilihSemua(".category-chip");

  if (formSearch && inputSearch) {
    formSearch.addEventListener("submit", function (event) {
      event.preventDefault();
      keywordKoleksi = inputSearch.value.trim();
      tampilkanHalamanKoleksi();
    });

    inputSearch.addEventListener("input", function () {
      keywordKoleksi = inputSearch.value.trim();
      tampilkanHalamanKoleksi();
    });
  }

  if (selectSort) {
    selectSort.addEventListener("change", function () {
      sortKoleksi = selectSort.value;
      tampilkanHalamanKoleksi();
    });
  }

  kategoriChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      kategoriChips.forEach(function (item) {
        item.classList.remove("active");
      });

      chip.classList.add("active");
      filterKoleksi = chip.textContent.trim();
      tampilkanHalamanKoleksi();
    });
  });

  tampilkanHalamanKoleksi();
}

// detail buku
function tampilkanDetailBuku() {
  const detailJudul = pilih("#detailJudul");

  if (!detailJudul) {
    return;
  }

  // elemen ini dibuat agar halama detail hanya menampilkan informasi satu buku
  if (pilih("#koleksiGrid")) {
    pilih("#koleksiGrid").innerHTML = "";
  }

  const parameterUrl = new URLSearchParams(window.location.search);
  const idBuku = parameterUrl.get("id");

  const buku = ambilDataBuku().find(function (item) {
    return item.id === idBuku;
  });

  if (!buku) {
    detailJudul.textContent = "Buku tidak ditemukan";

    if (pilih("#detailSinopsis")) {
      pilih("#detailSinopsis").textContent =
        "Data buku tidak tersedia atau alamat detail tidak sesuai.";
    }

    return;
  }

  pilih("#detailGambar").src = pathGambar(buku.gambar);
  pilih("#detailGambar").alt = buku.judul;
  pilih("#detailKategori").textContent = buku.kategori;
  pilih("#detailJudul").textContent = buku.judul;
  pilih("#detailPenulis").textContent = buku.penulis;
  pilih("#detailRak").textContent = buku.rak;
  pilih("#detailStatus").textContent = buku.status;
  pilih("#detailStok").textContent = "Stok " + buku.stok;
  pilih("#detailSinopsis").textContent = buku.sinopsis;
  pilih("#detailTahun").textContent = buku.tahun;
  pilih("#detailPembaca").textContent = buku.pembaca;
  pilih("#detailRakInfo").textContent = buku.rak;
  pilih("#detailStatusInfo").textContent = buku.status;

  if (pilih("#detailJenis")) {
    pilih("#detailJenis").textContent = buku.jenis;
  }

  if (pilih("#detailTagList")) {
    pilih("#detailTagList").innerHTML = buku.tag
      .map(function (tag) {
        return `<span class="detail-tag">${tag}</span>`;
      })
      .join("");
  }

  if (pilih("#detailKarakteristik")) {
    pilih("#detailKarakteristik").innerHTML = buku.karakteristik
      .map(function (isi) {
        return `<li>${isi}</li>`;
      })
      .join("");
  }

  const tombolPinjam = pilih("#btnPinjamDetail");

  if (tombolPinjam) {
    tombolPinjam.addEventListener("click", function (event) {
      event.preventDefault();

      if (buku.status.toLowerCase() !== "tersedia" || buku.stok <= 0) {
        tampilkanPesan("Buku sedang dipinjam dan belum tersedia.", "warning");
        return;
      }

      window.location.href = "peminjaman.html?buku=" + buku.id;
    });
  }
}

// form peminjaman
function isiTanggalHariIni() {
  const inputTanggal = pilih("#tanggal");

  if (!inputTanggal) {
    return;
  }

  inputTanggal.value = tanggalHariIni();
  isiPreviewTanggalKembali();
}

function isiPreviewTanggalKembali() {
  const inputTanggal = pilih("#tanggal");
  const preview = pilih("#tanggalKembaliPreview");

  if (!inputTanggal || !preview) {
    return;
  }

  if (!inputTanggal.value) {
    preview.value = "";
    return;
  }

  preview.value = formatTanggal(
    tambahHari(inputTanggal.value, aturanPinjam.durasiPinjamHari)
  );
}

function isiFormUserLogin() {
  const inputNama = pilih("#nama");
  const inputNim = pilih("#nim");

  if (!inputNama || !inputNim) {
    return;
  }

  const user = ambilDataUser();

  inputNama.value = user.nama;
  inputNim.value = user.nim;
}

function cariBukuTersedia(keyword, kategori) {
  return ambilDataBuku().filter(function (buku) {
    const cocokJudul = buku.judul.toLowerCase().includes(keyword.toLowerCase());
    const cocokKategori = kategori === "Semua" || buku.kategori === kategori;
    const bukuTersedia =
      buku.status.toLowerCase() === "tersedia" && buku.stok > 0;

    return cocokJudul && cocokKategori && bukuTersedia;
  });
}

function aktifkanSaranBuku() {
  const inputJudul = pilih("#judul");
  const inputKategori = pilih("#kategori");
  const saranList = pilih("#saranBukuList");

  if (!inputJudul || !inputKategori || !saranList) {
    return;
  }

  function tampilkanSaran() {
    const keyword = inputJudul.value.trim();
    const kategori = inputKategori.value;

    idBukuDipilih = null;

    if (!keyword) {
      saranList.innerHTML = `
        <div class="saran-buku-kosong">
          Ketik judul buku untuk melihat saran buku yang tersedia.
        </div>
      `;
      saranList.classList.add("show");
      return;
    }

    const hasilBuku = cariBukuTersedia(keyword, kategori);

    if (hasilBuku.length === 0) {
      saranList.innerHTML = `
        <div class="saran-buku-kosong">
          Buku tidak ditemukan atau sedang tidak tersedia.
        </div>
      `;
      saranList.classList.add("show");
      return;
    }

    saranList.innerHTML = hasilBuku
      .map(function (buku) {
        return `
          <button
            type="button"
            class="saran-buku-item"
            onclick="pilihBukuPeminjaman('${buku.id}')"
          >
            <strong>${buku.judul}</strong>
            <span>${buku.kategori} • ${buku.rak} • Stok ${buku.stok}</span>
          </button>
        `;
      })
      .join("");

    saranList.classList.add("show");
  }

  inputJudul.addEventListener("input", tampilkanSaran);

  inputJudul.addEventListener("focus", function () {
    if (inputJudul.value.trim()) {
      tampilkanSaran();
    }
  });

  inputKategori.addEventListener("change", function () {
    inputJudul.value = "";
    idBukuDipilih = null;
    saranList.innerHTML = "";
    saranList.classList.remove("show");
  });

  document.addEventListener("click", function (event) {
    if (
      !inputJudul.contains(event.target) &&
      !saranList.contains(event.target)
    ) {
      saranList.classList.remove("show");
    }
  });
}

function pilihBukuPeminjaman(idBuku) {
  const buku = ambilDataBuku().find(function (item) {
    return item.id === idBuku;
  });

  if (!buku) {
    tampilkanPesan("Data buku tidak ditemukan.", "error");
    return;
  }

  if (buku.status.toLowerCase() !== "tersedia" || buku.stok <= 0) {
    tampilkanPesan("Buku sedang tidak tersedia untuk dipinjam.", "warning");
    return;
  }

  idBukuDipilih = buku.id;

  pilih("#judul").value = buku.judul;
  pilih("#kategori").value = buku.kategori;

  if (pilih("#saranBukuList")) {
    pilih("#saranBukuList").innerHTML = "";
    pilih("#saranBukuList").classList.remove("show");
  }

  tampilkanPesan("Buku berhasil dipilih.", "success");
}

function isiFormDariDetailBuku() {
  const inputJudul = pilih("#judul");
  const inputKategori = pilih("#kategori");

  if (!inputJudul) {
    return;
  }

  const parameterUrl = new URLSearchParams(window.location.search);
  const idBuku = parameterUrl.get("buku");

  if (!idBuku) {
    return;
  }

  const buku = dataBukuWebsite.find(function (item) {
    return item.id === idBuku;
  });

  if (!buku) {
    tampilkanPesan("Data buku tidak ditemukan.", "error");
    return;
  }

  idBukuDipilih = buku.id;
  inputJudul.value = buku.judul;

  if (inputKategori) {
    inputKategori.value = buku.kategori;
  }
}

function tampilkanInfoAturanPeminjaman() {
  if (pilih("#loanDurasiInfo")) {
    pilih("#loanDurasiInfo").textContent =
      aturanPinjam.durasiPinjamHari + " Hari";
  }

  if (pilih("#loanDendaInfo")) {
    pilih("#loanDendaInfo").textContent =
      formatRupiah(aturanPinjam.dendaPerHari) + " / Hari";
  }

  if (pilih("#loanTimerInfo")) {
    pilih("#loanTimerInfo").textContent =
      aturanPinjam.timerPersetujuanDetik + " Detik";
  }

  if (pilih("#loanMaksimalInfo")) {
    const user = ambilDataUser();
    const batas =
      user.level >= aturanPinjam.levelBonusPinjam
        ? aturanPinjam.batasPinjamLevelSepuluh
        : aturanPinjam.batasPinjamLevelAwal;

    pilih("#loanMaksimalInfo").textContent = batas + " Buku";
  }
}

function bolehMengajukanPeminjaman(nim) {
  const dataPeminjaman = ambilDataPeminjaman();

  const user = ambilDataAkun().find(function (akun) {
    return akun.nim === nim;
  });

  const pinjamanAktif = dataPeminjaman.filter(function (item) {
    return item.nim === nim && item.status !== statusPinjam.selesai;
  });

  const adaDenda = dataPeminjaman.some(function (item) {
    return item.nim === nim && item.denda > 0;
  });

  const batasPinjam =
    user && user.level >= aturanPinjam.levelBonusPinjam
      ? aturanPinjam.batasPinjamLevelSepuluh
      : aturanPinjam.batasPinjamLevelAwal;

  if (adaDenda) {
    return {
      boleh: false,
      pesan: "Bayar denda terlebih dahulu sebelum meminjam buku baru.",
    };
  }

  if (pinjamanAktif.length >= batasPinjam) {
    return {
      boleh: false,
      pesan: "Selesaikan peminjaman aktif terlebih dahulu.",
    };
  }

  return {
    boleh: true,
    pesan: "",
  };
}

function aktifkanFormPeminjaman() {
  const form = pilih("#formPeminjaman");

  if (!form) {
    return;
  }

  isiTanggalHariIni();
  isiFormUserLogin();
  isiFormDariDetailBuku();
  tampilkanInfoAturanPeminjaman();

  const inputTanggal = pilih("#tanggal");

  if (inputTanggal) {
    inputTanggal.addEventListener("change", isiPreviewTanggalKembali);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = pilih("#nama").value.trim();
    const nim = pilih("#nim").value.trim();
    const judul = pilih("#judul").value.trim();
    const kategori = pilih("#kategori").value;
    const tanggal = pilih("#tanggal").value;

    if (!nama || !nim || !judul || !tanggal) {
      tampilkanPesan("Lengkapi data peminjaman terlebih dahulu.", "warning");
      return;
    }

    if (nim.length < 8) {
      tampilkanPesan("NIM minimal berisi 8 karakter.", "warning");
      return;
    }

    let bukuDipinjam = null;

    if (idBukuDipilih) {
      bukuDipinjam = ambilDataBuku().find(function (buku) {
        return buku.id === idBukuDipilih;
      });
    }

    if (!bukuDipinjam) {
      bukuDipinjam = ambilDataBuku().find(function (buku) {
        const judulSama = buku.judul.toLowerCase() === judul.toLowerCase();
        const kategoriSama = kategori === "Semua" || buku.kategori === kategori;

        return judulSama && kategoriSama;
      });
    }

    if (!bukuDipinjam) {
      tampilkanPesan("Buku tidak ditemukan di data perpustakaan.", "warning");
      return;
    }

    if (
      bukuDipinjam.status.toLowerCase() !== "tersedia" ||
      bukuDipinjam.stok <= 0
    ) {
      tampilkanPesan("Buku sedang tidak tersedia untuk dipinjam.", "warning");
      return;
    }

    if (idEditPeminjaman) {
      updateDataPeminjaman(nama, nim, bukuDipinjam, tanggal);
      return;
    }

    const cekPeminjaman = bolehMengajukanPeminjaman(nim);

    if (!cekPeminjaman.boleh) {
      tampilkanPesan(cekPeminjaman.pesan, "warning");
      return;
    }

    const dataPeminjaman = ambilDataPeminjaman();

    const dataBaru = {
      id: Date.now(),
      nama: nama,
      nim: nim,
      idBuku: bukuDipinjam.id,
      judul: bukuDipinjam.judul,
      kategori: bukuDipinjam.kategori,
      tanggalPinjam: tanggal,
      tanggalKembali: tambahHari(tanggal, aturanPinjam.durasiPinjamHari),
      status: statusPinjam.menunggu,
      denda: 0,
      bolehKembali: false,
      waktuDibuat: Date.now(),
      waktuDisetujui: null,
      tanggalSelesai: null,
      notifTerlambat: false,
      pengembalianSudahDihitung: false,
      peminjamanSudahDihitung: false,
      stokSudahDikurangi: false,
      ...buatDataReviewAwal(),
    };

    dataPeminjaman.push(dataBaru);
    simpanDataPeminjaman(dataPeminjaman);

    form.reset();
    idBukuDipilih = null;
    isiTanggalHariIni();
    isiFormUserLogin();

    tampilkanTabelPeminjaman();
    tampilkanPesan("Pengajuan peminjaman berhasil dikirim.", "success");
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      idEditPeminjaman = null;
      idBukuDipilih = null;

      if (pilih("#btnSimpanPeminjaman")) {
        pilih("#btnSimpanPeminjaman").textContent = "Kirim Peminjaman";
      }

      isiTanggalHariIni();
      isiFormUserLogin();

      if (pilih("#saranBukuList")) {
        pilih("#saranBukuList").innerHTML = "";
        pilih("#saranBukuList").classList.remove("show");
      }
    }, 0);
  });
}

function updateDataPeminjaman(nama, nim, bukuDipinjam, tanggal) {
  const dataPeminjaman = ambilDataPeminjaman();

  dataPeminjaman.forEach(function (item) {
    if (item.id === idEditPeminjaman && item.status === statusPinjam.menunggu) {
      item.nama = nama;
      item.nim = nim;
      item.idBuku = bukuDipinjam.id;
      item.judul = bukuDipinjam.judul;
      item.kategori = bukuDipinjam.kategori;
      item.tanggalPinjam = tanggal;
      item.tanggalKembali = tambahHari(tanggal, aturanPinjam.durasiPinjamHari);
    }
  });

  simpanDataPeminjaman(dataPeminjaman);

  idEditPeminjaman = null;
  idBukuDipilih = null;

  const form = pilih("#formPeminjaman");

  if (form) {
    form.reset();
  }

  if (pilih("#btnSimpanPeminjaman")) {
    pilih("#btnSimpanPeminjaman").textContent = "Kirim Peminjaman";
  }

  isiTanggalHariIni();
  isiFormUserLogin();
  tampilkanTabelPeminjaman();
  tampilkanPesan("Data peminjaman berhasil diperbarui.", "success");
}

// update status otomatis
function perbaruiStatusPeminjaman() {
  const dataPeminjaman = ambilDataPeminjaman();
  let adaPerubahan = false;

  dataPeminjaman.forEach(function (item) {
    lengkapiDataReview(item);

    const sekarang = Date.now();

    if (item.status === statusPinjam.menunggu) {
      const waktuDibuat = item.waktuDibuat || sekarang;
      const selisihDetik = Math.floor((sekarang - waktuDibuat) / 1000);

      if (selisihDetik >= aturanPinjam.timerPersetujuanDetik) {
        item.status = statusPinjam.dipinjam;
        item.waktuDisetujui = sekarang;
        item.tanggalKembali = tambahHari(
          item.tanggalPinjam,
          aturanPinjam.durasiPinjamHari
        );

        // stok buku berkurang setelah peminjaman disetujui
        if (!item.stokSudahDikurangi) {
          kurangiStokBuku(item.idBuku);
          item.stokSudahDikurangi = true;
        }
        const dataAkun = ambilDataAkun();
        const indexUser = dataAkun.findIndex(function (akun) {
          return akun.nim === item.nim;
        });

        if (indexUser !== -1) {
          dataAkun[indexUser].totalPeminjaman += 1;
          dataAkun[indexUser].totalExp += aturanPoin.peminjamanDisetujui;
          dataAkun[indexUser].level = hitungLevel(dataAkun[indexUser].totalExp);
          simpanDataAkun(dataAkun);
        }

        adaPerubahan = true;
      }
    }

    if (
      item.status === statusPinjam.dipinjam ||
      item.status === statusPinjam.terlambat
    ) {
      const hariIni = new Date(tanggalHariIni() + "T00:00:00");
      const tanggalKembali = new Date(item.tanggalKembali + "T00:00:00");

      const selisihHari = Math.floor(
        (hariIni - tanggalKembali) / (1000 * 60 * 60 * 24)
      );

      if (selisihHari > 0) {
        item.status = statusPinjam.terlambat;
        item.denda = selisihHari * aturanPinjam.dendaPerHari;
        item.notifTerlambat = true;
        adaPerubahan = true;
      }
    }

    if (
      item.statusReview === statusReview.menunggu &&
      item.waktuReviewDikirim
    ) {
      const selisihValidasi = Math.floor(
        (sekarang - item.waktuReviewDikirim) / 1000
      );

      if (
        selisihValidasi >= aturanReview.timerValidasiDetik &&
        !item.reviewSudahDihitung
      ) {
        const diterima = Math.random() <= aturanReview.peluangDiterima;

        if (diterima) {
          item.statusReview = statusReview.diterima;
          item.expReview = aturanPoin.reviewDiterima;
        } else {
          item.statusReview = statusReview.ditolak;
          item.expReview = aturanPoin.reviewDitolak;
        }

        item.waktuHasilReview = sekarang;
        item.reviewSudahDihitung = true;

        tambahExpKeUser(item.nim, item.expReview);
        adaPerubahan = true;
      }
    }

    if (
      item.status === statusPinjam.selesai &&
      item.statusReview === statusReview.belum &&
      item.deadlineReview
    ) {
      const hariIni = new Date(tanggalHariIni() + "T00:00:00");
      const deadline = new Date(item.deadlineReview + "T00:00:00");

      if (hariIni > deadline && !item.reviewSudahDihitung) {
        item.statusReview = statusReview.kadaluarsa;
        item.expReview = aturanPoin.reviewKadaluarsa;
        item.reviewSudahDihitung = true;
        item.waktuHasilReview = sekarang;

        tambahExpKeUser(item.nim, item.expReview);
        adaPerubahan = true;
      }
    }
  });

  if (adaPerubahan) {
    simpanDataPeminjaman(dataPeminjaman);
  }
}

// tabel peminjaman
function tentukanClassStatusPeminjaman(status) {
  if (status === statusPinjam.menunggu) {
    return "waiting";
  }

  if (status === statusPinjam.dipinjam) {
    return "active";
  }

  if (status === statusPinjam.terlambat || status === statusPinjam.denda) {
    return "late";
  }

  if (status === statusPinjam.selesai) {
    return "done";
  }

  return "active";
}

function buatTombolReview(item) {
  if (item.statusReview === statusReview.belum) {
    return `
      <a href="review.html?id=${item.id}" class="btn-loan-action btn-loan-return">
        Review Buku
      </a>
    `;
  }

  if (
    item.statusReview === statusReview.menunggu ||
    item.statusReview === statusReview.diterima ||
    item.statusReview === statusReview.ditolak
  ) {
    return `
      <a href="review.html?id=${item.id}" class="btn-loan-action btn-loan-edit">
        Lihat Review
      </a>
    `;
  }

  if (item.statusReview === statusReview.kadaluarsa) {
    return `
      <button type="button" class="btn-loan-action" disabled>
        Review Kadaluarsa
      </button>
    `;
  }

  return "";
}

function buatTombolAksiPeminjaman(item) {
  if (item.status === statusPinjam.menunggu) {
    return `
      <button type="button" class="btn-loan-action btn-loan-edit" onclick="editPeminjaman(${item.id})">
        Edit
      </button>

      <button type="button" class="btn-loan-action btn-loan-cancel" onclick="batalkanPeminjaman(${item.id})">
        Batal
      </button>
    `;
  }

  if (
    item.status === statusPinjam.dipinjam ||
    item.status === statusPinjam.terlambat
  ) {
    if (!item.bolehKembali) {
      return `
        <button type="button" class="btn-loan-action btn-loan-validate" onclick="validasiPengembalian(${item.id})">
          Validasi
        </button>
      `;
    }

    return `
      <button type="button" class="btn-loan-action btn-loan-return" onclick="kembalikanBuku(${item.id})">
        Kembalikan
      </button>
    `;
  }

  if (item.status === statusPinjam.denda) {
    return `
      <button type="button" class="btn-loan-action btn-loan-fine" onclick="bayarDenda(${item.id})">
        Bayar Denda
      </button>
    `;
  }

  if (item.status === statusPinjam.selesai) {
    return buatTombolReview(item);
  }

  return "-";
}

// mengaktifkan klik pada baris tabel peminjaman
function aktifkanKlikBarisPeminjaman() {
  const semuaBaris = pilihSemua(".loan-v2-row");

  semuaBaris.forEach(function (baris) {
    baris.addEventListener("click", function (event) {
      // agar tombol aksi tidak ikut mengisi form
      if (event.target.closest(".loan-v2-action-group")) {
        return;
      }

      const id = Number(baris.dataset.id);
      isiFormDariTabel(id);
    });
  });
}

// mengisi form saat baris tabel diklik
function isiFormDariTabel(id) {
  const dataPeminjaman = ambilDataPeminjaman();

  const dataDipilih = dataPeminjaman.find(function (item) {
    return item.id === id;
  });

  if (!dataDipilih) {
    tampilkanPesan("Data peminjaman tidak ditemukan.", "error");
    return;
  }

  idBukuDipilih = dataDipilih.idBuku || null;

  if (pilih("#nama")) pilih("#nama").value = dataDipilih.nama;
  if (pilih("#nim")) pilih("#nim").value = dataDipilih.nim;
  if (pilih("#kategori")) pilih("#kategori").value = dataDipilih.kategori;
  if (pilih("#judul")) pilih("#judul").value = dataDipilih.judul;
  if (pilih("#tanggal")) pilih("#tanggal").value = dataDipilih.tanggalPinjam;

  isiPreviewTanggalKembali();

  if (dataDipilih.status === statusPinjam.menunggu) {
    idEditPeminjaman = id;

    if (pilih("#btnSimpanPeminjaman")) {
      pilih("#btnSimpanPeminjaman").textContent = "Simpan Perubahan";
    }

    tampilkanPesan("Data peminjaman dipindahkan ke form untuk diedit.", "info");
  } else {
    idEditPeminjaman = null;

    if (pilih("#btnSimpanPeminjaman")) {
      pilih("#btnSimpanPeminjaman").textContent = "Kirim Peminjaman";
    }

    tampilkanPesan("Data berhasil ditampilkan ke form.", "info");
  }

  const formPeminjaman = pilih("#formPeminjaman");

  if (formPeminjaman) {
    formPeminjaman.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function tampilkanTabelPeminjaman() {
  const tabelBody = pilih("#tabelPeminjamanBody");

  if (!tabelBody) {
    return;
  }

  perbaruiStatusPeminjaman();

  const dataPeminjaman = ambilPeminjamanUserAktif();

  if (dataPeminjaman.length === 0) {
    tabelBody.innerHTML = `
      <tr>
        <td colspan="8" class="table-empty">
          Belum ada data peminjaman.
        </td>
      </tr>
    `;
    return;
  }

  tabelBody.innerHTML = dataPeminjaman
    .map(function (item, index) {
      lengkapiDataReview(item);

      const statusClass = tentukanClassStatusPeminjaman(item.status);
      const dendaText =
        item.denda && item.denda > 0 ? formatRupiah(item.denda) : "Rp 0";
      const dendaClass =
        item.denda && item.denda > 0 ? "loan-v2-fine" : "loan-v2-fine empty";

      return `
        <tr class="loan-v2-row" data-id="${item.id}">
          <td><span class="loan-v2-number">${index + 1}</span></td>

          <td>
            <div class="loan-v2-book-title">${item.judul}</div>
          </td>

          <td>
            <span class="loan-v2-category">${item.kategori}</span>
          </td>

          <td>
            <span class="loan-v2-date">${formatTanggal(
              item.tanggalPinjam
            )}</span>
          </td>

          <td>
            <span class="loan-v2-date">${formatTanggal(
              item.tanggalKembali
            )}</span>
          </td>

          <td>
            <span class="loan-v2-status ${statusClass}">
              ${item.status}
            </span>
          </td>

          <td>
            <span class="${dendaClass}">
              ${dendaText}
            </span>
          </td>

          <td>
            <div class="loan-v2-action-group">
              ${buatTombolAksiPeminjaman(item)}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  aktifkanKlikBarisPeminjaman();
}

function editPeminjaman(id) {
  const dataPeminjaman = ambilDataPeminjaman();

  const dataEdit = dataPeminjaman.find(function (item) {
    return item.id === id;
  });

  if (!dataEdit) {
    tampilkanPesan("Data peminjaman tidak ditemukan.", "error");
    return;
  }

  if (dataEdit.status !== statusPinjam.menunggu) {
    tampilkanPesan("Data yang sudah disetujui tidak bisa diedit.", "warning");
    return;
  }

  idEditPeminjaman = id;
  idBukuDipilih = dataEdit.idBuku || null;

  pilih("#nama").value = dataEdit.nama;
  pilih("#nim").value = dataEdit.nim;
  pilih("#kategori").value = dataEdit.kategori;
  pilih("#judul").value = dataEdit.judul;
  pilih("#tanggal").value = dataEdit.tanggalPinjam;

  isiPreviewTanggalKembali();

  if (pilih("#btnSimpanPeminjaman")) {
    pilih("#btnSimpanPeminjaman").textContent = "Simpan Perubahan";
  }

  tampilkanPesan("Data dipindahkan ke form untuk diedit.", "info");
}

function batalkanPeminjaman(id) {
  tampilkanKonfirmasi(
    "Apakah kamu yakin ingin membatalkan pengajuan ini?",
    function () {
      let dataPeminjaman = ambilDataPeminjaman();

      dataPeminjaman = dataPeminjaman.filter(function (item) {
        return item.id !== id;
      });

      simpanDataPeminjaman(dataPeminjaman);
      tampilkanTabelPeminjaman();
      tampilkanPesan("Pengajuan peminjaman dibatalkan.", "success");
    }
  );
}

function validasiPengembalian(id) {
  tampilkanKonfirmasi(
    "Simulasikan validasi pengembalian dari petugas?",
    function () {
      const dataPeminjaman = ambilDataPeminjaman();

      dataPeminjaman.forEach(function (item) {
        if (item.id === id) {
          item.bolehKembali = true;
        }
      });

      simpanDataPeminjaman(dataPeminjaman);
      tampilkanTabelPeminjaman();
      tampilkanPesan("Pengembalian sudah divalidasi.", "success");
    }
  );
}

function kembalikanBuku(id) {
  const dataPeminjaman = ambilDataPeminjaman();

  dataPeminjaman.forEach(function (item) {
    if (item.id === id) {
      if (!item.bolehKembali) {
        tampilkanPesan("Tunggu validasi petugas terlebih dahulu.", "warning");
        return;
      }

      if (item.denda > 0) {
        item.status = statusPinjam.denda;
        tampilkanPesan(
          "Selesaikan pembayaran denda terlebih dahulu.",
          "warning"
        );
        return;
      }

      item.status = statusPinjam.selesai;
      item.tanggalSelesai = tanggalHariIni();
      item.deadlineReview = tambahHari(
        tanggalHariIni(),
        aturanReview.batasIsiHari
      );
      item.statusReview = statusReview.belum;

      // stok buku bertambah kembali setelah buku dikembalikan
      if (item.stokSudahDikurangi) {
        tambahStokBuku(item.idBuku);
        item.stokSudahDikurangi = false;
      }

      const dataAkun = ambilDataAkun();
      const indexUser = dataAkun.findIndex(function (akun) {
        return akun.nim === item.nim;
      });

      if (indexUser !== -1 && !item.pengembalianSudahDihitung) {
        dataAkun[indexUser].totalDikembalikan += 1;
        dataAkun[indexUser].level = hitungLevel(dataAkun[indexUser].totalExp);
        simpanDataAkun(dataAkun);
        item.pengembalianSudahDihitung = true;
      }

      tampilkanPesan(
        "Pengembalian selesai. Silakan isi review buku.",
        "success"
      );
    }
  });

  simpanDataPeminjaman(dataPeminjaman);
  tampilkanTabelPeminjaman();
  tampilkanProfile();
}

function bayarDenda(id) {
  tampilkanKonfirmasi(
    "Apakah kamu yakin ingin membayar denda ini?",
    function () {
      const dataPeminjaman = ambilDataPeminjaman();

      dataPeminjaman.forEach(function (item) {
        if (item.id === id) {
          item.denda = 0;

          if (item.bolehKembali) {
            item.status = statusPinjam.selesai;
            item.tanggalSelesai = tanggalHariIni();
            item.deadlineReview = tambahHari(
              tanggalHariIni(),
              aturanReview.batasIsiHari
            );
            item.statusReview = statusReview.belum;
          } else {
            item.status = statusPinjam.dipinjam;
          }
        }
      });

      simpanDataPeminjaman(dataPeminjaman);
      tampilkanTabelPeminjaman();
      tampilkanProfile();
      tampilkanPesan("Denda berhasil dibayar.", "success");
    }
  );
}

// profile
function ambilBukuById(idBuku) {
  return ambilDataBuku().find(function (buku) {
    return buku.id === idBuku;
  });
}

function inisialNama(nama) {
  if (!nama) {
    return "PK";
  }

  return nama
    .split(" ")
    .map(function (kata) {
      return kata.charAt(0);
    })
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function tampilkanProfile() {
  const namaProfile = pilih("#profileNama");

  if (!namaProfile) {
    return;
  }

  perbaruiStatusPeminjaman();

  const user = ambilDataUser();
  const dataPeminjaman = ambilPeminjamanUserAktif();

  const totalDenda = dataPeminjaman.reduce(function (total, item) {
    return total + Number(item.denda || 0);
  }, 0);

  const bukuAktif = dataPeminjaman.filter(function (item) {
    return (
      item.status === statusPinjam.dipinjam ||
      item.status === statusPinjam.terlambat ||
      item.status === statusPinjam.denda
    );
  });

  const riwayat = dataPeminjaman.filter(function (item) {
    return item.status === statusPinjam.selesai;
  });

  namaProfile.textContent = user.nama;

  if (pilih("#profileInisial"))
    pilih("#profileInisial").textContent = inisialNama(user.nama);
  if (pilih("#profileNim")) pilih("#profileNim").textContent = user.nim;
  if (pilih("#profileProdi"))
    pilih("#profileProdi").textContent = user.programStudi;
  if (pilih("#profileKunjungan"))
    pilih("#profileKunjungan").textContent = user.totalKunjungan;
  if (pilih("#profilePeminjaman"))
    pilih("#profilePeminjaman").textContent = user.totalPeminjaman;
  if (pilih("#profileDikembalikan"))
    pilih("#profileDikembalikan").textContent = user.totalDikembalikan;
  if (pilih("#profileExp"))
    pilih("#profileExp").textContent = user.totalExp + " EXP";
  if (pilih("#profileLevel"))
    pilih("#profileLevel").textContent = "Level " + user.level;
  if (pilih("#profileDenda"))
    pilih("#profileDenda").textContent = formatRupiah(totalDenda);

  if (pilih("#profileReward")) {
    pilih("#profileReward").textContent =
      user.level >= aturanPinjam.levelBonusPinjam
        ? "Reward Aktif"
        : "Belum Aktif";
  }

  if (pilih("#profileJumlahAktif")) {
    pilih("#profileJumlahAktif").textContent = bukuAktif.length + " Aktif";
  }

  if (pilih("#profileProgressBar")) {
    const persen = Math.min(
      user.totalExp % aturanPoin.expPerLevel,
      aturanPoin.expPerLevel
    );
    pilih("#profileProgressBar").style.width = persen + "%";
  }

  tampilkanBukuAktifProfile(bukuAktif);
  tampilkanRiwayatProfile(riwayat);
}

function tampilkanBukuAktifProfile(dataAktif) {
  const container = pilih("#profileBukuAktifList");

  if (!container) {
    return;
  }

  if (dataAktif.length === 0) {
    container.innerHTML = `
      <div class="profile-empty-state">
        Belum ada buku yang sedang dipinjam.
      </div>
    `;
    return;
  }

  container.innerHTML = dataAktif
    .map(function (item) {
      const buku = ambilBukuById(item.idBuku);

      return `
        <article class="profile-loan-card">
          <div class="profile-loan-cover">
            <img src="${pathGambar(
              buku ? buku.gambar : "pemrograman web dasar.png"
            )}" alt="${item.judul}">
            <span class="profile-due-badge">${formatTanggal(
              item.tanggalKembali
            )}</span>
          </div>

          <div class="profile-loan-info">
            <h3>${item.judul}</h3>
            <p>${item.kategori} • ${item.status}</p>

            <div class="profile-loan-footer">
              <span>${
                item.denda > 0 ? formatRupiah(item.denda) : "Tanpa denda"
              }</span>
              <a href="peminjaman.html">Lihat</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function tampilkanRiwayatProfile(dataRiwayat) {
  const container = pilih("#profileRiwayatList");

  if (!container) {
    return;
  }

  if (dataRiwayat.length === 0) {
    container.innerHTML = `
      <div class="profile-empty-state">
        Belum ada riwayat peminjaman.
      </div>
    `;
    return;
  }

  container.innerHTML = dataRiwayat
    .slice(-4)
    .reverse()
    .map(function (item) {
      const buku = ambilBukuById(item.idBuku);

      return `
        <div class="profile-history-item">
          <img src="${pathGambar(
            buku ? buku.gambar : "pemrograman web dasar.png"
          )}" alt="${item.judul}">

          <div>
            <h3>${item.judul}</h3>
            <p>${item.statusReview} • ${item.expReview || 0} EXP</p>
          </div>

          <span class="profile-history-arrow">›</span>
        </div>
      `;
    })
    .join("");
}

// review buku
function ambilIdReviewDariUrl() {
  const parameterUrl = new URLSearchParams(window.location.search);
  return Number(parameterUrl.get("id") || parameterUrl.get("peminjaman"));
}

function ambilDataReviewAktif() {
  const dataPeminjaman = ambilDataPeminjaman();

  return dataPeminjaman.find(function (item) {
    return item.id === idReviewAktif;
  });
}

function simpanPerubahanReview(itemBaru) {
  const dataPeminjaman = ambilDataPeminjaman();

  const indexData = dataPeminjaman.findIndex(function (item) {
    return item.id === itemBaru.id;
  });

  if (indexData !== -1) {
    dataPeminjaman[indexData] = itemBaru;
    simpanDataPeminjaman(dataPeminjaman);
  }
}

function updateKartuLevelReview() {
  const user = ambilDataUser();
  const expMenujuLevel =
    aturanPoin.expPerLevel - (user.totalExp % aturanPoin.expPerLevel);

  if (pilih("#reviewLevelUser"))
    pilih("#reviewLevelUser").textContent = user.level;
  if (pilih("#reviewGelarLevel"))
    pilih("#reviewGelarLevel").textContent =
      user.level >= 10 ? "Scholar" : "Reader";
  if (pilih("#reviewExpUser"))
    pilih("#reviewExpUser").textContent = user.totalExp;
  if (pilih("#reviewLevelBerikutnya"))
    pilih("#reviewLevelBerikutnya").textContent = user.level + 1;
  if (pilih("#reviewProgressBar"))
    pilih("#reviewProgressBar").style.width =
      (user.totalExp % aturanPoin.expPerLevel) + "%";

  const teksExp = pilih("#reviewExpUser");

  if (teksExp) {
    teksExp.textContent = user.totalExp;
  }
}

function isiInfoReview(item) {
  if (pilih("#reviewJudulBuku"))
    pilih("#reviewJudulBuku").textContent = item.judul;
  if (pilih("#reviewKategoriBuku"))
    pilih("#reviewKategoriBuku").textContent = item.kategori;
  if (pilih("#reviewNamaUser"))
    pilih("#reviewNamaUser").textContent = item.nama;
  if (pilih("#reviewNimUser")) pilih("#reviewNimUser").textContent = item.nim;
}

function aktifkanPreviewReview() {
  const statusMembaca = pilih("#statusMembaca");
  const bagianDibacaGroup = pilih("#bagianDibacaGroup");
  const isiReview = pilih("#isiReview");
  const jumlahKarakter = pilih("#jumlahKarakterReview");
  const statusPreview = pilih("#statusMembacaPreview");

  if (statusMembaca) {
    statusMembaca.addEventListener("change", function () {
      if (statusPreview) {
        statusPreview.textContent = statusMembaca.value || "Belum dipilih";
      }

      if (bagianDibacaGroup) {
        if (statusMembaca.value === "Sebagian") {
          bagianDibacaGroup.classList.remove("hidden");
        } else {
          bagianDibacaGroup.classList.add("hidden");
        }
      }
    });
  }

  if (isiReview && jumlahKarakter) {
    isiReview.addEventListener("input", function () {
      jumlahKarakter.textContent =
        isiReview.value.length + " / " + aturanReview.minimalKarakter;
    });
  }
}

function updateTeksAturanReview() {
  const listAturan = pilih(".review-exp-box-new ul");

  if (!listAturan) {
    return;
  }

  listAturan.innerHTML = `
    <li>Review diterima: ${aturanPoin.reviewDiterima} EXP</li>
    <li>Review ditolak: ${aturanPoin.reviewDitolak} EXP</li>
    <li>Tidak mengisi 3 hari: ${aturanPoin.reviewKadaluarsa} EXP</li>
  `;
}

function modeIsiReview(item) {
  isiInfoReview(item);

  const form = pilih("#formReviewBuku");
  const tombolKirim = pilih('.review-action-new button[type="submit"]');

  if (!form) {
    return;
  }

  if (tombolKirim) {
    tombolKirim.style.display = "block";
  }
}

function modeLihatReview(item) {
  isiInfoReview(item);

  const statusMembaca = pilih("#statusMembaca");
  const bagianDibaca = pilih("#bagianDibaca");
  const bagianDibacaGroup = pilih("#bagianDibacaGroup");
  const judulReview = pilih("#judulReview");
  const isiReview = pilih("#isiReview");
  const jumlahKarakter = pilih("#jumlahKarakterReview");
  const statusPreview = pilih("#statusMembacaPreview");
  const tombolKirim = pilih('.review-action-new button[type="submit"]');

  if (statusMembaca) {
    statusMembaca.value = item.statusMembaca || "";
    statusMembaca.disabled = true;
  }

  if (bagianDibaca) {
    bagianDibaca.value = item.bagianDibaca || "";
    bagianDibaca.readOnly = true;
  }

  if (bagianDibacaGroup && item.statusMembaca === "Sebagian") {
    bagianDibacaGroup.classList.remove("hidden");
  }

  if (judulReview) {
    judulReview.value = item.judulReview || "";
    judulReview.readOnly = true;
  }

  if (isiReview) {
    isiReview.value = item.isiReview || "";
    isiReview.readOnly = true;
  }

  if (jumlahKarakter) {
    jumlahKarakter.textContent =
      (item.isiReview ? item.isiReview.length : 0) + " karakter";
  }

  if (statusPreview) {
    statusPreview.textContent =
      item.statusReview + " • " + (item.expReview || 0) + " EXP";
  }

  if (tombolKirim) {
    tombolKirim.style.display = "none";
  }
}

function modeReviewKadaluarsa(item) {
  isiInfoReview(item);

  const form = pilih("#formReviewBuku");
  const tombolKirim = pilih('.review-action-new button[type="submit"]');

  if (form) {
    form.innerHTML = `
      <div class="profile-empty-state">
        Review buku sudah kadaluarsa karena tidak diisi dalam 3 hari.
        Tidak ada isi review yang bisa ditampilkan.
      </div>
    `;
  }

  if (tombolKirim) {
    tombolKirim.style.display = "none";
  }

  if (pilih("#jumlahKarakterReview")) {
    pilih("#jumlahKarakterReview").textContent = "0 karakter";
  }

  if (pilih("#statusMembacaPreview")) {
    pilih("#statusMembacaPreview").textContent =
      item.statusReview + " • " + (item.expReview || 0) + " EXP";
  }
}

function tampilkanHalamanReview() {
  const form = pilih("#formReviewBuku");

  if (!form) {
    return;
  }

  updateKartuLevelReview();
  updateTeksAturanReview();

  const item = ambilDataReviewAktif();

  if (!item) {
    form.innerHTML = `
      <div class="profile-empty-state">
        Data review tidak ditemukan.
      </div>
    `;
    return;
  }

  lengkapiDataReview(item);

  if (item.status !== statusPinjam.selesai) {
    form.innerHTML = `
      <div class="profile-empty-state">
        Review hanya dapat diisi setelah buku selesai dikembalikan.
      </div>
    `;
    return;
  }

  if (item.statusReview === statusReview.kadaluarsa) {
    modeReviewKadaluarsa(item);
    return;
  }

  if (item.statusReview === statusReview.belum) {
    modeIsiReview(item);
    return;
  }

  modeLihatReview(item);
}

function aktifkanHalamanReview() {
  const form = pilih("#formReviewBuku");

  if (!form) {
    return;
  }

  idReviewAktif = ambilIdReviewDariUrl();

  aktifkanPreviewReview();
  tampilkanHalamanReview();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const item = ambilDataReviewAktif();

    if (!item) {
      tampilkanPesan("Data peminjaman tidak ditemukan.", "error");
      return;
    }

    if (item.statusReview !== statusReview.belum) {
      tampilkanPesan(
        "Review sudah pernah dikirim dan tidak bisa diedit.",
        "warning"
      );
      return;
    }

    const statusMembaca = pilih("#statusMembaca").value;
    const bagianDibaca = pilih("#bagianDibaca").value.trim();
    const judulReview = pilih("#judulReview").value.trim();
    const isiReview = pilih("#isiReview").value.trim();

    if (!statusMembaca || !judulReview || !isiReview) {
      tampilkanPesan("Lengkapi data review terlebih dahulu.", "warning");
      return;
    }

    if (statusMembaca === "Sebagian" && !bagianDibaca) {
      tampilkanPesan(
        "Isi bagian yang sudah dibaca terlebih dahulu.",
        "warning"
      );
      return;
    }

    if (isiReview.length < aturanReview.minimalKarakter) {
      tampilkanPesan(
        "Isi review minimal " + aturanReview.minimalKarakter + " karakter.",
        "warning"
      );
      return;
    }

    item.statusReview = statusReview.menunggu;
    item.statusMembaca = statusMembaca;
    item.bagianDibaca = statusMembaca === "Sebagian" ? bagianDibaca : "";
    item.judulReview = judulReview;
    item.isiReview = isiReview;
    item.tanggalReview = tanggalHariIni();
    item.waktuReviewDikirim = Date.now();
    item.expReview = 0;
    item.reviewSudahDihitung = false;

    simpanPerubahanReview(item);

    tampilkanPesan("Review berhasil dikirim dan menunggu validasi.", "success");
    tampilkanHalamanReview();
  });
}

function refreshHalamanReview() {
  const form = pilih("#formReviewBuku");

  if (!form || !idReviewAktif) {
    return;
  }

  const item = ambilDataReviewAktif();

  if (!item) {
    return;
  }

  if (item.statusReview !== statusReview.belum) {
    tampilkanHalamanReview();
  }

  updateKartuLevelReview();
}

let keywordRiwayat = "";

// menentukan class status riwayat
function classStatusRiwayat(status) {
  if (status === statusPinjam.selesai) {
    return "selesai";
  }

  if (status === statusPinjam.dipinjam || status === statusPinjam.denda) {
    return "aktif";
  }

  if (status === statusPinjam.menunggu) {
    return "menunggu";
  }

  if (status === statusPinjam.terlambat) {
    return "terlambat";
  }

  return "aktif";
}

// menentukan class review riwayat
function classReviewRiwayat(status) {
  if (status === statusReview.diterima) {
    return "diterima";
  }

  if (status === statusReview.ditolak) {
    return "ditolak";
  }

  if (status === statusReview.kadaluarsa) {
    return "kadaluarsa";
  }

  return "belum";
}

// membuat tombol aksi riwayat
function buatAksiRiwayat(item) {
  if (
    item.statusReview === statusReview.diterima ||
    item.statusReview === statusReview.ditolak ||
    item.statusReview === statusReview.menunggu
  ) {
    return `
      <a href="review.html?id=${item.id}" class="riwayat-action">
        Lihat Review
      </a>
    `;
  }

  if (
    item.status === statusPinjam.selesai &&
    item.statusReview === statusReview.belum
  ) {
    return `
      <a href="review.html?id=${item.id}" class="riwayat-action">
        Review Buku
      </a>
    `;
  }

  if (
    item.status === statusPinjam.dipinjam ||
    item.status === statusPinjam.terlambat
  ) {
    return `
      <a href="peminjaman.html" class="riwayat-action">
        Detail
      </a>
    `;
  }

  return `
    <span class="riwayat-action disabled">
      Tidak Ada Review
    </span>
  `;
}

// menampilkan data riwayat dari data peminjaman
function tampilkanHalamanRiwayat() {
  const tabelBody = pilih("#riwayatTableBody");

  if (!tabelBody) {
    return;
  }

  perbaruiStatusPeminjaman();

  const semuaData = ambilPeminjamanUserAktif();

  const dataRiwayat = semuaData.filter(function (item) {
    const judul = item.judul.toLowerCase();
    const kategori = item.kategori.toLowerCase();
    const keyword = keywordRiwayat.toLowerCase();

    return judul.includes(keyword) || kategori.includes(keyword);
  });

  const totalSelesai = semuaData.filter(function (item) {
    return item.status === statusPinjam.selesai;
  }).length;

  const totalAktif = semuaData.filter(function (item) {
    return (
      item.status === statusPinjam.dipinjam ||
      item.status === statusPinjam.denda ||
      item.status === statusPinjam.menunggu
    );
  }).length;

  const totalTerlambat = semuaData.filter(function (item) {
    return item.status === statusPinjam.terlambat;
  }).length;

  if (pilih("#riwayatTotalPinjam")) {
    pilih("#riwayatTotalPinjam").textContent = semuaData.length;
  }

  if (pilih("#riwayatTotalSelesai")) {
    pilih("#riwayatTotalSelesai").textContent = totalSelesai;
  }

  if (pilih("#riwayatTotalAktif")) {
    pilih("#riwayatTotalAktif").textContent = totalAktif;
  }

  if (pilih("#riwayatTotalTerlambat")) {
    pilih("#riwayatTotalTerlambat").textContent = totalTerlambat;
  }

  if (pilih("#riwayatInfoJumlah")) {
    pilih("#riwayatInfoJumlah").textContent =
      "Menampilkan " +
      dataRiwayat.length +
      " dari " +
      semuaData.length +
      " riwayat.";
  }

  if (dataRiwayat.length === 0) {
    tabelBody.innerHTML = `
      <tr>
        <td colspan="7" class="table-empty">
          Data riwayat peminjaman belum tersedia.
        </td>
      </tr>
    `;
    return;
  }

  tabelBody.innerHTML = dataRiwayat
    .map(function (item) {
      const buku = ambilBukuById(item.idBuku);
      const gambar = buku ? buku.gambar : "pemrograman web dasar.png";

      return `
        <tr>
          <td>
            <div class="riwayat-book-info">
              <img src="${pathGambar(gambar)}" alt="${item.judul}" />

              <div>
                <h3>${item.judul}</h3>
                <p>${item.kategori}</p>
              </div>
            </div>
          </td>

          <td>${formatTanggal(item.tanggalPinjam)}</td>
          <td>${formatTanggal(item.tanggalKembali)}</td>

          <td>
            <span class="riwayat-status ${classStatusRiwayat(item.status)}">
              ${item.status}
            </span>
          </td>

          <td>
            <span class="riwayat-review ${classReviewRiwayat(
              item.statusReview
            )}">
              ${item.statusReview}
            </span>
          </td>

          <td>${item.denda > 0 ? formatRupiah(item.denda) : "Rp 0"}</td>

          <td>
            ${buatAksiRiwayat(item)}
          </td>
        </tr>
      `;
    })
    .join("");
}

// mengaktifkan pencarian halaman riwayat
function aktifkanHalamanRiwayat() {
  const formCari = pilih("#formCariRiwayat");
  const inputCari = pilih("#riwayatSearchInput");
  const btnReset = pilih("#btnResetCariRiwayat");

  if (!formCari || !inputCari) {
    return;
  }

  formCari.addEventListener("submit", function (event) {
    event.preventDefault();
    keywordRiwayat = inputCari.value.trim();
    tampilkanHalamanRiwayat();
  });

  inputCari.addEventListener("input", function () {
    keywordRiwayat = inputCari.value.trim();
    tampilkanHalamanRiwayat();
  });

  if (btnReset) {
    btnReset.addEventListener("click", function () {
      inputCari.value = "";
      keywordRiwayat = "";
      tampilkanHalamanRiwayat();
    });
  }

  tampilkanHalamanRiwayat();
}

// notifikasi
function buatDataNotifikasi() {
  const dataPeminjaman = ambilPeminjamanUserAktif();
  const hasilNotifikasi = salinData(dataNotifikasiDefault || []);

  dataPeminjaman.forEach(function (item) {
    if (item.status === statusPinjam.menunggu) {
      hasilNotifikasi.push({
        ikon: "⏳",
        judul: "Peminjaman Menunggu",
        pesan: item.judul + " masih menunggu persetujuan.",
        waktu: "Baru saja",
        dibaca: false,
      });
    }

    if (item.status === statusPinjam.dipinjam) {
      hasilNotifikasi.push({
        ikon: "📚",
        judul: "Buku Sedang Dipinjam",
        pesan:
          item.judul +
          " harus dikembalikan pada " +
          formatTanggal(item.tanggalKembali) +
          ".",
        waktu: "Aktif",
        dibaca: false,
      });
    }

    if (
      item.status === statusPinjam.terlambat ||
      item.status === statusPinjam.denda
    ) {
      hasilNotifikasi.push({
        ikon: "⚠",
        judul: "Peminjaman Terlambat",
        pesan:
          "Ada denda sebesar " +
          formatRupiah(item.denda) +
          " untuk buku " +
          item.judul +
          ".",
        waktu: "Perlu tindakan",
        dibaca: false,
      });
    }

    if (
      item.status === statusPinjam.selesai &&
      item.statusReview === statusReview.belum
    ) {
      hasilNotifikasi.push({
        ikon: "✍",
        judul: "Review Buku Tersedia",
        pesan: "Kamu dapat mengisi review untuk buku " + item.judul + ".",
        waktu: "Deadline " + formatTanggal(item.deadlineReview),
        dibaca: false,
      });
    }

    if (item.statusReview === statusReview.menunggu) {
      hasilNotifikasi.push({
        ikon: "⌛",
        judul: "Review Menunggu Validasi",
        pesan: "Review buku " + item.judul + " sedang menunggu validasi.",
        waktu: "30 detik",
        dibaca: false,
      });
    }

    if (item.statusReview === statusReview.diterima) {
      hasilNotifikasi.push({
        ikon: "✓",
        judul: "Review Diterima",
        pesan:
          "Review buku " +
          item.judul +
          " diterima. EXP bertambah " +
          item.expReview +
          ".",
        waktu: "Selesai",
        dibaca: false,
      });
    }

    if (item.statusReview === statusReview.ditolak) {
      hasilNotifikasi.push({
        ikon: "!",
        judul: "Review Ditolak",
        pesan:
          "Review buku " +
          item.judul +
          " ditolak. EXP bertambah " +
          item.expReview +
          ".",
        waktu: "Selesai",
        dibaca: false,
      });
    }

    if (item.statusReview === statusReview.kadaluarsa) {
      hasilNotifikasi.push({
        ikon: "⛔",
        judul: "Review Kadaluarsa",
        pesan: "Review buku " + item.judul + " tidak diisi dalam 3 hari.",
        waktu: "Kadaluarsa",
        dibaca: false,
      });
    }
  });

  return hasilNotifikasi;
}

// menampilkan isi popup notifikasi
function tampilkanPopupNotifikasi(filter) {
  const notifList = pilih("#notifList");
  const badge = pilih("#notifBadge");

  if (!notifList) {
    return;
  }

  const semuaNotifikasi = buatDataNotifikasi();
  let data = semuaNotifikasi;

  // jumlah notifikasi tetap ditampilkan pada badge
  if (badge) {
    badge.textContent = semuaNotifikasi.length;
    badge.style.display = "inline-flex";
  }

  if (filter === "belum") {
    data = [];
  }

  if (data.length === 0) {
    notifList.innerHTML = `
      <p class="notif-empty">
        Tidak ada notifikasi
      </p>
    `;
    return;
  }

  notifList.innerHTML = data
    .map(function (item) {
      return `
        <div class="notif-item">
          <div class="notif-icon">${item.ikon}</div>

          <div class="notif-content">
            <h3>${item.judul}</h3>
            <p>${item.pesan}</p>
            <small>${item.waktu}</small>
          </div>
        </div>
      `;
    })
    .join("");
}

function aktifkanPopupNotifikasi() {
  const btnNotif = pilih("#btnNotif");
  const popup = pilih("#notifPopup");
  const overlay = pilih("#notifOverlay");
  const btnRefresh = pilih("#btnRefreshNotif");
  const semuaTab = pilihSemua(".notif-tab");

  if (!btnNotif || !popup || !overlay) {
    return;
  }

  btnNotif.addEventListener("click", function () {
    popup.classList.toggle("show");
    overlay.classList.toggle("show");
    btnNotif.classList.toggle("active");

    tampilkanPopupNotifikasi(filterNotifAktif);
  });

  overlay.addEventListener("click", function () {
    popup.classList.remove("show");
    overlay.classList.remove("show");
    btnNotif.classList.remove("active");
  });

  semuaTab.forEach(function (tab) {
    tab.addEventListener("click", function () {
      semuaTab.forEach(function (item) {
        item.classList.remove("active");
      });

      tab.classList.add("active");
      filterNotifAktif = tab.dataset.filter;
      tampilkanPopupNotifikasi(filterNotifAktif);
    });
  });

  if (btnRefresh) {
    btnRefresh.addEventListener("click", function () {
      tampilkanPopupNotifikasi(filterNotifAktif);
    });
  }

  tampilkanPopupNotifikasi("semua");
}

document.addEventListener("DOMContentLoaded", function () {
  cekAksesLogin();
  siapkanDataAwal();
  perbaruiStatusPeminjaman();

  // beranda
  const dataBukuTerbaru = ambilDataBuku();

  tampilkanBuku("#bookTerbaru", dataBukuWebsite.slice(0, 4));
  tampilkanBuku("#bookRekomendasi", dataBukuWebsite.slice(4, 8));
  aktifkanSliderBeranda();
  aktifkanPencarianBeranda();
  aktifkanFilterBeranda();

  // koleksi dan detail
  aktifkanFiturKoleksi();
  tampilkanDetailBuku();

  // auth
  aktifkanRegister();
  aktifkanLogin();
  aktifkanLogout();

  // peminjaman
  aktifkanSaranBuku();
  aktifkanFormPeminjaman();
  tampilkanTabelPeminjaman();

  // profile
  tampilkanProfile();

  // review
  aktifkanHalamanReview();

  // riwayat
  aktifkanHalamanRiwayat();

  // notifikasi
  aktifkanPopupNotifikasi();

  setInterval(function () {
    perbaruiStatusPeminjaman();

    if (pilih("#tabelPeminjamanBody")) {
      tampilkanTabelPeminjaman();
    }

    if (pilih("#profileNama")) {
      tampilkanProfile();
    }

    if (pilih("#notifList")) {
      tampilkanPopupNotifikasi(filterNotifAktif);
    }

    refreshHalamanReview();
  }, 1000);
});
