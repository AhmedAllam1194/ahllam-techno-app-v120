import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const app = initializeApp(window.AT_FIREBASE_CONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

function $(id){ return document.getElementById(id); }

async function loadOrders(){
  try{
    const qs = await getDocs(collection(db, 'orders'));
    const list = [];
    qs.forEach(d=> list.push({ id:d.id, ...d.data() }));
    if($('k1')) $('k1').textContent = list.length;
    if($('k2')) $('k2').textContent = list.filter(o=>o.status==='pending' || o.status==='جديد' || o.status==='جاري').length;
    if($('k3')) $('k3').textContent = list.filter(o=>o.status==='delivered' || o.status==='تم التسليم').length;
    if($('k4')) $('k4').textContent = list.reduce((s,o)=> s + (Number(o.amount)||0), 0).toFixed(2) + ' د.ك';

    const tb = document.querySelector('#orders-table tbody');
    if(tb){
      tb.innerHTML = '';
      list.forEach(o=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${o.ref||o.id}</td><td>${o.customer||''}</td><td>${o.driver||''}</td><td>${o.vehicle||''}</td><td>${o.status||''}</td><td>${o.amount||0}</td>`;
        tb.appendChild(tr);
      });
    }

    if(window.drawMarkers){ window.drawMarkers(list.filter(o=>o.lat && o.lng)); }
  }catch(e){ console.warn('Orders fetch failed:', e); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  onAuthStateChanged(auth, u=>{ if(u) loadOrders(); });
});
