// app-seed.js – auto seeding on first visit
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, setDoc, doc, addDoc, collection, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const app = initializeApp(window.AT_FIREBASE_CONFIG);
const db = getFirestore(app);
const auth = getAuth(app);

function d(s){ return new Date(s).toISOString(); }
async function ensureAnon(){ try{ await signInAnonymously(auth); }catch(e){} }

async function seedIfNeeded(){
  if (localStorage.getItem("ATD_SEEDED") === "1") return;
  const sDoc = await getDoc(doc(db, "settings", "app"));
  if (sDoc.exists()) { localStorage.setItem("ATD_SEEDED","1"); return; }

  await ensureAnon();

  await setDoc(doc(db,'usernames','Admin'), { role:'admin', password:'102030405060' });
  await setDoc(doc(db,'usernames','Ahmedallam'), { role:'developer', email:'ahmedallam1194@gmail.com' });

  const clients=[
    {name:'مطعم زهرة الكويت', phone:'+965 55001122', address:'السالمية، شارع الخليج', vat:false},
    {name:'شركة النور للتجارة', phone:'+965 55223344', address:'الفحيحيل، منطقة صناعية', vat:false},
    {name:'كوفي كيان', phone:'+965 50123456', address:'حولي، شارع بيروت', vat:false},
  ];
  for(const c of clients){ await addDoc(collection(db,'clients'), c); }

  const drivers=[
    {name:'محمد علي', phone:'+965 60011223', vehicle:'سيكل-كي تي ام 200', license:'B-2025-4412', status:'متاح', salaryType:'شهري', salary:350},
    {name:'سالم فهد', phone:'+965 60099887', vehicle:'سيارة-تويوتا يارس 2019', license:'B-2024-2210', status:'مشغول', salaryType:'نسبة', salary:0, percent:0.25},
    {name:'علي ناصر', phone:'+965 50119977', vehicle:'سيكل-هوندا وينج', license:'B-2023-1180', status:'اجازة', salaryType:'يومي', dayRate:12},
  ];
  for(const dvr of drivers){ await addDoc(collection(db,'drivers'), dvr); }

  const fleet=[
    {type:'سيارة', make:'تويوتا', model:'يارس', year:2019, plate:'ك-12345', status:'جاهز', odo:145000, lastService:d('2025-07-01'), nextServiceKm:150000},
    {type:'سيكل', make:'KTM', model:'Duke 200', year:2021, plate:'م-66789', status:'صيانة', odo:42000, lastService:d('2025-06-15'), nextServiceKm:45000},
    {type:'سيكل', make:'هوندا', model:'Wing', year:2020, plate:'س-44551', status:'جاهز', odo:38000, lastService:d('2025-06-28'), nextServiceKm:40000}
  ];
  for(const v of fleet){ await addDoc(collection(db,'fleet'), v); }

  const orders=[
    {ref:'ORD-1001', customer:'مطعم زهرة الكويت', driver:'محمد علي', vehicle:'سيكل-كي تي ام 200', date:d('2025-08-10T12:10:00'), status:'جديد', amount:2.750, payment:'نقدي', lat:29.378586, lng:47.990341},
    {ref:'ORD-1002', customer:'شركة النور للتجارة', driver:'سالم فهد', vehicle:'يارس 2019', date:d('2025-08-10T13:05:00'), status:'جاري', amount:4.250, payment:'نقدي', lat:29.337507, lng:48.022682},
    {ref:'ORD-1003', customer:'كوفي كيان', driver:'علي ناصر', vehicle:'هوندا وينج', date:d('2025-08-11T09:20:00'), status:'تم التسليم', amount:1.500, payment:'كي نت', lat:29.369722, lng:47.978333}
  ];
  for(const o of orders){ await addDoc(collection(db,'orders'), o); }

  const contracts=[
    {company:'مطعم زهرة الكويت', start:d('2025-07-01'), end:d('2025-12-31'), monthly:250, perOrder:0.45, vehicles:2, notes:'ساعات الذروة 6-10 م'},
    {company:'شركة النور للتجارة', start:d('2025-08-01'), end:d('2026-07-31'), monthly:400, perOrder:0.35, vehicles:3, notes:'تغطي كل مناطق الاحمدي'}
  ];
  for(const c of contracts){ await addDoc(collection(db,'contracts'), c); }

  const payroll=[
    {name:'محمد علي', type:'شهري', base:350, month:'2025-08', overtime:18, advances:20, penalties:0, net:348},
    {name:'سالم فهد', type:'نسبة', percent:0.25, month:'2025-08', orders:62, totalCOD:180.500, advances:0, penalties:5, net:40.125},
    {name:'علي ناصر', type:'يومي', dayRate:12, days:20, month:'2025-08', advances:10, penalties:0, net:230}
  ];
  for(const p of payroll){ await addDoc(collection(db,'payroll'), p); }

  const pricing=[
    {zone:'السالمية', base:1.250, perKm:0.100, minKm:5},
    {zone:'حولي', base:1.200, perKm:0.090, minKm:4},
    {zone:'الفحيحيل', base:1.500, perKm:0.120, minKm:6},
  ];
  for(const pr of pricing){ await addDoc(collection(db,'pricing'), pr); }

  const cod=[
    {date:d('2025-08-10'), driver:'محمد علي', orders:18, amount:32.750, delivered:true},
    {date:d('2025-08-10'), driver:'سالم فهد', orders:22, amount:41.500, delivered:false},
  ];
  for(const s of cod){ await addDoc(collection(db,'cod_settlements'), s); }

  await setDoc(doc(db,'settings','app'), {
    company:'Allam Tech Delivery',
    phone:'+965 50000000',
    theme:'light',
    currency:'KWD',
    mapDefault:{lat:29.3759, lng:47.9774, zoom:11}
  });

  localStorage.setItem("ATD_SEEDED","1");
  console.log("ATD: seeding completed");
}

document.addEventListener("DOMContentLoaded", ()=>{
  const url = new URL(location.href);
  if (url.searchParams.get("seed")==="1"){
    localStorage.removeItem("ATD_SEEDED");
  }
  seedIfNeeded();
});
