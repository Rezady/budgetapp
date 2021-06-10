var baseUrl = "http://localhost:8000/api/show",
  pengeluaran = 0,
  pemasukkan = 0;

// call api untuk mengisi tabel
fetch(baseUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (resJson) {
    console.log("Data from api", resJson.data);
    bodyTable(resJson.data);
  });

// menghapus data yang ada di tabel
function deleteData(url) {
  fetch(url, { method: "DELETE" })
    .then((response) => response.json())
    .then((result) => location.reload())
    .catch((error) => console.log("error ", error));
}

// menginput data
function inputData() {
  let formInput = document.getElementById("formInput");
  var formdata = new FormData();
  const tipe = document.getElementById("tipe").value,
    tanggal = document.getElementById("tanggal").value,
    kategori = document.getElementById("kategori").value,
    jumlah = document.getElementById("jumlah").value;
  formdata.append("tanggal", tanggal);
  formdata.append("tipe", tipe);
  formdata.append("kategori", kategori);
  formdata.append("jumlah", jumlah);

  fetch(`http://localhost:8000/api/input`, {
    method: "POST",
    body: formdata,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => location.reload())
    .catch((error) => console.log("error ", error));
}

// menampilkan UI tabel dan seluruh valuenya
function bodyTable(arr) {
  var budgetTrack = document.getElementById("budget-track");
  var isiTabel =
    "<th>Tanggal</th><th>Tipe</th><th>Kategori</th><th>Jumlah</th><th>Delete</th>";
  var val;
  for (val of arr) {
    urlDelete = `http://localhost:8000/api/delete/${val.id}`;
    isiTabel +=
      `<tr><td>${val.tanggal}</td><td>${val.tipe}</td><td>${val.kategori}</td><td>${val.jumlah}</td>` +
      `<td><input type='button' value='delete' onclick=deleteData(urlDelete) class='button-delete'>` +
      `</td></tr>`;
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

var modal = document.getElementById("myModal");

// tombol button untuk membuka modal
var btn = document.getElementById("button-input");

// menyimpan tombol close
var span = document.getElementsByClassName("close")[0];

// membuka modal ketika diklik
btn.onclick = function () {
  modal.style.display = "block";
};

// menutup modal
span.onclick = function () {
  modal.style.display = "none";
};
