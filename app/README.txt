ATD GitHub Replace Package — خطوات سريعة

1) ارفع الملفات التالية في جذر الريبو (نفس مكان index.html):
   - config.js
   - app-auth.js
   - firestore.rules.txt
   - index-login-snippet.html (للعِلم/النسخ فقط)

2) افتح index.html:
   - تأكد وجود حقول IDs: #username و #password و زر #loginBtn
   - لو مش موجودين، انسخ البلوك من index-login-snippet.html
   - قبل </body> اضف:
       <script type="module" src="./config.js"></script>
       <script type="module" src="./app-auth.js"></script>

3) Firebase:
   - Authentication → Sign-in method: فعّل Email/Password + Anonymous
   - Authentication → Settings → Authorized domains: اضف ahmedallam1194.github.io
   - Firestore → Rules: الصق محتوى firestore.rules.txt ثم Publish
   - Firestore → Data:
       Collection: usernames
         Doc: admin
           password = "102030405060"
           role = "admin"
         Doc: developer
           password = "5781829"
           role = "developer"

4) افتح موقع GitHub Pages واعمل Ctrl+F5 وجرب:
   - admin / 102030405060
   - developer / 5781829

ملاحظات:
- لو عايز إعادة زرع بيانات: أضف ?seed=1 إلى نهاية رابط الموقع (لو عندك app-seed.js).
- أي خطأ يظهر في Console (F12) ارسله لي لإصلاحه فورًا.
