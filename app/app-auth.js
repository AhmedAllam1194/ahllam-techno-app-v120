// app-auth.js — Username/Password via Firestore 'usernames' collection
import { db } from "./config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const $ = (id) => document.getElementById(id);
const toast = (m) => alert(m);

window.addEventListener('DOMContentLoaded', () => {
  $('loginBtn')?.addEventListener('click', login);
  $('password')?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') login(); });
});

async function login(){
  const username = $('username')?.value?.trim();
  const password = $('password')?.value ?? '';
  if(!username || !password){ return toast('من فضلك أدخل اسم المستخدم وكلمة المرور'); }

  try{
    const ref = doc(db, 'usernames', username);
    const snap = await getDoc(ref);
    if(!snap.exists()){ return toast('المستخدم غير موجود'); }

    const data = snap.data();
    if(String(data.password ?? '') !== String(password)){
      return toast('كلمة المرور غير صحيحة');
    }

    localStorage.setItem('atd_user', JSON.stringify({ username, role: data.role || 'user' }));
    // redirect
    window.location.href = './index.html#home';
  }catch(err){
    console.error(err);
    toast('حصل خطأ في الاتصال بقاعدة البيانات');
  }
}
