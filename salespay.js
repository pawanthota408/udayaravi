// ============================================================
// SALES & PAYMENTS JAVASCRIPT — Udayaravi Weave Master
// ============================================================

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
updateClock();
setInterval(updateClock, 30000);

// ===== TAB SWITCHING =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    // Redraw charts when visible
    setTimeout(() => {
      if (target === 'sales') {
        drawSalesChart();
      } else if (target === 'payments') {
        drawPayChart();
      }
    }, 50);
  });
});

// ===== CHART 1: MONTH WISE SALES BAR CHART =====
function drawSalesChart() {
  const canvas = document.getElementById('salesMonthChart');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  canvas.width = wrap.clientWidth || 340;
  canvas.height = wrap.clientHeight || 120;

  const ctx = canvas.getContext('2d');
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data = [3.2, 2.5, 4.2, 3.8, 5.5, 6.8, 8.0, 10.2, 8.5, 9.2, 7.5, 5.8];
  const maxVal = 12;

  const W = canvas.width, H = canvas.height;
  const padL = 26, padR = 6, padT = 8, padB = 18;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupW = chartW / labels.length;
  const barW = Math.min(groupW * 0.58, 20);

  ctx.clearRect(0, 0, W, H);

  // Horizontal Grid Lines
  [0, 3, 6, 9, 12].forEach(v => {
    const y = padT + chartH * (1 - v / maxVal);
    ctx.strokeStyle = 'rgba(30, 50, 75, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#64748b';
    ctx.font = '9px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v, padL - 4, y + 3);
  });

  // Bars
  data.forEach((val, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const bh = (val / maxVal) * chartH;
    const by = padT + chartH - bh;
    const isAug = i === 7; // Highlight current month

    const grad = ctx.createLinearGradient(0, by, 0, by + bh);
    if (isAug) {
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(1, '#d97706');
      ctx.shadowColor = 'rgba(245,158,11,0.35)';
      ctx.shadowBlur = 6;
    } else {
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(1, '#0284c7');
      ctx.shadowColor = 'rgba(56,189,248,0.15)';
      ctx.shadowBlur = 3;
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(cx - barW / 2, by, barW, bh, [3, 3, 0, 0]);
    } else {
      ctx.rect(cx - barW / 2, by, barW, bh);
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Month Label
    ctx.fillStyle = isAug ? '#f59e0b' : '#94a3b8';
    ctx.font = `${isAug ? '600 ' : '400 '}9px "Inter", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], cx, H - 3);
  });

  // Y-axis label
  ctx.save();
  ctx.translate(9, padT + chartH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#64748b';
  ctx.font = '8.5px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('₹ Lakhs', 0, 0);
  ctx.restore();
}

// ===== CHART 2: 7-DAY PAYMENT TREND BAR CHART =====
function drawPayChart() {
  const canvas = document.getElementById('payTrendChart');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  canvas.width = wrap.clientWidth || 340;
  canvas.height = wrap.clientHeight || 120;

  const ctx = canvas.getContext('2d');
  const labels = ['07-Aug','08-Aug','09-Aug','10-Aug','11-Aug','12-Aug','13-Aug'];
  const data = [75, 20, 48, 27, 65, 21, 78.5]; // in thousands
  const maxVal = 90;

  const W = canvas.width, H = canvas.height;
  const padL = 26, padR = 6, padT = 8, padB = 18;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupW = chartW / labels.length;
  const barW = Math.min(groupW * 0.55, 22);

  ctx.clearRect(0, 0, W, H);

  // Horizontal Grid Lines
  [0, 30, 60, 90].forEach(v => {
    const y = padT + chartH * (1 - v / maxVal);
    ctx.strokeStyle = 'rgba(30, 50, 75, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#64748b';
    ctx.font = '9px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v + 'k', padL - 4, y + 3);
  });

  // Bars
  data.forEach((val, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const bh = (val / maxVal) * chartH;
    const by = padT + chartH - bh;
    const isToday = i === 6;

    const grad = ctx.createLinearGradient(0, by, 0, by + bh);
    if (isToday) {
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(1, '#059669');
      ctx.shadowColor = 'rgba(16,185,129,0.35)';
      ctx.shadowBlur = 6;
    } else {
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#1d4ed8');
      ctx.shadowColor = 'rgba(59,130,246,0.15)';
      ctx.shadowBlur = 3;
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(cx - barW / 2, by, barW, bh, [3, 3, 0, 0]);
    } else {
      ctx.rect(cx - barW / 2, by, barW, bh);
    }
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = isToday ? '#34d399' : '#94a3b8';
    ctx.font = `${isToday ? '600 ' : '400 '}8.5px "Inter", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], cx, H - 3);
  });

  // Y-axis label
  ctx.save();
  ctx.translate(9, padT + chartH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#64748b';
  ctx.font = '8.5px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('₹ Thousands', 0, 0);
  ctx.restore();
}

// Initial Draw & Resize
window.addEventListener('DOMContentLoaded', () => {
  drawSalesChart();
});
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab && activeTab.id === 'tab-sales') {
    drawSalesChart();
  } else if (activeTab && activeTab.id === 'tab-payments') {
    drawPayChart();
  }
});

// ===== SEARCH & TABLE FILTERING =====
const gSearch = document.getElementById('g-search');
if (gSearch) {
  gSearch.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;
    const rows = activeTab.querySelectorAll('.dt tbody tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// Sales filter dropdowns
const sOrderFilter = document.getElementById('s-f-order');
const sPayFilter = document.getElementById('s-f-pay');

function applySalesFilters() {
  const ordVal = sOrderFilter ? sOrderFilter.value : 'All Status';
  const payVal = sPayFilter ? sPayFilter.value : 'All';
  const rows = document.querySelectorAll('#sales-tbl tbody tr');

  rows.forEach(r => {
    const ord = r.getAttribute('data-ord') || '';
    const pay = r.getAttribute('data-pay') || '';

    const matchOrd = (ordVal === 'All Status') || (ord === ordVal);
    const matchPay = (payVal === 'All') || (pay === payVal);

    r.style.display = (matchOrd && matchPay) ? '' : 'none';
  });
}

if (sOrderFilter) sOrderFilter.addEventListener('change', applySalesFilters);
if (sPayFilter) sPayFilter.addEventListener('change', applySalesFilters);

// Reset buttons
document.querySelectorAll('.rbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (sOrderFilter) sOrderFilter.value = 'All Status';
    if (sPayFilter) sPayFilter.value = 'All';
    if (gSearch) gSearch.value = '';
    const rows = document.querySelectorAll('.dt tbody tr');
    rows.forEach(r => r.style.display = '');
  });
});

// Action button interactive toast feedback
function showToast(msg) {
  let toast = document.getElementById('wm-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wm-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 25px;
      background: #111827;
      border: 1px solid #f59e0b;
      color: #f8fafc;
      padding: 10px 18px;
      border-radius: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.01em;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(245,158,11,0.2);
      z-index: 9999;
      opacity: 0;
      transform: translateY(10px);
      transition: all .25s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2200);
}

document.querySelectorAll('.abtn').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(`Action Triggered: ${btn.textContent.trim().replace(/^[\+\🖨⬇📩\s]+/, '')}`);
  });
});
