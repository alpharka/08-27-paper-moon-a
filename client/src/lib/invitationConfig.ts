// Paper Moon Minimal: data undangan terpusat; ganti nilai objek ini untuk personalisasi.
export const invitationConfig = {
  couple: { first: "Ayu Prameswari", second: "Raka Adinata", nicknames: "Ayu & Raka" },
  parents: "keluarga Prameswari–Adinata",
  date: { iso: "2027-06-19T10:00:00+07:00", label: "19 Juni 2027", day: "Sabtu" },
  events: {
    akad: { time: "09.00 WIB", venue: "Pendopo Aruna", address: "Jl. Senja No. 18, Yogyakarta" },
    reception: { time: "11.30–14.00 WIB", venue: "Pendopo Aruna", address: "Jl. Senja No. 18, Yogyakarta" },
  },
  mapsUrl: "https://maps.google.com/?q=Pendopo+Aruna+Yogyakarta",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_9460f7a96c.mp3?filename=romantic-piano-125152.mp3",
  gift: { ewalletProvider: "DANA", ewalletNumber: "0812 3456 7890", bank: "BCA", accountNumber: "1234567890", recipient: "Ayu Prameswari" },
  story: [
    "Kami bertemu pada sebuah sore yang biasa, lalu percakapan kecil tumbuh menjadi rumah yang selalu ingin kami tuju.",
    "Setelah melewati banyak musim, kami memilih untuk berjalan dalam arah yang sama—dengan doa keluarga dan orang-orang baik di sekeliling kami.",
  ],
} as const;

export type GuestMessage = { name: string; attendance: string; message: string; createdAt: string };
export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", alt: "Buket bunga putih di meja kayu", caption: "Detail kecil yang kami simpan" },
  { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan berdiri dekat jendela dengan cahaya hangat", caption: "Cahaya yang jatuh perlahan" },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85", alt: "Pasangan berjalan bersama di taman", caption: "Menuju bab berikutnya" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", alt: "Mempelai berpelukan dalam cahaya sore", caption: "Tumbuh dengan tenang" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85", alt: "Dekorasi meja pernikahan bernuansa ivory", caption: "Sore yang kami pilih" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85", alt: "Ruang perayaan pernikahan dengan bunga putih", caption: "Tempat janji diucapkan" },
];
