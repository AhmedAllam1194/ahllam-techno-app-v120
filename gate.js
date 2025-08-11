
const $ = (s,p=document)=>p.querySelector(s);
const toHex = buf => [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
async function sha256Hex(str){return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)))}
const DB = window.APP_USERS||[];
function saveSession(o){sessionStorage.setItem("AT_SESSION", JSON.stringify({...o,t:Date.now()}))}

function showLogin(){ const o=$("#login-overlay"); if(o){ o.style.display="grid"; $("#username")?.focus(); } }
function hideSplash(){ const s=$("#atd-splash"); if(s){ s.style.display="none"; } }

async function onLogin(e){
  e.preventDefault();
  const u=$("#username").value.trim(); const p=$("#password").value;
  const al=$("#login-alert");
  al.style.display="none";
  if(!u||!p){ al.textContent="من فضلك أدخل اسم المستخدم وكلمة المرور."; al.style.display="block"; return; }
  const h=await sha256Hex(p);
  const f=DB.find(x=>x.u===u && x.h===h);
  if(f){ saveSession(f); window.location.href="./app/"; }
  else{ al.textContent="بيانات الدخول غير صحيحة."; al.style.display="block"; }
}

document.addEventListener("DOMContentLoaded", ()=>{
  // Splash 3s
  $("#atd-skip")?.addEventListener("click", ()=>{ hideSplash(); showLogin(); });
  setTimeout(()=>{ hideSplash(); showLogin(); }, 3000);

  // If session exists, go straight in
  try{ const s=JSON.parse(sessionStorage.getItem("AT_SESSION")); if(s){ window.location.href="./app/"; } }catch(_){}

  $("#login-form")?.addEventListener("submit", onLogin);
});
