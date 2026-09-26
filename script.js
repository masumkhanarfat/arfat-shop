const PRODUCTS = [
  {
    id:1,
    name:"Premium Textured Jacquard Cotton Blend Fabric Shirt",
    cat:"summer",
    price:450,
    old:null,
    tag:"New",
    color:"#c6f135", 
    img:"/assets/Premium Textured Jacquard Cotton Blend Fabric Shirt.png"
  },
  {
    id:2,
    name:"REAL MADRID CUSTOM JERSEY",
    cat:"summer",
    price:450,
    old:650,
    tag:"Sale",
    color:"#e0e0d8",
    img:"/assets/REAL MADRID CUSTOM JERSEY – EMERALD GREEN (7 EDITION).png"
  },
  {
    id:3,
    name:"Premium Rugby Sweatshirt",
    cat:"winter",
    price:34,
    old:null,
    tag:null,
    color:"#8b8bff",
    img:"/assets/IMG_7973.jpeg"
  },
  {
    id:4,
    name:"Momentum Joggers",cat:"bottoms",
    price:64,
    old:null,
    tag:"New",
    color:"#c6f135"
  },
  {
    id:5,
    name:"Flex Training Shorts",
    cat:"bottoms",
    price:42,
    old:null,
    tag:null,
    color:"#ff8a5c"
  },
  {
    id:6,
    name:"Grid Seamless Leggings",
    cat:"bottoms",
    price:58,
    old:72,
    tag:"Sale",
    color:"#5cd6c0"
  },
  {
    id:7,
    name:"Shell Windbreaker",
    cat:"outerwear",
    price:98,
    old:null,
    tag:null,
    color:"#f2f2ee"
  },
  {id:8,name:"Thermal Zip Hoodie",cat:"outerwear",price:86,old:null,tag:"New",color:"#c6f135"},
  {id:9,name:"Grip Training Socks (3pk)",cat:"accessories",price:18,old:null,tag:null,color:"#ff8a5c"},
  {id:10,name:"Structured Gym Cap",cat:"accessories",price:26,old:null,tag:null,color:"#8b8bff"},
  {id:11,name:"Utility Waist Bag",cat:"accessories",price:32,old:40,tag:"Sale",color:"#5cd6c0"},
  {id:12,name:"Core Half-Zip",cat:"tops",price:56,old:null,tag:null,color:"#e0e0d8"},
];

let activeFilter = "all";
let cart = {}; // id -> qty

function iconSvg(color){
  return `<svg viewBox="0 0 100 100" fill="none"><path d="M30 14 L14 24 L20 40 L30 34 L30 88 L70 88 L70 34 L80 40 L86 24 L70 14 C70 14 62 20 50 20 C38 20 30 14 30 14 Z" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
}






function renderGrid() {
  const grid = document.getElementById('productGrid');
  const items = PRODUCTS.filter(p => activeFilter === 'all' || p.cat === activeFilter);
  document.getElementById('resultCount').textContent = items.length + ' items';
  grid.innerHTML = items.map(p => `
    <div class="card">
      <div class="card-img">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        ${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">` : iconSvg(p.color, p.icon)}
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-price">
          <span>${p.old ? `<span class="old-price">$${p.old}</span>` : ''}<span class="price">$${p.price}</span></span>
          <button class="add-btn" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id){
  cart[id] = (cart[id]||0)+1;
  renderCart();
  openCart();
}
function changeQty(id,delta){
  cart[id] = (cart[id]||0)+delta;
  if(cart[id]<=0) delete cart[id];
  renderCart();
}

function renderCart() {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  document.getElementById('cartCount').textContent = count;
  const container = document.getElementById('drawerItems');
  if (ids.length === 0) {
    container.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
  } else {
    container.innerHTML = ids.map(id => {
      const p = PRODUCTS.find(x => x.id == id);
      return `<div class="drawer-item">
        <div class="drawer-thumb" style="overflow:hidden;">
          ${p.img ? `<img src="${p.img}" style="width:100%;height:100%;object-fit:cover;">` : ''}
        </div>
        <div style="flex:1;">
          <div class="name">${p.name}</div>
          <div class="meta">$${p.price}</div>
          <div class="qty">
            <button onclick="changeQty(${id},-1)">−</button>
            <span>${cart[id]}</span>
            <button onclick="changeQty(${id},1)">+</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  const total = ids.reduce((s, id) => s + cart[id] * PRODUCTS.find(x => x.id == id).price, 0);
  document.getElementById('subtotal').textContent = '$' + total;
}

function openCart(){
  document.getElementById('drawer').classList.add('show');
  document.getElementById('overlay').classList.add('show');
}
function closeCart(){
  document.getElementById('drawer').classList.remove('show');
  document.getElementById('overlay').classList.remove('show');
}

document.getElementById('cartOpenBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderGrid();
  });
});

renderGrid();
renderCart();