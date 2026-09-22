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
  const el = document.getElementById('sb-dt');
  if (el) el.textContent = `${d}-${m}-${y} ${String(h).padStart(2,'0')}:${min} ${ampm}`;
}
updateClock(); setInterval(updateClock, 30000);

// ===== MONTH WISE SALES BAR CHART =====
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('monthChart');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  canvas.width  = wrap.clientWidth  || 320;
  canvas.height = wrap.clientHeight || 130;

  const ctx = canvas.getContext('2d');
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // Values in lakhs
  const data = [3.2, 2.5, 4.2, 3.8, 5.5, 6.8, 8.0, 10.0, 8.5, 9.2, 7.5, 5.8];
  const maxVal = 11;

  const W = canvas.width, H = canvas.height;
  const padL = 26, padR = 4, padT = 6, padB = 18;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = (chartW / labels.length) * 0.55;
  const groupW = chartW / labels.length;

  ctx.clearRect(0, 0, W, H);

  // Grid
  [0, 2, 4, 6, 8, 10].forEach(v => {
    const y = padT + chartH * (1 - v / maxVal);
    ctx.strokeStyle = 'rgba(26,42,60,.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3,4]);
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#3a5a78';
    ctx.font = '7px Chakra Petch,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v, padL - 3, y + 3);
  });

  // Bars
  data.forEach((val, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const bh = (val / maxVal) * chartH;
    const by = padT + chartH - bh;
    const isAug = i === 7; // Highlighted bar

    const g = ctx.createLinearGradient(0, by, 0, by + bh);
    if (isAug) {
      g.addColorStop(0, '#fbbf24');
      g.addColorStop(1, '#d97706');
      ctx.shadowColor = 'rgba(251,191,36,.5)';
      ctx.shadowBlur = 8;
    } else {
      g.addColorStop(0, '#22d3ee');
      g.addColorStop(1, '#0e7490');
      ctx.shadowColor = 'rgba(34,211,238,.25)';
      ctx.shadowBlur = 4;
    }

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(cx - barW / 2, by, barW, bh, [2, 2, 0, 0]);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = isAug ? '#fde68a' : '#3a5a78';
    ctx.font = `${isAug ? 'bold ' : ''}7.5px Chakra Petch,sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], cx, H - 3);
  });

  // Y-axis label
  ctx.save();
  ctx.translate(9, padT + chartH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#3a5a78';
  ctx.font = '7px Chakra Petch,sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('₹ (Lakhs)', 0, 0);
  ctx.restore();
});

// ===== TABLE FILTERING =====
const rows = document.querySelectorAll('#sales-table tbody tr');
function applyFilters() {
  const pay   = document.getElementById('f-pstatus')?.value || 'All';
  const order = document.getElementById('f-ostatus')?.value || 'All Status';
  const cust  = document.getElementById('f-cust')?.value   || 'All Customers';
  const gs    = (document.getElementById('global-search')?.value || '').toLowerCase();

  rows.forEach(row => {
    const rowPay   = row.dataset.pay   || '';
    const rowOrder = row.dataset.order || '';
    const text     = row.textContent.toLowerCase();
    const custCell = row.querySelector('.cust-name')?.textContent || '';

    const okPay   = pay   === 'All'           || rowPay === pay;
    const okOrder = order === 'All Status'    || rowOrder === order;
    const okCust  = cust  === 'All Customers' || custCell.includes(cust);
    const okGs    = !gs || text.includes(gs);

    row.style.display = (okPay && okOrder && okCust && okGs) ? '' : 'none';
  });
}

['f-pstatus','f-ostatus','f-cust'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', applyFilters);
});
document.getElementById('global-search')?.addEventListener('input', applyFilters);
document.getElementById('btn-search')?.addEventListener('click', applyFilters);
document.getElementById('btn-reset')?.addEventListener('click', () => {
  ['f-from','f-to','f-cust','f-ostatus','f-pstatus'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
  const gs = document.getElementById('global-search');
  if (gs) gs.value = '';
  rows.forEach(r => r.style.display = '');
});

// ===== TOAST =====
function toast(msg, color = '#1d4ed8') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:30px;right:18px;background:${color};color:#fff;
    padding:8px 14px;border-radius:5px;font-family:'Chakra Petch',sans-serif;font-weight:700;
    font-size:11.5px;letter-spacing:.04em;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.5)`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

document.getElementById('btn-new-sale')?.addEventListener('click', () => toast('Opening New Sale form...','#1d4ed8'));
document.getElementById('btn-new-quot')?.addEventListener('click', () => toast('Opening New Quotation form...','#1d4ed8'));
document.getElementById('btn-add-cust')?.addEventListener('click', () => toast('Opening Add Customer form...','#1d4ed8'));
document.getElementById('btn-print')?.addEventListener('click',    () => toast('Opening Print Invoice...','#1a2535'));
document.getElementById('btn-export')?.addEventListener('click',   () => toast('Exporting sales data...','#1a2535'));

// Action buttons
document.querySelectorAll('.av').forEach(b => b.addEventListener('click', function() {
  const inv = this.closest('tr')?.querySelector('.inv-no')?.textContent;
  toast(`Viewing: ${inv}`,'#1d4ed8');
}));
document.querySelectorAll('.ae').forEach(b => b.addEventListener('click', function() {
  const inv = this.closest('tr')?.querySelector('.inv-no')?.textContent;
  toast(`Editing: ${inv}`,'#b45309');
}));
document.querySelectorAll('.ap').forEach(b => b.addEventListener('click', function() {
  const inv = this.closest('tr')?.querySelector('.inv-no')?.textContent;
  toast(`Printing: ${inv}`,'#334155');
}));
document.querySelectorAll('.ad').forEach(b => b.addEventListener('click', function() {
  const row = this.closest('tr');
  const inv = row?.querySelector('.inv-no')?.textContent;
  if (confirm(`Delete order ${inv}?`)) {
    row.style.opacity = '0'; row.style.transition = 'opacity .3s';
    setTimeout(() => row.remove(), 300);
    toast(`Deleted: ${inv}`,'#7f1d1d');
  }
}));

// Animate pipeline bars on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pipe-bar').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => setTimeout(() => { bar.style.width = w; }, 300));
  });
});
