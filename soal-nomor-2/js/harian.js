var baseUrl = "http://localhost:8000/api/show",
  pengeluaran = 0,
  pemasukkan = 0;

// call api untuk mengisi tabel
fetch(baseUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (resJson) {
    const dateNow = new Date().getDate();
    const dataHarian = resJson.data.filter(
      (val) => new Date(val.tanggal).getUTCDate() === dateNow
    );
    bodyTable(dataHarian);
  });

// menampilkan UI tabel dan seluruh valuenya
function bodyTable(arr) {
  var budgetTrack = document.getElementById("budget-track-harian");
  var isiTabel =
    "<th>Tanggal</th><th>Tipe</th><th>Kategori</th><th>Jumlah</th>";
  var val;
  for (val of arr) {
    isiTabel += `<tr><td>${val.tanggal}</td><td>${val.tipe}</td><td>${val.kategori}</td><td>${val.jumlah}</td></tr>`;
    if (val.tipe === "Pemasukkan") {
      this.pemasukkan += val.jumlah;
    } else {
      this.pengeluaran += val.jumlah;
    }
  }

  // seluruh isi tabel dimasukkan ke tabel
  budgetTrack.innerHTML = isiTabel;

  // memberi informasi jumlah pengeluaran, pemasukkan, dan saldo
  document.getElementById("value-saldo").innerHTML =
    this.pemasukkan - this.pengeluaran;
  document.getElementById("value-pemasukkan").innerHTML = this.pemasukkan;
  document.getElementById("value-pengeluaran").innerHTML = this.pengeluaran;
}
