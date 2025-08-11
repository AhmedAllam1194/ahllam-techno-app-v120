
const $ = (s,p=document)=>p.querySelector(s);
const toHex = buf => [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
async function sha256Hex(str){return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)))}
const DB = window.APP_USERS||[];
function saveSession(o){sessionStorage.setItem("AT_SESSION", JSON.stringify({...o,t:Date.now()}))}
function getSession(){try{return JSON.parse(sessionStorage.getItem("AT_SESSION"))}catch(_){return null}}
function clearSession(){sessionStorage.removeItem("AT_SESSION")}

function showLogin(){
  const overlay = $("#login-overlay");
  if(overlay){ overlay.style.display = "grid"; }
  const u = $("#username"); if(u) u.focus();
}
function hideSplash(){
  const s = $("#atd-splash");
  if(s){ s.style.display = "none"; }
}

async function onLogin(e){
  e.preventDefault();
  const u = $("#username").value.trim();
  const p = $("#password").value;
  const alert = $("#login-alert");
  if(alert) alert.style.display = "none";
  if(!u || !p){
    if(alert){ alert.textContent = "من فضلك أدخل اسم المستخدم وكلمة المرور."; alert.style.display="block"; }
    return;
  }
  const h = await sha256Hex(p);
  const found = DB.find(x=>x.u===u && x.h===h);
  if(found){
    saveSession(found);
    window.location.href = "./app/";
  }else{
    if(alert){ alert.textContent = "بيانات الدخول غير صحيحة."; alert.style.display="block"; }
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  // Splash 4s
  const splash = $("#atd-splash");
  const skip = $("#atd-skip");
  if(skip){ skip.addEventListener("click", ()=>{ hideSplash(); showLogin(); }); }
  setTimeout(()=>{ hideSplash(); showLogin(); }, 4000);

  // Auto-continue if already logged in
  const sess = getSession();
  if(sess){ window.location.href = "./app/"; return; }

  // Bind login
  const form = $("#login-form");
  if(form){ form.addEventListener("submit", onLogin); }
});
