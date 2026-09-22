// ===== LIVE CLOCK =====
function updateClock() {
  const now = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = String(now.getDate()).padStart(2,'0');
  const m = months[now.getMonth()];
  const y = now.getFullYear();
  let h = now.getHours();
  const min = String(now.getMinutes()).padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const el = document.getElementById('sb-datetime');
  if (el) el.textContent = `${d}-${m}-${y} ${String(h).padStart(2,'0')}:${min} ${ampm}`;
}
updateClock();
setInterval(updateClock, 30000);

// ===== TABLE FILTERING =====
const fCat    = document.getElementById('f-cat');
const fType   = document.getElementById('f-type');
const fStatus = document.getElementById('f-status');
const fSearch = document.getElementById('f-search');
const gSearch = document.getElementById('global-search');
const rows    = document.querySelectorAll('#stock-table tbody tr');

function applyFilters() {
  const cat    = fCat?.value    || 'All Categories';
  const status = fStatus?.value || 'All';
  const search = (fSearch?.value || gSearch?.value || '').toLowerCase();

  rows.forEach(row => {
    const rowCat    = row.dataset.cat    || '';
    const rowStatus = row.dataset.status || '';
    const text      = row.textContent.toLowerCase();

    const okCat    = cat    === 'All Categories' || rowCat === cat;
    const okStatus = status === 'All'            || rowStatus === status;
    const okSearch = !search || text.includes(search);

    row.style.display = (okCat && okStatus && okSearch) ? '' : 'none';
  });
}

[fCat, fType, fStatus].forEach(el => el?.addEventListener('change', applyFilters));
[fSearch, gSearch].forEach(el => el?.addEventListener('input', applyFilters));

document.getElementById('btn-reset')?.addEventListener('click', () => {
  if (fCat)    fCat.value    = 'All Categories';
  if (fType)   fType.value   = 'All Types';
  if (fStatus) fStatus.value = 'All';
  if (fSearch) fSearch.value = '';
  if (gSearch) gSearch.value = '';
  applyFilters();
});

// ===== STOCK MOVEMENT BAR CHART =====
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('movementChart');
  if (!canvas) return;

  const parent = canvas.parentElement;
  canvas.width  = parent.clientWidth  || 300;
  canvas.height = parent.clientHeight || 110;

  const ctx = canvas.getContext('2d');

  const labels  = ['7 Aug','8 Aug','9 Aug','10 Aug','11 Aug','12 Aug','13 Aug'];
  const inward  = [320, 180, 240, 150, 380, 200, 420];
  const outward = [80,  60,  100, 200, 120, 180, 90];
  const maxVal  = 450;

  const W = canvas.width;
  const H = canvas.height;
  const padL = 28, padR = 8, padT = 8, padB = 20;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groups  = labels.length;
  const barW    = (chartW / groups) * 0.32;
  const groupW  = chartW / groups;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  [0, 0.25, 0.5, 0.75, 1].forEach(p => {
    const y = padT + chartH * (1 - p);
    ctx.strokeStyle = 'rgba(30,50,80,.55)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.setLineDash([]);

    const val = Math.round(maxVal * p);
    ctx.fillStyle = '#3a5a78';
    ctx.font = '8px Chakra Petch, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val, padL - 3, y + 3);
  });

  // Bars
  labels.forEach((lbl, i) => {
    const cx = padL + groupW * i + groupW / 2;

    // Inward bar
    const ih = (inward[i] / maxVal) * chartH;
    const iy = padT + chartH - ih;
    const gIn = ctx.createLinearGradient(0, iy, 0, iy + ih);
    gIn.addColorStop(0, '#4ade80');
    gIn.addColorStop(1, '#166534');
    ctx.fillStyle = gIn;
    ctx.shadowColor = 'rgba(34,197,94,.4)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.roundRect(cx - barW - 1, iy, barW, ih, [2, 2, 0, 0]);
    ctx.fill();

    // Outward bar
    const oh = (outward[i] / maxVal) * chartH;
    const oy = padT + chartH - oh;
    const gOut = ctx.createLinearGradient(0, oy, 0, oy + oh);
    gOut.addColorStop(0, '#fb923c');
    gOut.addColorStop(1, '#7c2d12');
    ctx.fillStyle = gOut;
    ctx.shadowColor = 'rgba(249,115,22,.4)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.roundRect(cx + 1, oy, barW, oh, [2, 2, 0, 0]);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = '#3a5a78';
    ctx.font = '7.5px Chakra Petch, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(lbl, cx, H - 4);
  });
});

// ===== TOAST =====
function toast(msg, color = '#1d4ed8') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:34px;right:20px;background:${color};color:#fff;
    padding:8px 16px;border-radius:6px;font-family:'Chakra Petch',sans-serif;font-weight:700;
    font-size:12px;letter-spacing:.04em;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.5);
    animation:slideIn .25s ease`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

document.getElementById('btn-add-item')?.addEventListener('click', () => toast('Opening Add Item form...','#1d4ed8'));
document.getElementById('btn-import')?.addEventListener('click',   () => toast('Import Excel feature...','#166534'));
document.getElementById('btn-export')?.addEventListener('click',   () => toast('Exporting stock data...','#1a2535'));
document.getElementById('btn-report')?.addEventListener('click',   () => toast('Generating stock report...','#3730a3'));

// Action buttons
document.querySelectorAll('.av').forEach(btn => btn.addEventListener('click', function() {
  const row = this.closest('tr');
  const code = row?.querySelector('.code-cell')?.textContent;
  const name = row?.querySelector('.name-cell')?.textContent;
  toast(`Viewing: ${code} — ${name}`, '#1d4ed8');
}));
document.querySelectorAll('.ae').forEach(btn => btn.addEventListener('click', function() {
  const code = this.closest('tr')?.querySelector('.code-cell')?.textContent;
  toast(`Editing: ${code}`, '#b45309');
}));
document.querySelectorAll('.ad').forEach(btn => btn.addEventListener('click', function() {
  const row = this.closest('tr');
  const code = row?.querySelector('.code-cell')?.textContent;
  if (confirm(`Delete item ${code}?`)) {
    row.style.opacity = '0'; row.style.transition = 'opacity .3s';
    setTimeout(() => row.remove(), 300);
    toast(`Deleted: ${code}`, '#7f1d1d');
  }
}));
