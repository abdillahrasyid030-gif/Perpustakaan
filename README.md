# 📚 Perpustakaan Kampus

Website **Perpustakaan Kampus** adalah sistem perpustakaan sederhana berbasis web yang digunakan untuk melihat koleksi buku, mengajukan peminjaman, mengembalikan buku, menulis review, mendapatkan EXP, serta melihat riwayat peminjaman.

> ✅ **Untuk demo sistem, langsung gunakan akun dummy di bawah ini.**  
> Website diarahkan agar pengguna masuk melalui halaman **Login** terlebih dahulu sebelum mengakses menu lain.

---

## 🔐 Akun Dummy untuk Simulasi Login

Gunakan akun berikut agar dosen atau penguji bisa langsung mencoba sistem tanpa perlu membuat akun baru terlebih dahulu.

| Nama User       | NIM          | Password  | Cocok untuk Simulasi                                                                     |
| --------------- | ------------ | --------- | ---------------------------------------------------------------------------------------- |
| **Jack Borrow** | `2026000001` | `jack123` | Melihat contoh review diterima, review ditolak, EXP, level, dan riwayat selesai.         |
| **Rani Putri**  | `2026000002` | `rani123` | Melihat contoh peminjaman aktif, peminjaman menunggu persetujuan, dan review kadaluarsa. |

📌 **Catatan penting:**  
Jika data contoh tidak muncul sesuai akun dummy, hapus data `localStorage` pada browser, lalu reload halaman. Setelah itu sistem akan mengambil ulang data awal dari file `data.js`.

---

## 🧭 Gambaran Umum Sistem

Sistem Perpustakaan Kampus dibuat untuk membantu mahasiswa melihat katalog buku yang tersedia di perpustakaan secara lebih mudah. Melalui website ini, mahasiswa tidak perlu mencari buku secara manual dari rak ke rak hanya untuk mengetahui apakah buku yang dibutuhkan tersedia atau tidak. Mahasiswa dapat melihat daftar buku, detail buku, kategori, status ketersediaan, dan stok buku terlebih dahulu melalui halaman website.

Selain itu, sistem ini juga membantu proses peminjaman agar lebih praktis. Mahasiswa dapat mengajukan peminjaman melalui website, lalu sistem akan memproses pengajuan tersebut secara otomatis. Pada simulasi ini, peminjaman akan diterima dalam waktu 30 detik. Setelah pengajuan disetujui, mahasiswa cukup datang ke perpustakaan untuk mengambil buku kepada pustakawan sesuai data peminjaman yang sudah tercatat di sistem.

Data awal sistem disimpan pada file `data.js`, seperti data buku, data akun dummy, aturan peminjaman, aturan EXP, dan contoh data peminjaman. Setelah sistem digunakan, perubahan data akan disimpan sementara di browser menggunakan `localStorage`, misalnya perubahan status peminjaman, stok buku, denda, review, EXP, dan level user.

Sistem ini belum menggunakan backend dan database asli. Oleh karena itu, website ini berfokus pada tampilan antarmuka, struktur halaman, dan simulasi interaksi sistem menggunakan JavaScript. Dengan begitu, sistem ini dapat menjadi gambaran awal bagaimana proses katalog, peminjaman, pengembalian, review, dan riwayat peminjaman dapat berjalan dalam sebuah sistem perpustakaan digital sederhana.

---

## 🎯 Analisis Sistem

### 🔎 Masalah

Beberapa masalah yang ingin disimulasikan melalui sistem ini adalah:

* Mahasiswa sering perlu mencari buku langsung ke perpustakaan tanpa mengetahui terlebih dahulu apakah buku tersebut tersedia atau tidak.
* Pencarian buku secara manual dapat memakan waktu, terutama jika mahasiswa belum mengetahui kategori, judul, atau posisi buku yang ingin dipinjam.
* Mahasiswa membutuhkan cara yang lebih mudah untuk melihat katalog buku sebelum datang ke perpustakaan.
* Proses peminjaman perlu dibuat lebih rapi agar mahasiswa dapat mengajukan peminjaman terlebih dahulu melalui sistem.
* Mahasiswa tetap perlu mengambil buku secara langsung kepada pustakawan setelah peminjaman disetujui.
* Data peminjaman perlu ditampilkan dengan status yang jelas, seperti menunggu persetujuan, sedang dipinjam, terlambat, denda, dan selesai.
* User perlu mengetahui tanggal kembali agar tidak terlambat mengembalikan buku.
* Sistem perlu memberi informasi jika user memiliki denda keterlambatan.
* Setelah membaca buku, user diberi ruang untuk menulis review sebagai bentuk ringkasan atau kesimpulan dari buku yang sudah dibaca.
* Aktivitas membaca dibuat lebih menarik dengan tambahan EXP dan level agar user lebih termotivasi untuk menyelesaikan bacaan dan menulis review.

### 🎯 Tujuan Sistem

Tujuan dibuatnya website Perpustakaan Kampus adalah untuk memudahkan mahasiswa dalam melihat katalog buku dan melakukan pengajuan peminjaman secara lebih praktis. Mahasiswa dapat mengecek informasi buku melalui website terlebih dahulu, sehingga tidak perlu mencari buku dengan susah payah secara manual di perpustakaan.

Website ini juga bertujuan untuk membantu proses peminjaman menjadi lebih tertata. Setelah mahasiswa mengajukan peminjaman dan sistem menerima pengajuan dalam waktu 30 detik, mahasiswa dapat datang ke perpustakaan untuk mengambil buku kepada pustakawan. Dengan alur ini, website berperan sebagai media pencatatan dan simulasi peminjaman, sedangkan proses pengambilan buku tetap dilakukan secara langsung di perpustakaan.

Selain itu, sistem ini juga bertujuan untuk menampilkan riwayat peminjaman, status pengembalian, denda, review buku, serta sistem EXP dan level sebagai fitur tambahan agar penggunaan website terasa lebih interaktif.

### 📌 Kebutuhan Sistem

Berdasarkan masalah dan tujuan tersebut, sistem membutuhkan beberapa fitur utama, yaitu:

* Halaman login dan register agar user dapat masuk ke sistem.
* Halaman beranda sebagai halaman awal setelah login.
* Halaman koleksi untuk menampilkan katalog buku perpustakaan.
* Halaman detail buku untuk melihat informasi lengkap dari buku yang dipilih.
* Halaman peminjaman untuk mengajukan peminjaman buku.
* Sistem persetujuan otomatis dalam waktu 30 detik sebagai simulasi proses verifikasi peminjaman.
* Sistem stok buku yang berkurang setelah peminjaman disetujui dan bertambah kembali setelah buku dikembalikan.
* Sistem pengembalian buku dan perhitungan denda jika terlambat.
* Halaman review buku setelah peminjaman selesai.
* Sistem EXP dan level sebagai bentuk gamifikasi sederhana.
* Halaman profile untuk melihat data user dan ringkasan aktivitas.
* Halaman riwayat untuk melihat seluruh data peminjaman user.
* Halaman aturan untuk menjelaskan ketentuan peminjaman, pengembalian, denda, dan review.
* Notifikasi untuk membantu user mengetahui informasi penting terkait peminjaman dan review.

### ✅ Tujuan

Tujuan dari sistem ini adalah membuat website perpustakaan yang dapat:

- Menampilkan koleksi buku.
- Menampilkan detail buku.
- Memproses pengajuan peminjaman.
- Mengubah status peminjaman secara otomatis.
- Mengatur pengembalian buku dan denda keterlambatan.
- Menyediakan fitur review buku.
- Memberikan EXP dari aktivitas review.
- Menampilkan profile dan riwayat peminjaman user.

### 🧩 Kebutuhan Sistem

Kebutuhan utama yang digunakan dalam sistem ini adalah:

- Halaman login dan register.
- Halaman beranda, koleksi, detail buku, peminjaman, review, profile, riwayat, dan aturan.
- Data buku dan akun awal dari `data.js`.
- Penyimpanan sementara menggunakan `localStorage`.
- Navigasi antar halaman.
- Tampilan responsive untuk desktop dan mobile.
- JavaScript untuk menjalankan interaksi sistem.

---

## 🛠️ Tech Stack yang Digunakan

| Teknologi                 | Kegunaan                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5**                 | Membuat struktur halaman seperti header, navbar, main, section, form, tabel, dan footer.                                           |
| **CSS3**                  | Mengatur tampilan website, warna, layout, card, tombol, tabel, responsive design, dan animasi sederhana.                           |
| **JavaScript**            | Mengatur interaksi sistem seperti login, register, pencarian buku, peminjaman, pengembalian, review, EXP, riwayat, dan notifikasi. |
| **data.js**               | Menyimpan data awal sistem, seperti daftar buku, akun dummy, aturan EXP, dan status sistem.                                        |
| **localStorage**          | Menyimpan perubahan data sementara di browser, seperti akun login, status peminjaman, stok buku, denda, review, EXP, dan level.    |
| **Google Fonts**          | Menggunakan font `Poppins` agar tampilan website lebih rapi dan modern.                                                            |
| **SVG Icon**              | Digunakan untuk icon notifikasi dan profile pada navbar.                                                                           |
| **Browser / Live Server** | Digunakan untuk menjalankan dan menguji website secara lokal.                                                                      |

---

## 🗂️ Struktur Halaman Website

| Halaman           | Fungsi                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `login.html`      | Halaman awal untuk masuk ke sistem.                                                      |
| `register.html`   | Halaman untuk membuat akun baru.                                                         |
| `index.html`      | Halaman beranda yang menampilkan informasi awal, slider, kategori, dan buku rekomendasi. |
| `koleksi.html`    | Halaman untuk melihat seluruh koleksi buku.                                              |
| `detailbuku.html` | Halaman untuk melihat detail buku yang dipilih.                                          |
| `peminjaman.html` | Halaman untuk mengajukan peminjaman, melihat status, validasi, dan pengembalian buku.    |
| `review.html`     | Halaman untuk mengisi atau melihat review buku.                                          |
| `profile.html`    | Halaman untuk melihat data user, level, EXP, peminjaman aktif, dan ringkasan riwayat.    |
| `riwayat.html`    | Halaman untuk melihat seluruh riwayat peminjaman user.                                   |

---

## ⭐ Fitur Utama Sistem

### 🔐 1. Login dan Register

User harus masuk melalui halaman login sebelum menggunakan sistem. Jika belum memiliki akun, user dapat membuat akun baru melalui halaman register. Untuk demo, sistem sudah menyediakan akun dummy agar pengujian bisa langsung dilakukan.

### 🏠 2. Beranda

Beranda menampilkan informasi awal sistem, slider, kategori, dan beberapa buku yang direkomendasikan. Halaman ini menjadi tampilan utama setelah user berhasil login.

### 📖 3. Koleksi Buku

Halaman koleksi menampilkan daftar buku dalam bentuk card. User dapat melihat judul, kategori, penulis, stok, status buku, dan membuka detail buku.

### 📘 4. Detail Buku

Halaman detail buku menampilkan informasi lebih lengkap, seperti gambar buku, sinopsis, kategori, penulis, tahun, rak, stok, status, dan karakteristik buku.

### 📝 5. Peminjaman Buku

User dapat mengajukan peminjaman melalui form. Sistem akan memeriksa data user, buku yang dipilih, stok buku, denda aktif, dan batas peminjaman.

Setelah pengajuan dikirim, status awal peminjaman adalah **Menunggu Persetujuan**.

### ⏱️ 6. Persetujuan Otomatis 30 Detik

Peminjaman buku pada sistem ini menggunakan simulasi persetujuan otomatis. Setelah user mengajukan peminjaman, sistem akan menunggu selama **30 detik**.

Setelah 30 detik, peminjaman otomatis diterima dan status berubah menjadi **Sedang Dipinjam**. Pada saat itu, stok buku akan berkurang satu.

### 🔁 7. Pengembalian Buku

Jika buku sedang dipinjam, user dapat melakukan validasi pengembalian. Setelah pengembalian berhasil, status peminjaman berubah menjadi **Selesai** dan stok buku bertambah kembali.

### 💰 8. Denda Keterlambatan

Jika user terlambat mengembalikan buku, sistem akan menghitung denda sebesar **Rp 1.000 per hari**. User tidak dapat melakukan peminjaman baru jika masih memiliki denda aktif.

### ✍️ 9. Review Buku dan EXP

Setelah buku dikembalikan, user dapat mengisi review buku. Review berisi ringkasan atau kesimpulan dari buku yang sudah dibaca.

Aturan EXP pada sistem:

| Kondisi Review                        |     EXP |
| ------------------------------------- | ------: |
| Review diterima                       | 100 EXP |
| Review ditolak                        |  20 EXP |
| Review tidak diisi sampai batas waktu |  10 EXP |

Review yang dikirim akan divalidasi otomatis dalam **30 detik**. Hasil validasi dibuat secara simulasi, dengan peluang sekitar **80% diterima** dan **20% ditolak**.

### 👤 10. Profile User

Halaman profile menampilkan data user, total EXP, level, jumlah peminjaman, jumlah buku dikembalikan, denda aktif, buku yang sedang dipinjam, dan ringkasan riwayat.

### 📜 11. Riwayat Peminjaman

Halaman riwayat menampilkan seluruh data peminjaman user. Data yang ditampilkan meliputi buku, tanggal pinjam, tanggal kembali, status peminjaman, status review, denda, dan aksi.

### 🔔 12. Notifikasi

Notifikasi ditampilkan melalui icon lonceng pada navbar. Notifikasi digunakan untuk memberi informasi terkait peminjaman, pengembalian, review, dan status aktivitas user.

## 🔄 Alur Sistem

Alur sistem secara umum.

```text
User membuka website
↓
Sistem mengarahkan user ke halaman Login
↓
User login menggunakan akun dummy atau akun register
↓
User masuk ke Beranda
↓
User melihat Koleksi Buku
↓
User membuka Detail Buku
↓
User mengajukan Peminjaman
↓
Status menjadi Menunggu Persetujuan
↓
Setelah 30 detik, peminjaman otomatis diterima
↓
Status berubah menjadi Sedang Dipinjam
↓
Stok buku berkurang
↓
User mengembalikan buku
↓
Status berubah menjadi Selesai
↓
User mengisi review buku
↓
Review divalidasi otomatis
↓
EXP dan level user diperbarui
↓
Data tampil di Profile dan Riwayat
```

## 🚀 Cara Menjalankan Sistem

1. Buka folder project.
2. Jalankan file `index.html` melalui browser atau gunakan **Live Server** di VS Code.
3. Sistem akan mengarahkan user ke halaman login.
4. Login menggunakan salah satu akun dummy.
5. Setelah login berhasil, user dapat mengakses menu website.

> 💡 Disarankan menggunakan browser versi terbaru seperti Google Chrome atau Microsoft Edge agar seluruh fitur berjalan dengan optimal.

---

## 🧹 Cara Reset Data Demo

Karena sistem menggunakan `localStorage`, data dapat berubah setelah beberapa kali digunakan. Jika ingin mengembalikan data ke kondisi awal, lakukan langkah berikut:

1. Buka website di browser.
2. Klik kanan, lalu pilih **Inspect**.
3. Masuk ke tab **Application**.
4. Pilih **Local Storage**.
5. Hapus data website.
6. Reload halaman.

Setelah reload, sistem akan mengambil ulang data awal dari file `data.js`.

---

## 📌 Catatan Pengembangan

Sistem ini masih berbasis frontend. Artinya, data belum tersimpan ke database asli dan belum memiliki backend. Namun, alur yang dibuat sudah menggambarkan proses dasar dari sistem perpustakaan digital, mulai dari login, peminjaman, pengembalian, review, EXP, notifikasi, sampai riwayat peminjaman.

Jika dikembangkan lebih lanjut, sistem ini dapat ditambahkan backend, database, role admin, dashboard petugas, dan laporan peminjaman.

---

## ✅ Kesimpulan

Website **Perpustakaan Kampus** dibuat untuk mensimulasikan sistem perpustakaan digital secara sederhana dan mudah dipahami. Sistem ini tidak hanya menampilkan koleksi buku, tetapi juga memiliki alur peminjaman, persetujuan otomatis 30 detik, pengembalian, denda, review buku, EXP, level, profile, notifikasi, dan riwayat peminjaman.

Dengan alur tersebut, sistem ini sudah cukup untuk digunakan sebagai demonstrasi awal sistem informasi perpustakaan berbasis web.

Proyek ini dikembangkan sebagai media pembelajaran dan implementasi sistem informasi perpustakaan berbasis web menggunakan HTML, CSS, dan JavaScript.