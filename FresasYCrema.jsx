import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Plus, Minus, X, Trash2, Pencil, Star, Settings,
  LogOut, Instagram, MapPin, Clock, Phone, Image as ImageIcon,
  Download, Upload, RotateCcw, Eye, EyeOff, Menu, ChevronRight, Tag, Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Datos por defecto (menú real de Fresas y Crema BAQ)               */
/* ------------------------------------------------------------------ */
const DEFAULT_DATA = {
  config: {
    name: "Fresas y Crema",
    tagline: "Disfruta de las mejores 🍓",
    whatsapp: "573000000000", // <- cámbialo por tu número real
    instagram: "https://www.instagram.com/fresasycremabaq/",
    address: "Barranquilla, Atlántico",
    hours: "Lun a Dom · 3:00 pm – 10:00 pm",
    heroImage: "",
    adminPassword: "fresas2025",
  },
  categories: [
    { id: "fresas", name: "Fresas", note: "Con crema, frutas y mucho más" },
    { id: "obleas", name: "Obleas", note: "El clásico que nunca falla" },
    { id: "armatu", name: "Arma tu Brownie / Merengón", note: "Tú eliges todo" },
    { id: "pop", name: "Pop Chocolat", note: "Fresas bañadas en chocolate" },
    { id: "fruit", name: "Fruit", note: "Fresco y saludable" },
    { id: "bebidas", name: "Otros", note: "Para acompañar" },
    { id: "adiciones", name: "Adiciones", note: "Ponle lo que quieras" },
  ],
  products: [
    // Fresas
    { id: "f1", cat: "fresas", name: "Fresas con crema", desc: "", price: 16500, best: true, img: "", active: true },
    { id: "f2", cat: "fresas", name: "Durazno con crema", desc: "", price: 18000, best: false, img: "", active: true },
    { id: "f3", cat: "fresas", name: "Combinado", desc: "Fresas, durazno y crema", price: 18000, best: false, img: "", active: true },
    { id: "f4", cat: "fresas", name: "Mix", desc: "Fresas, durazno, arándanos y crema", price: 18000, best: true, img: "", active: true },
    { id: "f5", cat: "fresas", name: "Tropical", desc: "Fresa, durazno, kiwi, arándanos y crema", price: 19500, best: false, img: "", active: true },
    { id: "f6", cat: "fresas", name: "Reina Roja", desc: "Fresas, dulce de mora, queso y crema", price: 19500, best: false, img: "", active: true },
    { id: "f7", cat: "fresas", name: "Selva Negra", desc: "Fresa, chips negros, chips blancos, chunks, hersheys, brownie y crema", price: 19500, best: true, img: "", active: true },
    { id: "f8", cat: "fresas", name: "Tentación", desc: "Vaso cubierto de chocolate", price: 19500, best: false, img: "", active: true },
    { id: "f9", cat: "fresas", name: "Frutos del Bosque", desc: "Dulce de mora, arándanos, fresas, nutella, frambuesa cubierta de chocolate y cereza", price: 24000, best: true, img: "", active: true },
    // Obleas
    { id: "o1", cat: "obleas", name: "Arequipe", desc: "", price: 5500, best: false, img: "", active: true },
    { id: "o2", cat: "obleas", name: "Arequipe y crema", desc: "", price: 7000, best: false, img: "", active: true },
    { id: "o3", cat: "obleas", name: "Arequipe y queso", desc: "", price: 9000, best: false, img: "", active: true },
    { id: "o4", cat: "obleas", name: "Arequipe, crema y dulce de mora", desc: "", price: 9000, best: false, img: "", active: true },
    { id: "o5", cat: "obleas", name: "Arequipe, queso y crema", desc: "", price: 9000, best: false, img: "", active: true },
    { id: "o6", cat: "obleas", name: "Arequipe y dulce de mora", desc: "", price: 9000, best: false, img: "", active: true },
    { id: "o7", cat: "obleas", name: "Arequipe, crema y chips de chocolate", desc: "", price: 9000, best: false, img: "", active: true },
    { id: "o8", cat: "obleas", name: "Arequipe, queso, crema y fresa", desc: "", price: 13000, best: true, img: "", active: true },
    { id: "o9", cat: "obleas", name: "Arequipe, queso, crema y dulce de mora", desc: "", price: 13000, best: false, img: "", active: true },
    { id: "o10", cat: "obleas", name: "Arequipe, queso, crema, dulce de mora y fresa", desc: "", price: 13000, best: false, img: "", active: true },
    { id: "o11", cat: "obleas", name: "Arequipe, crema, queso y durazno", desc: "", price: 13000, best: false, img: "", active: true },
    { id: "o12", cat: "obleas", name: "Arequipe, crema, queso, dulce de mora y durazno", desc: "", price: 13000, best: false, img: "", active: true },
    // Arma tu
    { id: "a1", cat: "armatu", name: "Arma tu Brownie", desc: "1 salsa · 2 o 3 frutas · 1 helado · 2 toppings", price: 16000, best: true, img: "", active: true },
    { id: "a2", cat: "armatu", name: "Arma tu Merengón", desc: "1 salsa · 2 o 3 frutas · 1 helado · 2 toppings", price: 16000, best: false, img: "", active: true },
    // Pop chocolat
    { id: "p1", cat: "pop", name: "Fresas con Chocolate Negro", desc: "", price: 18000, best: false, img: "", active: true },
    { id: "p2", cat: "pop", name: "Fresas con Chocolate Blanco", desc: "", price: 20000, best: false, img: "", active: true },
    { id: "p3", cat: "pop", name: "Fresas Chocolate Negro y Blanco", desc: "", price: 20000, best: true, img: "", active: true },
    // Fruit
    { id: "fr1", cat: "fruit", name: "Ensalada de frutas", desc: "Banano, fresa, arándanos, kiwi, durazno, queso, granola y yogurt griego", price: 18000, best: false, img: "", active: true },
    // Bebidas
    { id: "b1", cat: "bebidas", name: "Agua", desc: "", price: 4000, best: false, img: "", active: true },
    { id: "b2", cat: "bebidas", name: "Tinto", desc: "", price: 3000, best: false, img: "", active: true },
    { id: "b3", cat: "bebidas", name: "Soda", desc: "", price: 5000, best: false, img: "", active: true },
    // Adiciones
    { id: "ad1", cat: "adiciones", name: "Topping $2.000", desc: "Chips negros, chips blancos, brownie, hersheys, oreo, chocorramo, arequipe, quipitos, dulce de mora, dulce de maracuyá, leche condensada, perlas de chocolate, merengue, chunks, milo, barquillos", price: 2000, best: false, img: "", active: true },
    { id: "ad2", cat: "adiciones", name: "Topping $5.000", desc: "Helado, queso, nutella, fruta, nuggets de milo, crema de milo", price: 5000, best: false, img: "", active: true },
    { id: "ad3", cat: "adiciones", name: "Frambuesa cubierta de chocolate", desc: "40 grs", price: 3000, best: false, img: "", active: true },
  ],
  promos: [
    { id: "pr1", title: "Combo Enamorados", desc: "2 Fresas con crema + 2 bebidas para compartir 💕", price: 32000, oldPrice: 41000, img: "", active: true },
    { id: "pr2", title: "Antojo del día", desc: "Oblea de arequipe y crema a precio especial (solo en tienda)", price: 6000, oldPrice: 7000, img: "", active: true },
  ],
};

const KEY = "fyc_data_v1";

/* ------------------------------------------------------------------ */
/*  Persistencia (usa window.storage si existe; si no, memoria)       */
/* ------------------------------------------------------------------ */
const store = {
  async get() {
    try {
      if (typeof window !== "undefined" && window.storage) {
        const r = await window.storage.get(KEY, true);
        return r ? JSON.parse(r.value) : null;
      }
    } catch (e) { /* clave inexistente u otro error → null */ }
    return null;
  },
  async set(val) {
    try {
      if (typeof window !== "undefined" && window.storage) {
        await window.storage.set(KEY, JSON.stringify(val), true);
      }
    } catch (e) { console.error("No se pudo guardar:", e); }
  },
};

const money = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

/* Comprime una imagen a dataURL liviano */
function fileToDataURL(file, maxW = 900, q = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", q));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ */
/*  Estilos                                                            */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Poppins:wght@400;500;600;700;800&display=swap');

:root{
  --ink:#1a1012; --ink2:#241519; --card:#fdf5ea; --card2:#f7e8d7;
  --red:#e8384f; --red-deep:#c31f3a; --pink:#f7a8bb; --pink-soft:#fbcdd7;
  --gold:#e6a94e; --leaf:#74a86a; --txt:#f4e6df; --muted:rgba(244,230,223,.6);
  --ink-txt:#3a2226;
}
*{box-sizing:border-box}
.fyc{font-family:'Poppins',system-ui,sans-serif;background:var(--ink);color:var(--txt);min-height:100vh;
  background-image:radial-gradient(circle at 15% 0%,rgba(232,56,79,.14),transparent 40%),radial-gradient(circle at 90% 10%,rgba(247,168,187,.1),transparent 35%);}
.wrap{max-width:760px;margin:0 auto;padding:0 16px}
.script{font-family:'Kaushan Script',cursive;line-height:1.05}

/* cinta dulce */
.ribbon{position:relative;display:inline-block;padding:.45rem 1.9rem;border-radius:999px;
  background:var(--card);box-shadow:0 8px 24px rgba(0,0,0,.4);border:2px solid var(--pink-soft)}
.ribbon::before,.ribbon::after{content:'';position:absolute;top:50%;transform:translateY(-50%);
  width:30px;height:13px;border-radius:999px;
  background:repeating-linear-gradient(120deg,var(--red) 0 7px,#fff 7px 14px)}
.ribbon::before{left:-12px}.ribbon::after{right:-12px}
.ribbon .script{color:var(--red-deep);font-size:1.7rem;padding:0 .1rem}

/* top bar */
.topbar{position:sticky;top:0;z-index:40;backdrop-filter:blur(10px);
  background:rgba(26,16,18,.82);border-bottom:1px solid rgba(247,168,187,.18)}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{font-family:'Kaushan Script',cursive;font-size:1.55rem;color:var(--pink);display:flex;gap:.4rem;align-items:center}
.iconbtn{background:rgba(247,168,187,.12);border:1px solid rgba(247,168,187,.25);color:var(--txt);
  width:44px;height:44px;border-radius:14px;display:grid;place-items:center;cursor:pointer;position:relative;transition:.15s}
.iconbtn:hover{background:rgba(247,168,187,.22)}
.badge{position:absolute;top:-6px;right:-6px;background:var(--red);color:#fff;font-size:.7rem;font-weight:700;
  min-width:20px;height:20px;border-radius:999px;display:grid;place-items:center;padding:0 5px}

/* hero */
.hero{text-align:center;padding:34px 0 26px}
.hero-badge{display:inline-block;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);
  border:1px solid rgba(230,169,78,.4);border-radius:999px;padding:.3rem .9rem;margin-bottom:16px}
.hero h1{font-family:'Kaushan Script',cursive;font-size:clamp(3rem,14vw,4.8rem);margin:0;color:#fff;
  text-shadow:0 6px 30px rgba(232,56,79,.45)}
.hero h1 em{color:var(--red);font-style:normal}
.hero p{color:var(--muted);max-width:34ch;margin:14px auto 22px;font-size:1.02rem}
.cta-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn{border:none;cursor:pointer;font-family:inherit;font-weight:600;border-radius:14px;padding:.8rem 1.4rem;
  font-size:.95rem;display:inline-flex;align-items:center;gap:.5rem;transition:.15s}
.btn-red{background:var(--red);color:#fff;box-shadow:0 8px 22px rgba(232,56,79,.35)}
.btn-red:hover{background:var(--red-deep);transform:translateY(-1px)}
.btn-ghost{background:rgba(253,245,234,.08);color:var(--txt);border:1px solid rgba(247,168,187,.3)}
.btn-ghost:hover{background:rgba(253,245,234,.16)}
.btn-gold{background:var(--gold);color:#3a2226}
.btn-gold:hover{filter:brightness(1.06)}

.hero-photo{margin:22px auto 0;max-width:340px;height:200px;border-radius:24px;background-size:cover;
  background-position:center;box-shadow:0 20px 50px rgba(0,0,0,.5);border:3px solid var(--pink-soft)}

/* sección */
.section{padding:30px 0 8px}
.section-head{text-align:center;margin-bottom:20px}
.section-head .sub{color:var(--muted);font-size:.9rem;margin-top:10px}

/* horizontal scroll */
.hscroll{display:flex;gap:14px;overflow-x:auto;padding:4px 16px 14px;margin:0 -16px;scroll-snap-type:x mandatory}
.hscroll::-webkit-scrollbar{height:6px}
.hscroll::-webkit-scrollbar-thumb{background:rgba(247,168,187,.3);border-radius:9px}
.best-card{scroll-snap-align:start;flex:0 0 200px;background:var(--ink2);border-radius:20px;overflow:hidden;
  border:1px solid rgba(247,168,187,.16);display:flex;flex-direction:column}
.best-thumb{height:130px;background-size:cover;background-position:center;position:relative;display:grid;place-items:center}
.best-thumb .emoji{font-size:3rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4))}
.best-star{position:absolute;top:10px;left:10px;background:var(--gold);color:#3a2226;font-size:.68rem;font-weight:700;
  padding:.2rem .55rem;border-radius:999px;display:flex;align-items:center;gap:3px}
.best-body{padding:12px 14px;display:flex;flex-direction:column;gap:6px;flex:1}
.best-body .n{font-weight:600;font-size:.95rem;line-height:1.2}
.best-body .pr{color:var(--gold);font-weight:700}
.best-add{margin-top:auto;background:var(--red);color:#fff;border:none;border-radius:11px;padding:.5rem;
  font-family:inherit;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px}
.best-add:hover{background:var(--red-deep)}

/* promos */
.promo-card{background:linear-gradient(135deg,var(--ink2),#2e181d);border:1px solid rgba(230,169,78,.35);
  border-radius:20px;padding:16px;display:flex;gap:14px;align-items:center;margin-bottom:12px}
.promo-thumb{flex:0 0 76px;height:76px;border-radius:16px;background-size:cover;background-position:center;
  background-color:rgba(232,56,79,.15);display:grid;place-items:center;font-size:2rem}
.promo-info{flex:1;min-width:0}
.promo-tag{display:inline-flex;align-items:center;gap:4px;font-size:.68rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.05em;color:var(--gold);margin-bottom:4px}
.promo-info h4{margin:0;font-size:1rem}
.promo-info p{margin:3px 0 0;color:var(--muted);font-size:.83rem}
.promo-price{display:flex;align-items:baseline;gap:8px;margin-top:6px}
.promo-price .now{color:#fff;font-weight:800;font-size:1.05rem}
.promo-price .old{color:var(--muted);text-decoration:line-through;font-size:.82rem}

/* menu list */
.cat-block{margin-bottom:26px}
.item{display:flex;gap:12px;align-items:flex-start;padding:14px 4px;border-bottom:1px dashed rgba(247,168,187,.16)}
.item-thumb{flex:0 0 54px;height:54px;border-radius:14px;background-size:cover;background-position:center;
  background:rgba(247,168,187,.12);display:grid;place-items:center;font-size:1.5rem}
.item-main{flex:1;min-width:0}
.item-main .n{font-weight:600;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.item-main .d{color:var(--muted);font-size:.82rem;margin-top:2px;line-height:1.35}
.item-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
.item-right .pr{color:var(--gold);font-weight:700;white-space:nowrap}
.mini-add{background:var(--red);border:none;color:#fff;width:32px;height:32px;border-radius:10px;cursor:pointer;
  display:grid;place-items:center;transition:.15s}
.mini-add:hover{background:var(--red-deep)}
.tag-best{background:rgba(230,169,78,.2);color:var(--gold);font-size:.63rem;font-weight:700;padding:.1rem .45rem;border-radius:999px;display:inline-flex;gap:3px;align-items:center}

/* footer */
.footer{margin-top:40px;padding:30px 0 40px;border-top:1px solid rgba(247,168,187,.15);text-align:center}
.foot-line{display:flex;align-items:center;justify-content:center;gap:8px;color:var(--muted);font-size:.9rem;margin:8px 0}
.foot-line a{color:var(--pink);text-decoration:none}
.admin-link{margin-top:18px;background:none;border:none;color:rgba(244,230,223,.35);font-size:.78rem;cursor:pointer;font-family:inherit}
.admin-link:hover{color:var(--pink)}

/* cart drawer */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:50;display:flex;justify-content:flex-end}
.drawer{width:min(420px,100%);background:var(--ink);height:100%;display:flex;flex-direction:column;
  border-left:1px solid rgba(247,168,187,.2);animation:slide .25s ease}
@keyframes slide{from{transform:translateX(30px);opacity:.4}to{transform:none;opacity:1}}
.drawer-head{padding:18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(247,168,187,.15)}
.drawer-head h3{margin:0;font-family:'Kaushan Script',cursive;font-size:1.5rem;color:var(--pink)}
.drawer-body{flex:1;overflow-y:auto;padding:14px 18px}
.cart-row{display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px dashed rgba(247,168,187,.15)}
.cart-row .cn{flex:1}
.qty{display:flex;align-items:center;gap:8px}
.qty button{width:28px;height:28px;border-radius:9px;border:1px solid rgba(247,168,187,.3);background:rgba(247,168,187,.1);
  color:var(--txt);cursor:pointer;display:grid;place-items:center}
.drawer-foot{padding:18px;border-top:1px solid rgba(247,168,187,.15)}
.total-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px}
.total-row .big{font-size:1.5rem;font-weight:800;color:var(--gold)}
.empty{text-align:center;color:var(--muted);padding:40px 10px}

/* modal */
.modal{width:min(480px,100%);background:var(--ink2);border-radius:22px;max-height:90vh;overflow-y:auto;
  border:1px solid rgba(247,168,187,.2);margin:auto;animation:pop .2s ease}
@keyframes pop{from{transform:scale(.96);opacity:.5}to{transform:none;opacity:1}}
.modal-head{padding:16px 18px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;
  background:var(--ink2);border-bottom:1px solid rgba(247,168,187,.12)}
.modal-head h3{margin:0;font-size:1.1rem}
.modal-body{padding:18px}
.center-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:60;display:flex;padding:16px}

/* form */
.field{margin-bottom:14px}
.field label{display:block;font-size:.82rem;color:var(--muted);margin-bottom:6px;font-weight:500}
.field input,.field textarea,.field select{width:100%;background:rgba(253,245,234,.06);border:1px solid rgba(247,168,187,.25);
  color:var(--txt);border-radius:12px;padding:.7rem .9rem;font-family:inherit;font-size:.95rem;outline:none}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--pink)}
.field textarea{min-height:70px;resize:vertical}
.check{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:.9rem;margin-bottom:12px}
.check input{width:auto}
.img-drop{border:1px dashed rgba(247,168,187,.4);border-radius:14px;padding:14px;text-align:center;cursor:pointer;
  color:var(--muted);font-size:.85rem;display:flex;flex-direction:column;align-items:center;gap:6px}
.img-preview{width:100%;height:130px;border-radius:12px;background-size:cover;background-position:center;margin-bottom:8px}

/* admin */
.admin-top{position:sticky;top:0;z-index:30;background:var(--ink2);border-bottom:1px solid rgba(247,168,187,.15)}
.admin-top-inner{display:flex;align-items:center;justify-content:space-between;height:58px}
.tabs{display:flex;gap:6px;overflow-x:auto;padding:10px 0}
.tab{white-space:nowrap;background:rgba(247,168,187,.1);border:1px solid rgba(247,168,187,.2);color:var(--txt);
  border-radius:11px;padding:.5rem .95rem;font-family:inherit;font-size:.88rem;cursor:pointer;font-weight:500}
.tab.on{background:var(--red);border-color:var(--red);color:#fff}
.admin-row{background:var(--ink2);border:1px solid rgba(247,168,187,.14);border-radius:14px;padding:12px 14px;
  display:flex;align-items:center;gap:10px;margin-bottom:9px}
.admin-row .ar-main{flex:1;min-width:0}
.admin-row .ar-main .n{font-weight:600;font-size:.92rem}
.admin-row .ar-main .m{color:var(--muted);font-size:.78rem}
.rowbtn{background:rgba(247,168,187,.12);border:1px solid rgba(247,168,187,.25);color:var(--txt);
  width:34px;height:34px;border-radius:10px;display:grid;place-items:center;cursor:pointer}
.rowbtn:hover{background:rgba(247,168,187,.24)}
.rowbtn.danger:hover{background:rgba(232,56,79,.3);border-color:var(--red)}
.pill-cat{font-size:.7rem;color:var(--gold);background:rgba(230,169,78,.15);padding:.15rem .5rem;border-radius:999px}
.login-box{max-width:360px;margin:60px auto;background:var(--ink2);border:1px solid rgba(247,168,187,.2);
  border-radius:22px;padding:28px;text-align:center}
.card-block{background:var(--ink2);border:1px solid rgba(247,168,187,.14);border-radius:16px;padding:16px;margin-bottom:14px}
.card-block h4{margin:0 0 12px;font-size:1rem;display:flex;align-items:center;gap:7px}
.hint{color:var(--muted);font-size:.8rem;margin-top:6px}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--leaf);color:#fff;
  padding:.7rem 1.3rem;border-radius:14px;font-weight:600;z-index:80;box-shadow:0 10px 30px rgba(0,0,0,.4);
  display:flex;align-items:center;gap:8px;font-size:.9rem;animation:pop .2s ease}
.section-add{display:flex;justify-content:flex-end;margin-bottom:12px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const EMOJI = { fresas: "🍓", obleas: "🥞", armatu: "🍫", pop: "🍓", fruit: "🥝", bebidas: "🥤", adiciones: "✨" };

/* ================================================================== */
export default function App() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("site"); // site | admin
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    (async () => {
      const saved = await store.get();
      if (saved) setData(saved);
      else store.set(DEFAULT_DATA);
      setLoaded(true);
    })();
  }, []);

  const persist = (next) => { setData(next); store.set(next); };
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 1800); };

  const addToCart = (id) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); flash("Agregado al pedido"); };
  const decFromCart = (id) => setCart((c) => { const q = (c[id] || 0) - 1; const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const removeCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = Object.entries(cart).map(([id, q]) => ({ p: data.products.find((x) => x.id === id), q })).filter((x) => x.p);
  const cartTotal = cartItems.reduce((s, { p, q }) => s + p.price * q, 0);

  const sendWhatsApp = () => {
    const lines = cartItems.map(({ p, q }) => `• ${q}x ${p.name} — ${money(p.price * q)}`);
    const msg = `¡Hola ${data.config.name}! 🍓 Quiero pedir:\n\n${lines.join("\n")}\n\n*Total: ${money(cartTotal)}*`;
    const url = `https://wa.me/${data.config.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  if (!loaded) return <div className="fyc" style={{ display: "grid", placeItems: "center" }}><style>{CSS}</style><div className="brand">Fresas y Crema…</div></div>;

  return (
    <div className="fyc">
      <style>{CSS}</style>
      {view === "site"
        ? <Site data={data} cart={cart} cartCount={cartCount} addToCart={addToCart} openCart={() => setCartOpen(true)} goAdmin={() => setView("admin")} />
        : <Admin data={data} persist={persist} exit={() => setView("site")} flash={flash} />}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>Mi pedido</h3>
              <button className="iconbtn" onClick={() => setCartOpen(false)}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              {cartItems.length === 0
                ? <div className="empty">Tu pedido está vacío.<br />Agrega tus antojos 🍓</div>
                : cartItems.map(({ p, q }) => (
                  <div className="cart-row" key={p.id}>
                    <div className="cn">
                      <div style={{ fontWeight: 600, fontSize: ".92rem" }}>{p.name}</div>
                      <div style={{ color: "var(--gold)", fontSize: ".85rem" }}>{money(p.price)}</div>
                    </div>
                    <div className="qty">
                      <button onClick={() => decFromCart(p.id)}><Minus size={14} /></button>
                      <span style={{ minWidth: 18, textAlign: "center" }}>{q}</span>
                      <button onClick={() => addToCart(p.id)}><Plus size={14} /></button>
                    </div>
                    <button className="rowbtn danger" onClick={() => removeCart(p.id)}><Trash2 size={15} /></button>
                  </div>
                ))}
            </div>
            {cartItems.length > 0 && (
              <div className="drawer-foot">
                <div className="total-row"><span>Total estimado</span><span className="big">{money(cartTotal)}</span></div>
                <button className="btn btn-red" style={{ width: "100%", justifyContent: "center" }} onClick={sendWhatsApp}>
                  <Phone size={18} /> Pedir por WhatsApp
                </button>
                <div className="hint" style={{ textAlign: "center", marginTop: 8 }}>Confirmas tu pedido directamente por WhatsApp.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SITIO (clientes)                                                   */
/* ------------------------------------------------------------------ */
function Site({ data, cartCount, addToCart, openCart, goAdmin }) {
  const { config, categories, products, promos } = data;
  const best = products.filter((p) => p.best && p.active);
  const activePromos = promos.filter((p) => p.active);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">🍓 {config.name}</div>
          <button className="iconbtn" onClick={openCart} aria-label="Ver pedido">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="wrap">
        {/* HERO */}
        <header className="hero">
          <span className="hero-badge">Barranquilla · 🍓</span>
          <h1>Fresas <em>y</em> Crema</h1>
          <p>{config.tagline}</p>
          <div className="cta-row">
            <button className="btn btn-red" onClick={() => scrollTo("menu")}>Ver el menú</button>
            <button className="btn btn-ghost" onClick={() => scrollTo("vendido")}>Lo más vendido</button>
          </div>
          {config.heroImage && <div className="hero-photo" style={{ backgroundImage: `url(${config.heroImage})` }} />}
        </header>

        {/* MÁS VENDIDO */}
        {best.length > 0 && (
          <section className="section" id="vendido">
            <div className="section-head">
              <div className="ribbon"><span className="script">Lo más vendido</span></div>
              <div className="sub">Los favoritos que todos piden 😍</div>
            </div>
            <div className="hscroll">
              {best.map((p) => (
                <div className="best-card" key={p.id}>
                  <div className="best-thumb" style={p.img ? { backgroundImage: `url(${p.img})` } : { background: "linear-gradient(135deg,#3a1a20,#2a1418)" }}>
                    {!p.img && <span className="emoji">{EMOJI[p.cat] || "🍓"}</span>}
                    <span className="best-star"><Star size={11} fill="#3a2226" /> TOP</span>
                  </div>
                  <div className="best-body">
                    <div className="n">{p.name}</div>
                    <div className="pr">{money(p.price)}</div>
                    <button className="best-add" onClick={() => addToCart(p.id)}><Plus size={15} /> Agregar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROMOCIONES */}
        {activePromos.length > 0 && (
          <section className="section" id="promos">
            <div className="section-head">
              <div className="ribbon"><span className="script">Promociones</span></div>
              <div className="sub">Aprovecha por tiempo limitado ⏳</div>
            </div>
            {activePromos.map((pr) => (
              <div className="promo-card" key={pr.id}>
                <div className="promo-thumb" style={pr.img ? { backgroundImage: `url(${pr.img})` } : {}}>{!pr.img && "🎁"}</div>
                <div className="promo-info">
                  <span className="promo-tag"><Tag size={12} /> Promo</span>
                  <h4>{pr.title}</h4>
                  <p>{pr.desc}</p>
                  <div className="promo-price">
                    <span className="now">{money(pr.price)}</span>
                    {pr.oldPrice > 0 && <span className="old">{money(pr.oldPrice)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* MENÚ */}
        <section className="section" id="menu">
          <div className="section-head">
            <div className="ribbon"><span className="script">Nuestro menú</span></div>
          </div>
          {categories.map((cat) => {
            const items = products.filter((p) => p.cat === cat.id && p.active);
            if (!items.length) return null;
            return (
              <div className="cat-block" key={cat.id}>
                <div style={{ textAlign: "center", margin: "8px 0 14px" }}>
                  <div className="ribbon"><span className="script">{cat.name}</span></div>
                  {cat.note && <div className="sub" style={{ marginTop: 8, color: "var(--muted)", fontSize: ".82rem" }}>{cat.note}</div>}
                </div>
                {items.map((p) => (
                  <div className="item" key={p.id}>
                    <div className="item-thumb" style={p.img ? { backgroundImage: `url(${p.img})` } : {}}>{!p.img && (EMOJI[p.cat] || "🍓")}</div>
                    <div className="item-main">
                      <div className="n">{p.name} {p.best && <span className="tag-best"><Star size={9} fill="var(--gold)" /> Top</span>}</div>
                      {p.desc && <div className="d">{p.desc}</div>}
                    </div>
                    <div className="item-right">
                      <span className="pr">{money(p.price)}</span>
                      <button className="mini-add" onClick={() => addToCart(p.id)} aria-label="Agregar"><Plus size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="ribbon"><span className="script">Visítanos</span></div>
          <div style={{ marginTop: 18 }}>
            <div className="foot-line"><MapPin size={16} /> {config.address}</div>
            <div className="foot-line"><Clock size={16} /> {config.hours}</div>
            {config.instagram && <div className="foot-line"><Instagram size={16} /> <a href={config.instagram} target="_blank" rel="noreferrer">@fresasycremabaq</a></div>}
          </div>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-red" onClick={openCart}><ShoppingBag size={16} /> Hacer mi pedido</button>
          </div>
          <button className="admin-link" onClick={goAdmin}>Administración</button>
        </footer>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ADMIN                                                              */
/* ------------------------------------------------------------------ */
function Admin({ data, persist, exit, flash }) {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("productos");
  const [editing, setEditing] = useState(null); // product modal
  const [editingPromo, setEditingPromo] = useState(null);
  const [confirm, setConfirm] = useState(null);

  if (!authed) {
    return (
      <div className="wrap">
        <div className="login-box">
          <div className="brand" style={{ justifyContent: "center", marginBottom: 6 }}>🍓 {data.config.name}</div>
          <h3 style={{ marginTop: 0 }}>Panel de administración</h3>
          <p className="hint" style={{ marginBottom: 16 }}>Ingresa tu clave para gestionar el menú.</p>
          <div className="field">
            <input type="password" placeholder="Clave de acceso" value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (pass === data.config.adminPassword ? setAuthed(true) : flash("Clave incorrecta"))} />
          </div>
          <button className="btn btn-red" style={{ width: "100%", justifyContent: "center" }}
            onClick={() => pass === data.config.adminPassword ? setAuthed(true) : flash("Clave incorrecta")}>Ingresar</button>
          <button className="admin-link" onClick={exit} style={{ marginTop: 14 }}>Volver al sitio</button>
          <div className="hint" style={{ marginTop: 14 }}>Clave por defecto: <b>{DEFAULT_DATA.config.adminPassword}</b> · cámbiala en Ajustes.</div>
        </div>
      </div>
    );
  }

  /* --- operaciones --- */
  const saveProduct = (prod) => {
    const exists = data.products.some((p) => p.id === prod.id);
    const products = exists ? data.products.map((p) => (p.id === prod.id ? prod : p)) : [...data.products, prod];
    persist({ ...data, products }); setEditing(null); flash("Producto guardado");
  };
  const delProduct = (id) => { persist({ ...data, products: data.products.filter((p) => p.id !== id) }); flash("Producto eliminado"); };
  const savePromo = (pr) => {
    const exists = data.promos.some((x) => x.id === pr.id);
    const promos = exists ? data.promos.map((x) => (x.id === pr.id ? pr : x)) : [...data.promos, pr];
    persist({ ...data, promos }); setEditingPromo(null); flash("Promoción guardada");
  };
  const delPromo = (id) => { persist({ ...data, promos: data.promos.filter((p) => p.id !== id) }); flash("Promoción eliminada"); };

  const TABS = [["productos", "Productos"], ["promos", "Promociones"], ["categorias", "Categorías"], ["ajustes", "Ajustes"]];

  return (
    <>
      <div className="admin-top">
        <div className="wrap admin-top-inner">
          <div className="brand" style={{ fontSize: "1.3rem" }}>🍓 Admin</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="iconbtn" onClick={exit} title="Ver el sitio"><Eye size={18} /></button>
            <button className="iconbtn" onClick={() => setAuthed(false)} title="Salir"><LogOut size={18} /></button>
          </div>
        </div>
        <div className="wrap"><div className="tabs">
          {TABS.map(([id, label]) => <button key={id} className={"tab" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{label}</button>)}
        </div></div>
      </div>

      <div className="wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
        {tab === "productos" && (
          <>
            <div className="section-add"><button className="btn btn-gold" onClick={() => setEditing({ id: "p" + Date.now(), cat: data.categories[0].id, name: "", desc: "", price: 0, best: false, img: "", active: true })}><Plus size={16} /> Nuevo producto</button></div>
            {data.categories.map((cat) => {
              const items = data.products.filter((p) => p.cat === cat.id);
              if (!items.length) return null;
              return (
                <div key={cat.id} style={{ marginBottom: 18 }}>
                  <div style={{ color: "var(--pink)", fontWeight: 600, margin: "6px 4px 10px" }}>{cat.name}</div>
                  {items.map((p) => (
                    <div className="admin-row" key={p.id}>
                      <div className="item-thumb" style={p.img ? { backgroundImage: `url(${p.img})`, flex: "0 0 40px", height: 40 } : { flex: "0 0 40px", height: 40, fontSize: "1.1rem" }}>{!p.img && (EMOJI[p.cat] || "🍓")}</div>
                      <div className="ar-main">
                        <div className="n">{p.name} {p.best && <Star size={12} fill="var(--gold)" color="var(--gold)" />} {!p.active && <span style={{ color: "var(--muted)", fontSize: ".72rem" }}>(oculto)</span>}</div>
                        <div className="m">{money(p.price)}</div>
                      </div>
                      <button className="rowbtn" onClick={() => setEditing(p)}><Pencil size={15} /></button>
                      <button className="rowbtn danger" onClick={() => setConfirm({ msg: `¿Eliminar "${p.name}"?`, fn: () => delProduct(p.id) })}><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        )}

        {tab === "promos" && (
          <>
            <div className="section-add"><button className="btn btn-gold" onClick={() => setEditingPromo({ id: "pr" + Date.now(), title: "", desc: "", price: 0, oldPrice: 0, img: "", active: true })}><Plus size={16} /> Nueva promoción</button></div>
            {data.promos.length === 0 && <div className="empty">Aún no hay promociones.</div>}
            {data.promos.map((pr) => (
              <div className="admin-row" key={pr.id}>
                <div className="promo-thumb" style={{ flex: "0 0 44px", height: 44, fontSize: "1.3rem", ...(pr.img ? { backgroundImage: `url(${pr.img})` } : {}) }}>{!pr.img && "🎁"}</div>
                <div className="ar-main">
                  <div className="n">{pr.title} {!pr.active && <span style={{ color: "var(--muted)", fontSize: ".72rem" }}>(oculta)</span>}</div>
                  <div className="m">{money(pr.price)} {pr.oldPrice > 0 && <span style={{ textDecoration: "line-through" }}>{money(pr.oldPrice)}</span>}</div>
                </div>
                <button className="rowbtn" onClick={() => setEditingPromo(pr)}><Pencil size={15} /></button>
                <button className="rowbtn danger" onClick={() => setConfirm({ msg: `¿Eliminar "${pr.title}"?`, fn: () => delPromo(pr.id) })}><Trash2 size={15} /></button>
              </div>
            ))}
          </>
        )}

        {tab === "categorias" && <Categorias data={data} persist={persist} flash={flash} setConfirm={setConfirm} />}
        {tab === "ajustes" && <Ajustes data={data} persist={persist} flash={flash} setConfirm={setConfirm} />}
      </div>

      {editing && <ProductModal product={editing} cats={data.categories} onClose={() => setEditing(null)} onSave={saveProduct} />}
      {editingPromo && <PromoModal promo={editingPromo} onClose={() => setEditingPromo(null)} onSave={savePromo} />}
      {confirm && (
        <div className="center-overlay" onClick={() => setConfirm(null)}>
          <div className="modal" style={{ maxWidth: 340, margin: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <h3 style={{ marginTop: 0 }}>{confirm.msg}</h3>
              <p className="hint">Esta acción no se puede deshacer.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirm(null)}>Cancelar</button>
                <button className="btn btn-red" style={{ flex: 1, justifyContent: "center" }} onClick={() => { confirm.fn(); setConfirm(null); }}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- imagen input reutilizable --- */
function ImageInput({ value, onChange }) {
  const fileRef = useRef();
  const pick = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { onChange(await fileToDataURL(f)); } catch { alert("No se pudo cargar la imagen."); }
  };
  return (
    <div className="field">
      <label>Imagen (opcional)</label>
      {value && <div className="img-preview" style={{ backgroundImage: `url(${value})` }} />}
      <div className="img-drop" onClick={() => fileRef.current.click()}>
        <ImageIcon size={22} />
        {value ? "Cambiar imagen" : "Subir una foto desde tu galería"}
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={pick} />
      <input style={{ marginTop: 8 }} placeholder="…o pega un link de imagen (URL)" value={value?.startsWith("data:") ? "" : value || ""} onChange={(e) => onChange(e.target.value)} />
      {value && <button className="rowbtn danger" style={{ marginTop: 8 }} onClick={() => onChange("")}><Trash2 size={14} /></button>}
    </div>
  );
}

function ProductModal({ product, cats, onClose, onSave }) {
  const [f, setF] = useState({ ...product });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div className="center-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>{product.name ? "Editar producto" : "Nuevo producto"}</h3><button className="iconbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">
          <div className="field"><label>Nombre</label><input value={f.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div className="field"><label>Descripción</label><textarea value={f.desc} onChange={(e) => set("desc", e.target.value)} /></div>
          <div className="field"><label>Precio (COP)</label><input type="number" value={f.price} onChange={(e) => set("price", Number(e.target.value))} /></div>
          <div className="field"><label>Categoría</label><select value={f.cat} onChange={(e) => set("cat", e.target.value)}>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <ImageInput value={f.img} onChange={(v) => set("img", v)} />
          <label className="check"><input type="checkbox" checked={f.best} onChange={(e) => set("best", e.target.checked)} /> Marcar como “Lo más vendido”</label>
          <label className="check"><input type="checkbox" checked={f.active} onChange={(e) => set("active", e.target.checked)} /> Visible en el sitio</label>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancelar</button>
            <button className="btn btn-red" style={{ flex: 1, justifyContent: "center" }} onClick={() => f.name ? onSave(f) : null}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromoModal({ promo, onClose, onSave }) {
  const [f, setF] = useState({ ...promo });
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div className="center-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>{promo.title ? "Editar promoción" : "Nueva promoción"}</h3><button className="iconbtn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">
          <div className="field"><label>Título</label><input value={f.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div className="field"><label>Descripción</label><textarea value={f.desc} onChange={(e) => set("desc", e.target.value)} /></div>
          <div className="field"><label>Precio promo (COP)</label><input type="number" value={f.price} onChange={(e) => set("price", Number(e.target.value))} /></div>
          <div className="field"><label>Precio anterior (opcional, para mostrar tachado)</label><input type="number" value={f.oldPrice} onChange={(e) => set("oldPrice", Number(e.target.value))} /></div>
          <ImageInput value={f.img} onChange={(v) => set("img", v)} />
          <label className="check"><input type="checkbox" checked={f.active} onChange={(e) => set("active", e.target.checked)} /> Visible en el sitio</label>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>Cancelar</button>
            <button className="btn btn-red" style={{ flex: 1, justifyContent: "center" }} onClick={() => f.title ? onSave(f) : null}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Categorias({ data, persist, flash, setConfirm }) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const add = () => {
    if (!name.trim()) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12) + Date.now().toString().slice(-4);
    persist({ ...data, categories: [...data.categories, { id, name: name.trim(), note: note.trim() }] });
    setName(""); setNote(""); flash("Categoría creada");
  };
  const del = (id) => {
    if (data.products.some((p) => p.cat === id)) { flash("Mueve o elimina sus productos primero"); return; }
    persist({ ...data, categories: data.categories.filter((c) => c.id !== id) }); flash("Categoría eliminada");
  };
  return (
    <>
      <div className="card-block">
        <h4><Plus size={16} /> Nueva categoría</h4>
        <div className="field"><label>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Malteadas" /></div>
        <div className="field"><label>Subtítulo (opcional)</label><input value={note} onChange={(e) => setNote(e.target.value)} /></div>
        <button className="btn btn-red" onClick={add}>Crear categoría</button>
      </div>
      {data.categories.map((c) => (
        <div className="admin-row" key={c.id}>
          <div className="ar-main"><div className="n">{c.name}</div><div className="m">{c.note}</div></div>
          <span className="pill-cat">{data.products.filter((p) => p.cat === c.id).length} items</span>
          <button className="rowbtn danger" onClick={() => setConfirm({ msg: `¿Eliminar categoría "${c.name}"?`, fn: () => del(c.id) })}><Trash2 size={15} /></button>
        </div>
      ))}
    </>
  );
}

function Ajustes({ data, persist, flash, setConfirm }) {
  const [c, setC] = useState({ ...data.config });
  const set = (k, v) => setC((s) => ({ ...s, [k]: v }));
  const saveContacto = () => { persist({ ...data, config: c }); flash("Ajustes guardados"); };
  const fileRef = useRef();

  const heroPick = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const url = await fileToDataURL(f, 1200, 0.72);
    const nc = { ...c, heroImage: url }; setC(nc); persist({ ...data, config: nc }); flash("Imagen principal actualizada");
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "fresas-y-crema-menu.json"; a.click();
  };
  const importRef = useRef();
  const importJson = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader(); r.onload = () => { try { persist(JSON.parse(r.result)); flash("Menú importado"); } catch { flash("Archivo inválido"); } }; r.readAsText(f);
  };

  return (
    <>
      <div className="card-block">
        <h4><Phone size={16} /> Contacto</h4>
        <div className="field"><label>Nombre del negocio</label><input value={c.name} onChange={(e) => set("name", e.target.value)} /></div>
        <div className="field"><label>Frase / eslogan</label><input value={c.tagline} onChange={(e) => set("tagline", e.target.value)} /></div>
        <div className="field"><label>WhatsApp (con indicativo, solo números)</label><input value={c.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="573001234567" /><div className="hint">Ej: 57 + tu número. A este llegan los pedidos.</div></div>
        <div className="field"><label>Instagram (URL)</label><input value={c.instagram} onChange={(e) => set("instagram", e.target.value)} /></div>
        <div className="field"><label>Dirección</label><input value={c.address} onChange={(e) => set("address", e.target.value)} /></div>
        <div className="field"><label>Horarios</label><input value={c.hours} onChange={(e) => set("hours", e.target.value)} /></div>
        <button className="btn btn-red" onClick={saveContacto}>Guardar cambios</button>
      </div>

      <div className="card-block">
        <h4><ImageIcon size={16} /> Imagen principal (portada)</h4>
        {c.heroImage && <div className="img-preview" style={{ backgroundImage: `url(${c.heroImage})`, height: 150 }} />}
        <button className="btn btn-ghost" onClick={() => fileRef.current.click()}><Upload size={15} /> Subir portada</button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={heroPick} />
        {c.heroImage && <button className="rowbtn danger" style={{ marginLeft: 8 }} onClick={() => { const nc = { ...c, heroImage: "" }; setC(nc); persist({ ...data, config: nc }); }}><Trash2 size={14} /></button>}
      </div>

      <div className="card-block">
        <h4><Settings size={16} /> Seguridad</h4>
        <div className="field"><label>Clave del panel</label><input value={c.adminPassword} onChange={(e) => set("adminPassword", e.target.value)} /></div>
        <button className="btn btn-red" onClick={saveContacto}>Actualizar clave</button>
      </div>

      <div className="card-block">
        <h4><Download size={16} /> Copia de seguridad</h4>
        <p className="hint" style={{ marginTop: 0 }}>Respalda o restablece tu menú.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={exportJson}><Download size={15} /> Exportar menú</button>
          <button className="btn btn-ghost" onClick={() => importRef.current.click()}><Upload size={15} /> Importar menú</button>
          <button className="btn btn-ghost" onClick={() => setConfirm({ msg: "¿Restablecer al menú original?", fn: () => { persist(DEFAULT_DATA); flash("Menú restablecido"); } })}><RotateCcw size={15} /> Restablecer</button>
        </div>
        <input ref={importRef} type="file" accept="application/json" hidden onChange={importJson} />
      </div>
    </>
  );
}
