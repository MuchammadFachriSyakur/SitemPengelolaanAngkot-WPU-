let kasAngkotnya = 0;
const btn_toggle = document.querySelector(".navbar .toggle");
//Navbar
btn_toggle.addEventListener("click", (e)=>{
  const ul = document.querySelector(".navbar .nav-link");
  ul.classList.toggle("aktif");
});
//Card Angkot Muncul
const btn_alert_angkot = document.querySelector(".angkot .card_angkot .card_pessenger_list");
btn_alert_angkot.addEventListener("click", (e)=>{
  document.querySelector(".alert_angkot").classList.toggle('aktif');
});
//Tutup Card Angkot yang muncul 
const btn_angkot_close = document.querySelector(".alert_angkot .alert_angkot_content span");
btn_angkot_close.addEventListener("click", (e)=>{
  const alert_angkot = document.querySelector(".alert_angkot");
  alert_angkot.classList.remove('aktif');
});

const penumpang = [];
function detailPenumpang(){
  penumpang;
  penumpang.forEach((angka)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <p class="name">${angka.nama}</p>
      <p class="option">${angka.option}</p>
    `;
    document.querySelector(".alert_angkot .alert_angkot_content .list_user").appendChild(li);
  });
}

const btn_submit_formulir = document.getElementById("submit_formulir_penumpang");

const submit_formulir = (e)=>{
  e.preventDefault();
  const name_pessenger = document.getElementById("name_penumpang");
  const option_destination = document.getElementById("select_destination");
  if(name_pessenger.value === ''){
    alert("Kami Harus Memasukan Nama");
  }else{
    penumpang.push({
      nama: name_pessenger.value,
      option: option_destination.value
    });
    alert('Ditambahkan kekartu destinasi 1');
    detailPenumpang();
  }
  return;
};

btn_submit_formulir.addEventListener("click", submit_formulir);

const btn_turun_angkot = document.getElementById('close_pessenger');

btn_turun_angkot.addEventListener("click", (e)=>{
  e.preventDefault();
  const user_turun = document.getElementById('name_user');
  const bayar = document.getElementById('bayar');
  const kasPenumpang = bayar.value;
  const kasNumber = Number(kasPenumpang);
  if(user_turun.value == '' || kasNumber < 1){
    alert("Bro isi dulu dan jika belum bayar tolong bayar dulu");
    return;
  }else{
    for(let i = 0; i < penumpang.length; i++){
      if(penumpang[i].nama == user_turun.value){
        kasAngkotnya += kasNumber;
        const penumpangYgDiCari =  user_turun.value;
        penumpang.splice(penumpang.indexOf(penumpangYgDiCari), 1 );
        document.querySelector(".alert_angkot .alert_angkot_content .kas").innerHTML  = `
           Kas: Rp ${kasAngkotnya.toLocaleString("id-ID")}
        `;
        const list_user = document.querySelectorAll(".alert_angkot .alert_angkot_content .list_user .name");
        list_user.forEach((e,i)=>{
          if(e.textContent == user_turun.value){
           console.log("Username sama dengan yang anda inputkan,kami akan segera menghapus nama dari list nama penumpang angkot");
          
           console.log(e.parentElement);
           e.parentElement.remove();
          }
        });  
        alert('Penumpang dihapus dari kartu');
      }
    }
  }
});