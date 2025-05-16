Migrasi dari PHP API ke Express.js
Ini adalah panduan untuk memigrasi kode API PHP untuk Woodseeker ke Express.js.

Struktur File
Berikut adalah struktur file untuk proyek Express yang baru:

woodseeker-api/
├── config.js # Konfigurasi database
├── db.js # Koneksi database
├── server.js # File utama aplikasi
├── package.json # Dependensi proyek
└── database-schema.sql # Skema database sebagai referensi
Langkah Instalasi
Buat folder baru untuk proyek Express:
bash
mkdir woodseeker-api
cd woodseeker-api
Inisialisasi proyek Node.js dan install dependensi:
bash
npm init -y
npm install express cors express-session bcrypt mysql2
npm install nodemon --save-dev
Salin semua file kode yang telah dibuat ke folder proyek.
Sesuaikan konfigurasi database di config.js.
Jalankan aplikasi:
bash
npm run dev
Perbedaan Utama dengan Versi PHP
Koneksi Database:
PHP: Menggunakan mysqli
Express: Menggunakan mysql2/promise dengan async/await
Autentikasi:
PHP: Menggunakan PHP sessions
Express: Menggunakan express-session
Struktur API:
PHP: Menggunakan switch statement untuk routing
Express: Menggunakan Router Express dan middleware
Penanganan Error:
PHP: Mengembalikan respons error langsung
Express: Menggunakan try-catch blocks dan middleware error
Endpoint API
Semua endpoint API tetap sama seperti versi PHP:

Login: POST /api/login
Products:
GET /api/products - Dapatkan semua produk
POST /api/products - Tambah produk baru
PUT /api/products - Update produk
DELETE /api/products/:id - Hapus produk/pindahkan ke trash
Categories:
GET /api/categories - Dapatkan semua kategori
Trash:
GET /api/trash - Dapatkan semua produk di trash
POST /api/trash - Restore produk dari trash
DELETE /api/trash/:id - Hapus permanen produk dari trash
Catatan Tambahan
Pastikan database MySQL sudah berjalan dan skema database telah dibuat
Ubah kredensial database di file config.js
Pastikan port (3000) tidak digunakan oleh aplikasi lain
