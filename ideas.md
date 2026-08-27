# Arah Desain Undangan Digital

## Tiga pendekatan awal

### 1. Paper Moon Minimal
**Very Brief Intro:** Editorial minimalism yang terinspirasi wabi-sabi Jepang: ruang kosong hangat, kertas serat, tinta arang, dan satu aksen vermilion yang terasa seperti cap pribadi pasangan.

**Probability:** 0.07

### 2. Maré d'Or
**Very Brief Intro:** Coastal modern yang lapang dengan warna pasir, biru laut berkabut, dan detail garis matahari; terasa ringan, dewasa, dan intimate tanpa menjadi tema pantai literal.

**Probability:** 0.03

### 3. Afterglow Nocturne
**Very Brief Intro:** Dark romantic editorial dengan latar espresso, fotografi low-key, aksen tembaga, dan tipografi serif dramatis untuk suasana malam yang sinematik.

**Probability:** 0.09

## Arah yang dipilih: Paper Moon Minimal

### Design Movement
Editorial minimalism berpadu dengan Japanese wabi-sabi kontemporer. Desain merayakan ketidaksempurnaan yang terarah: tekstur kertas, garis tinta, bentuk lingkaran matahari, dan komposisi asimetris yang terasa seperti halaman buku seni.

### Core Principles
1. **Ruang kosong yang bernapas:** Konten diposisikan dengan ritme editorial dan tidak dipadatkan ke dalam kartu seragam.
2. **Hangat, bukan steril:** Ivory, oatmeal, dan arang lembut menjadi dasar; tekstur kertas dan grain halus memberi rasa manusiawi.
3. **Satu aksen yang dikenali:** Vermilion cap menjadi signature brand color, muncul hemat pada tombol, emblem, garis, dan highlight penting.
4. **Gerak setenang membalik halaman:** Animasi memakai opacity, transform, dan timing lembut; tidak ada efek berlebihan yang mengganggu pembacaan.

### Color Philosophy
Ivory hangat (#F4F0E8) menjadi kanvas seperti kertas washi agar halaman terasa intim dan tactile. Charcoal ink (#262623) memberi kontras yang tenang, bukan hitam keras. Oatmeal (#D8CCB9) menambah kedalaman natural pada section alternatif. Vermilion cap (#C6533C) adalah warna milik pasangan: kecil tetapi tegas, seperti stempel pada surat yang hanya ditujukan kepada satu orang.

### Layout Paradigm
Gunakan alur vertikal seperti editorial spread: hero dan section cerita memakai split/asymmetric composition, detail acara menggunakan kolom waktu dan lokasi yang tidak seragam, galeri memakai masonry bervariasi, dan footer menutup halaman dengan bidang lapang. Desktop memiliki garis navigasi tipis yang mengikuti tepi atas; mobile memakai bottom navigation yang menyerupai indeks buku.

### Signature Elements
1. **Sun-disc emblem:** Lingkaran matahari tipis dengan dua garis orbit, digunakan pada cover, header, divider, dan favicon.
2. **Cap vermilion:** Titik aksen vermilion pada tombol, angka section, dan micro-label.
3. **Editorial rule:** Garis tinta tipis serta label kecil uppercase berjarak lebar untuk menandai perpindahan bab.

### Interaction Philosophy
Setiap interaksi terasa seperti menyentuh undangan fisik: tombol memiliki respons tekan singkat, link anchor meluncur lembut, galeri membuka seperti lembar foto yang diangkat, dan aksi salin memberi feedback singkat “Tersalin”. Tidak ada interaksi yang menyembunyikan status atau memaksa pengguna menebak hasilnya.

### Animation
Cover bergerak slide-up selama 720ms dengan easing cubic-bezier(0.77, 0, 0.175, 1), lalu header dan isi muncul berurutan melalui fade-in dan translateY kecil. Section reveal memakai IntersectionObserver dan stagger 60ms untuk anak elemen. Foto masuk dengan opacity, translateY, dan scale 0.98 ke 1. Hover galeri hanya memperbesar 1.025x. Lightbox fade-in cepat sekitar 220ms. Semua gerak non-esensial dinonaktifkan pada `prefers-reduced-motion: reduce`, dan konten langsung terlihat.

### Typography System
- **Display:** Cormorant Garamond, 500–600; dipakai pada nama pasangan, judul bab, dan angka besar countdown.
- **Body:** DM Sans, 400–600; dipakai untuk copy, metadata acara, form, navigasi, dan tombol.
- **Hierarchy:** Micro-label 10–11px uppercase dengan letter-spacing 0.18em; body 15–17px dengan line-height 1.7; section heading clamp 2.4rem–5.6rem dengan leading 0.92; names memakai italic ringan hanya jika membantu nuansa surat personal.

### Brand Essence
**Undangan digital editorial untuk pasangan yang ingin membagikan hari istimewa dengan tenang, personal, dan berkarakter—bukan template yang terasa massal.**

Personality: **intimate, refined, grounded**.

### Brand Voice
Headline, CTA, dan microcopy terdengar hangat, spesifik, dan seperti surat yang ditulis langsung kepada tamu. Hindari filler dan klaim berlebihan.

Contoh:
- “Satu hari, dua nama, dan orang-orang yang membuat perjalanan ini berarti.”
- “Simpan tanggalnya; kami ingin merayakannya bersama Anda.”

### Wordmark & Logo
Logo berupa sun-disc emblem tanpa teks: lingkaran vermilion berongga dengan dua garis orbit charcoal yang tidak simetris sempurna, seolah digambar memakai kuas tipis. Emblem dipakai sebagai simbol pasangan pada cover, header, footer, dan favicon; wordmark nama pasangan dirender terpisah dengan Cormorant Garamond agar tetap mudah diganti.

### Signature Brand Color
**Cap Vermilion — #C6533C.** Warna ini hanya muncul pada titik keputusan penting sehingga mudah dikenali sebagai identitas pasangan, bukan sekadar dekorasi.

## Keputusan implementasi
- Data pasangan disimpan terpusat di `client/src/lib/invitationConfig.ts` dengan placeholder yang jelas.
- Website dibuat frontend-only; RSVP dan buku tamu disimpan sementara di `localStorage` dan diberi penjelasan bahwa belum tersimpan ke server.
- Visual utama dibuat khusus untuk tema ini: satu hero portrait, satu landscape pendukung, empat foto galeri, dan satu emblem PNG transparan.
- Semua section ditulis modular di `client/src/pages/Home.tsx` dan utilitas interaksi dipisahkan bila membantu keterbacaan.
- Tidak ada testimonial, rating, review, atau pesan tamu buatan; buku tamu dimulai dari empty state.
