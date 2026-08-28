# How to Customize — Paper Moon Minimal

Panduan ini menjelaskan cara mengganti isi, visual, dan perilaku website undangan tanpa perlu memindahkan data ke banyak komponen. Struktur saat ini adalah frontend-only React; titik konfigurasi utama berada di `client/src/lib/invitationConfig.ts`.

> Prinsip penting: perlakukan `invitationConfig` sebagai satu-satunya sumber data undangan. Jangan menulis nama, tanggal, rekening, atau alamat baru langsung di banyak komponen karena perubahan akan mudah tidak konsisten.

## 1. Persiapan lokal

Pastikan Node.js dan pnpm tersedia, lalu jalankan perintah berikut dari root repository.

```bash
pnpm install
pnpm dev
```

Buka alamat lokal yang ditampilkan oleh Vite. Untuk pemeriksaan tipe dan build produksi, gunakan:

```bash
pnpm check
pnpm build
```

Perintah `pnpm check` harus selesai tanpa error TypeScript sebelum perubahan disimpan. Build produksi membuat output pada folder `dist/` dan merupakan pemeriksaan terakhir bahwa aplikasi dapat dikompilasi.

## 2. Mengganti data pasangan dan acara

Buka `client/src/lib/invitationConfig.ts`, kemudian sesuaikan objek `invitationConfig`. Contoh struktur data yang perlu diperbarui adalah sebagai berikut.

| Bagian | Properti | Keterangan |
|---|---|---|
| Pasangan | `couple.first` | Nama lengkap mempelai pertama |
| Pasangan | `couple.second` | Nama lengkap mempelai kedua |
| Pasangan | `couple.nicknames` | Nama panggilan yang tampil di header, signature, dan footer |
| Keluarga | `parents` | Nama keluarga yang ingin disebutkan |
| Tanggal | `date.iso` | Waktu acara dalam format ISO dengan offset zona waktu |
| Tanggal | `date.label` | Format tanggal yang dibaca tamu |
| Tanggal | `date.day` | Nama hari acara |
| Acara | `events.akad` | Jam, venue, dan alamat akad |
| Acara | `events.reception` | Jam, venue, dan alamat resepsi |
| Lokasi | `mapsUrl` | URL Google Maps yang dibuka pada tab baru |
| Musik | `musicUrl` | URL file audio instrumental yang dapat diputar browser |
| Tanda kasih | `gift` | Provider, nomor, bank, rekening, dan penerima |

Gunakan `date.iso` sebagai sumber countdown. Pastikan offset `+07:00`, atau offset zona waktu lain yang sesuai dengan lokasi acara, tetap dicantumkan. Nilai `date.label` dan `date.day` hanya mengatur tampilan teks.

Untuk Google Calendar, tanggal acara saat ini dirakit dalam fungsi `calendarUrl()` pada `client/src/pages/Home.tsx`. Jika jadwal aktual berubah, perbarui nilai `start` dan `end` di fungsi tersebut bersama dengan `invitationConfig.date.iso` agar countdown dan kalender tidak berbeda.

## 3. Mengubah copy dan cerita

Paragraf cerita berada pada `invitationConfig.story`, yaitu array berisi dua atau lebih paragraf pendek. Tulis copy yang spesifik untuk pasangan. Hindari kalimat filler, klaim yang tidak dapat diverifikasi, atau teks yang terlalu panjang karena layout dirancang untuk paragraf singkat.

Judul besar seperti “Satu hari, dua nama.” dan “Yang tumbuh menjadi rumah.” berada di `client/src/pages/Home.tsx` karena merupakan bagian dari komposisi editorial. Jika mengganti judul, pertahankan struktur `<br />` dan `<em>` bila ingin mempertahankan hierarchy serif dan aksen vermilion.

## 4. Mengganti foto dan aset visual

Foto galeri didefinisikan dalam array `galleryImages` di `client/src/lib/invitationConfig.ts`. Setiap item harus memiliki `src`, `alt`, dan `caption`.

| Properti | Aturan |
|---|---|
| `src` | Gunakan URL gambar yang dapat diakses publik atau URL storage proyek |
| `alt` | Jelaskan isi foto secara singkat untuk pembaca screen reader |
| `caption` | Teks pendek yang muncul di bawah foto dan lightbox |

Galeri memiliki enam item dan setiap item digunakan satu kali. Pertahankan variasi crop dengan class `gallery-item--1` sampai `gallery-item--6`; class tersebut mengatur komposisi masonry desktop dan dua kolom pada mobile.

Untuk aset besar, simpan file asli di luar folder source, lalu upload menggunakan alur asset storage proyek. Jangan menaruh foto, audio, atau video besar di `client/public/` atau `client/src/assets/` karena dapat memperlambat deployment. Setelah mendapatkan URL storage, masukkan URL tersebut langsung ke `src` atau `musicUrl`.

Hero utama dan foto cerita memakai konstanta `hero` dan `storyImage` di bagian atas `client/src/pages/Home.tsx`. Ganti URL tersebut jika ingin menggunakan foto pasangan yang berbeda. Pastikan foto hero memiliki area yang cukup tenang untuk teks putih, terutama di sisi kiri pada desktop.

Emblem sun-disc adalah simbol brand utama. Versi CSS selalu tersedia melalui class `emblem-mark`, sedangkan aset PNG transparan disiapkan pada URL storage yang dirujuk di konstanta `emblem`. Jika menggunakan emblem gambar final, pertahankan latar transparan dan ukuran persegi agar tidak tampak gepeng pada cover atau favicon.

## 5. Mengganti musik

Ubah `invitationConfig.musicUrl` ke URL file audio instrumental. Browser biasanya hanya mengizinkan playback setelah interaksi pengguna, sehingga musik dimulai ketika tombol **Buka undangan** ditekan. Tombol floating tetap tersedia untuk jeda dan putar ulang.

Gunakan file dengan lisensi yang sesuai untuk penggunaan website. Hindari file yang memerlukan autentikasi, URL yang kedaluwarsa, atau sumber yang memblokir cross-origin playback. Volume awal ditetapkan sekitar 24 persen pada fungsi `openInvitation()`.

## 6. Personalisasi nama tamu melalui URL

Nama tamu dibaca dari parameter query `to`. Contoh URL:

```text
https://domain-anda.example/?to=Keluarga%20Budi%20Santoso
```

Jika parameter tidak ada, cover menampilkan **Tamu undangan**. Nilai dirapikan whitespace-nya dan dipotong maksimal 80 karakter. Nilai dimasukkan sebagai teks biasa melalui React, bukan sebagai HTML, sehingga aman dari injeksi markup.

Sebelum dibagikan, uji tiga kondisi berikut:

| Kondisi | Hasil yang diharapkan |
|---|---|
| Tanpa `?to=` | Menampilkan “Tamu undangan” |
| `?to=Nama%20Tamu` | Menampilkan “Nama Tamu” |
| Nama sangat panjang | Tetap berada dalam layout tanpa merusak cover |

## 7. RSVP dan guestbook

Form RSVP membutuhkan nama dan pesan. Pilihan kehadiran tersedia dalam tiga status: akan hadir, belum bisa memastikan, atau tidak dapat hadir. Setelah submit berhasil, entri baru ditambahkan ke guestbook dan disimpan pada `localStorage` dengan key `paper-moon-guestbook`.

Implementasi ini bersifat **lokal pada browser**. Data RSVP tidak dikirim ke server, tidak muncul di perangkat tamu lain, dan dapat hilang jika storage browser dibersihkan. Empty state sengaja ditampilkan ketika belum ada pesan; jangan menambahkan testimonial, rating, review, atau pesan tamu buatan sebagai data awal.

Jika RSVP perlu dikumpulkan secara nyata, migrasikan penyimpanan ke backend/database. Saat melakukan migrasi, pertahankan state loading, success, dan error; jangan menganggap `localStorage` sebagai sumber data bersama.

## 8. Tanda kasih dan data pembayaran

Perbarui semua properti dalam `invitationConfig.gift` sebelum undangan dibagikan. Tombol salin menggunakan Clipboard API dengan fallback browser dan mengganti label sementara menjadi **Tersalin**.

Periksa digit nomor e-wallet dan rekening secara manual. Jangan membagikan data contoh. Jika QR code pembayaran akan ditambahkan, hasilkan dari payload pembayaran final dan tampilkan provider serta nama penerima yang sama dengan objek `gift`.

## 9. Mengubah tema visual

Arah visual utama didefinisikan di `ideas.md`, sedangkan token warna dan tipografi berada di awal `client/src/index.css`.

| Token | Nilai saat ini | Peran |
|---|---|---|
| `--paper` | `#f4f0e8` | Kanvas ivory hangat |
| `--ink` | `#262623` | Teks dan bidang gelap |
| `--oat` | `#ded5c7` | Bidang oatmeal untuk cerita |
| `--vermilion` | `#c6533c` | Aksen signature dan aksi penting |
| `--serif` | Cormorant Garamond | Display dan nama pasangan |
| `--sans` | DM Sans | Copy, form, metadata, navigasi |

Pertahankan aksen vermilion sebagai “cap”, bukan warna dekoratif di setiap elemen. Bila mengganti font, perbarui import Google Fonts di `client/index.html` dan token `--serif` atau `--sans` secara bersamaan.

## 10. Checklist sebelum publikasi

Sebelum membuat checkpoint, jalankan `pnpm check` dan `pnpm build`. Kemudian periksa perilaku berikut secara manual:

1. Cover menampilkan nama pasangan dan fallback nama tamu.
2. URL `?to=Nama%20Tamu` menampilkan nama tamu yang benar.
3. Tombol Buka undangan menjalankan transisi dan mencoba memutar musik.
4. Countdown menampilkan angka yang berubah setiap detik.
5. Link Google Calendar dan Google Maps membuka URL yang benar.
6. Semua enam foto dapat difokuskan dan dibuka di lightbox.
7. Escape, ArrowLeft, ArrowRight, tombol tutup, serta klik overlay bekerja di lightbox.
8. RSVP kosong ditolak, sedangkan RSVP valid menambah pesan ke guestbook.
9. Tombol salin e-wallet dan rekening menampilkan status “Tersalin”.
10. Konten tidak tertutup navigasi bawah pada mobile.
11. `prefers-reduced-motion: reduce` menampilkan konten tanpa animasi non-esensial.
12. Tidak ada placeholder bracket seperti `[Nama ...]` atau data pembayaran contoh yang tersisa.

## 11. Struktur file penting

| File | Tanggung jawab |
|---|---|
| `client/src/lib/invitationConfig.ts` | Data pasangan, acara, musik, gift, cerita, dan galeri |
| `client/src/pages/Home.tsx` | Cover, section, interaksi, countdown, RSVP, lightbox |
| `client/src/index.css` | Token tema, layout editorial, responsive rules, motion |
| `client/index.html` | Metadata halaman dan font |
| `ideas.md` | Keputusan desain dan prinsip Paper Moon Minimal |
| `docs/HOW-TO-CUSTOMIZE.md` | Panduan kustomisasi ini |

## 12. Alur perubahan yang disarankan

Mulai dari `invitationConfig.ts`, kemudian ganti foto dan musik, lalu sesuaikan copy yang spesifik untuk pasangan. Jalankan pemeriksaan tipe dan build setelah perubahan. Terakhir, uji URL personalisasi pada desktop dan mobile, lalu simpan checkpoint agar perubahan tercatat di repository dan dapat dipulihkan jika diperlukan.

## References

Dokumentasi ini merujuk pada struktur dan perilaku source code repository ini sendiri. Tidak ada data eksternal yang digunakan sebagai sumber faktual.
