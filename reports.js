// ============================================================
// REPORTS JAVASCRIPT — Udayaravi Weave Master
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

// ===== MASTER TOGGLE =====
const tog = document.getElementById('master-tog');
const togTxt = document.getElementById('tog-txt');
if (tog && togTxt) {
  tog.addEventListener('change', () => {
    togTxt.textContent = tog.checked ? 'ON' : 'OFF';
    togTxt.style.color = tog.checked ? '#22c55e' : '#7a9ab8';
  });
}

// ===== CHART 1: SALES & PAYMENTS TREND (GROUPED BARS + OUTSTANDING LINE) =====
function drawSalesTrendChart() {
  const canvas = document.getElementById('chartSalesTrend');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  canvas.width = wrap.clientWidth || 360;
  canvas.height = wrap.clientHeight || 125;

  const ctx = canvas.getContext('2d');
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  // Sales in Lakhs
  const sales = [2.8, 3.8, 5.5, 4.2, 5.8, 7.2, 8.2, 8.9];
  // Payments Received in Lakhs
  const payments = [2.2, 3.2, 4.8, 4.0, 5.2, 6.5, 7.8, 7.8];
  // Outstanding in Lakhs (Line chart overlay)
  const outstanding = [1.2, 1.6, 2.0, 1.8, 2.2, 2.6, 2.5, 2.2];

  const maxVal = 12;
  const W = canvas.width, H = canvas.height;
  const padL = 28, padR = 10, padT = 8, padB = 18;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupW = chartW / labels.length;
  const barW = Math.min(groupW * 0.28, 9);
  const barGap = 2;

  ctx.clearRect(0, 0, W, H);

  // Horizontal Grid Lines
  const yTicks = [0, 3, 6, 9, 12];
  yTicks.forEach(v => {
    const y = padT + chartH * (1 - v / maxVal);
    ctx.strokeStyle = 'rgba(20, 40, 66, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#3e5a78';
    ctx.font = '7.5px "Chakra Petch", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(v === 0 ? '0' : `₹${v}L`, padL - 4, y + 2.5);
  });

  // Draw Bars (Sales + Payments)
  labels.forEach((month, i) => {
    const cx = padL + groupW * i + groupW / 2;

    // Sales Bar (Green)
    const sVal = sales[i];
    const sH = (sVal / maxVal) * chartH;
    const sY = padT + chartH - sH;
    const sX = cx - barW - barGap / 2;

    const gradGreen = ctx.createLinearGradient(0, sY, 0, sY + sH);
    gradGreen.addColorStop(0, '#22c55e');
    gradGreen.addColorStop(1, '#15803d');
    ctx.fillStyle = gradGreen;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(sX, sY, barW, sH, [2, 2, 0, 0]);
    } else {
      ctx.rect(sX, sY, barW, sH);
    }
    ctx.fill();

    // Payments Received Bar (Blue)
    const pVal = payments[i];
    const pH = (pVal / maxVal) * chartH;
    const pY = padT + chartH - pH;
    const pX = cx + barGap / 2;

    const gradBlue = ctx.createLinearGradient(0, pY, 0, pY + pH);
    gradBlue.addColorStop(0, '#0284c7');
    gradBlue.addColorStop(1, '#0369a1');
    ctx.fillStyle = gradBlue;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(pX, pY, barW, pH, [2, 2, 0, 0]);
    } else {
      ctx.rect(pX, pY, barW, pH);
    }
    ctx.fill();

    // X-Axis Month Label
    ctx.fillStyle = (i === labels.length - 1) ? '#fde68a' : '#7a9ab8';
    ctx.font = `${(i === labels.length - 1) ? 'bold ' : ''}7.5px "Chakra Petch", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(month, cx, H - 3);
  });

  // Draw Outstanding Line + Dots (Yellow)
  ctx.beginPath();
  labels.forEach((month, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const oVal = outstanding[i];
    const oY = padT + chartH * (1 - oVal / maxVal);
    if (i === 0) {
      ctx.moveTo(cx, oY);
    } else {
      ctx.lineTo(cx, oY);
    }
  });
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Dots
  labels.forEach((month, i) => {
    const cx = padL + groupW * i + groupW / 2;
    const oVal = outstanding[i];
    const oY = padT + chartH * (1 - oVal / maxVal);

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(cx, oY, 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
}

// ===== CHART 2: PRODUCTION REPORT (3 GROUPED BARS) =====
function drawProductionChart() {
  const canvas = document.getElementById('chartProduction');
  if (!canvas) return;

  const wrap = canvas.parentElement;
  canvas.width = wrap.clientWidth || 360;
  canvas.height = wrap.clientHeight || 125;

  const ctx = canvas.getContext('2d');
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  // Data: Finished Sarees (Cyan/Blue), Running Looms (Green), Rejected (Red)
  const finished = [22, 28, 25, 32, 38, 32, 34, 32];
  const running  = [18, 20, 19, 21, 23, 22, 22, 21];
  const rejected = [ 3,  5,  4,  6,  4,  5,  4,  6];

  const maxVal = 45;
  const W = canvas.width, H = canvas.height;
  const padL = 22, padR = 10, padT = 8, padB = 18;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupW = chartW / labels.length;
  const barW = Math.min(groupW * 0.22, 6.5);
  const barGap = 1.5;

  ctx.clearRect(0, 0, W, H);

  // Horizontal Grid Lines
  const yTicks = [0, 10, 20, 30, 40];
  yTicks.forEach(v => {
    const y = padT + chartH * (1 - v / maxVal);
    ctx.strokeStyle = 'rgba(20, 40, 66, 0.7)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#3e5a78';
    ctx.font = '7.5px "Chakra Petch", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(String(v), padL - 3, y + 2.5);
  });

  // Draw 3 Bars per group
  labels.forEach((month, i) => {
    const cx = padL + groupW * i + groupW / 2;

    // 1. Finished Sarees (Blue/Cyan)
    const fVal = finished[i];
    const fH = (fVal / maxVal) * chartH;
    const fY = padT + chartH - fH;
    const fX = cx - barW * 1.5 - barGap;

    const gradCyan = ctx.createLinearGradient(0, fY, 0, fY + fH);
    gradCyan.addColorStop(0, '#00b4d8');
    gradCyan.addColorStop(1, '#0077b6');
    ctx.fillStyle = gradCyan;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(fX, fY, barW, fH, [1.5, 1.5, 0, 0]);
    } else {
      ctx.rect(fX, fY, barW, fH);
    }
    ctx.fill();

    // 2. Running Looms (Green)
    const rVal = running[i];
    const rH = (rVal / maxVal) * chartH;
    const rY = padT + chartH - rH;
    const rX = cx - barW / 2;

    const gradGreen = ctx.createLinearGradient(0, rY, 0, rY + rH);
    gradGreen.addColorStop(0, '#22c55e');
    gradGreen.addColorStop(1, '#15803d');
    ctx.fillStyle = gradGreen;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(rX, rY, barW, rH, [1.5, 1.5, 0, 0]);
    } else {
      ctx.rect(rX, rY, barW, rH);
    }
    ctx.fill();

    // 3. Rejected (Red)
    const jVal = rejected[i];
    const jH = (jVal / maxVal) * chartH;
    const jY = padT + chartH - jH;
    const jX = cx + barW / 2 + barGap;

    const gradRed = ctx.createLinearGradient(0, jY, 0, jY + jH);
    gradRed.addColorStop(0, '#ef4444');
    gradRed.addColorStop(1, '#b91c1c');
    ctx.fillStyle = gradRed;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(jX, jY, barW, jH, [1.5, 1.5, 0, 0]);
    } else {
      ctx.rect(jX, jY, barW, jH);
    }
    ctx.fill();

    // Month Label
    ctx.fillStyle = '#7a9ab8';
    ctx.font = '7.5px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(month, cx, H - 3);
  });
}

// Initial draw and window resize handling
window.addEventListener('DOMContentLoaded', () => {
  drawSalesTrendChart();
  drawProductionChart();
});

window.addEventListener('resize', () => {
  drawSalesTrendChart();
  drawProductionChart();
});

// ===== SEARCH FILTERING =====
const gSearch = document.getElementById('g-search');
if (gSearch) {
  gSearch.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#table-report-list tbody tr');
    rows.forEach(r => {
      const txt = r.textContent.toLowerCase();
      r.style.display = txt.includes(q) ? '' : 'none';
    });
  });
}

// ===== FILTER CONTROLS (APPLY & RESET) =====
const btnApply = document.getElementById('btn-apply');
const btnReset = document.getElementById('btn-reset');

if (btnApply) {
  btnApply.addEventListener('click', () => {
    const repType = document.getElementById('f-rep-type').value;
    const rows = document.querySelectorAll('#table-report-list tbody tr');
    rows.forEach(r => {
      if (repType === 'All Reports') {
        r.style.display = '';
      } else {
        const name = r.querySelector('.td-bold')?.textContent || '';
        r.style.display = name.includes(repType) ? '' : 'none';
      }
    });
    showToast(`Filters Applied: ${repType}`);
  });
}

if (btnReset) {
  btnReset.addEventListener('click', () => {
    document.getElementById('f-from-date').selectedIndex = 0;
    document.getElementById('f-to-date').selectedIndex = 0;
    document.getElementById('f-rep-type').selectedIndex = 0;
    document.getElementById('f-category').selectedIndex = 0;
    document.getElementById('f-product').selectedIndex = 0;
    document.getElementById('f-customer').selectedIndex = 0;
    if (gSearch) gSearch.value = '';
    const rows = document.querySelectorAll('#table-report-list tbody tr');
    rows.forEach(r => r.style.display = '');
    showToast('Filters Reset to Default');
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  let toast = document.getElementById('wm-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wm-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 25px;
      background: #0d1e34;
      border: 1px solid #f0a500;
      color: #fde68a;
      padding: 8px 16px;
      border-radius: 6px;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .05em;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(240,165,0,0.3);
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

// Quick generate button triggers
document.querySelectorAll('.q-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const reportName = btn.querySelector('span')?.textContent || 'Report';
    showToast(`Generating ${reportName}...`);
  });
});

// Export option triggers
document.querySelectorAll('.exp-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const expType = tile.querySelector('.exp-name')?.textContent || 'File';
    showToast(`Exporting Reports to ${expType}...`);
  });
});

// Table action buttons
document.querySelectorAll('.t-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = btn.getAttribute('title') || 'Action';
    showToast(`${title} clicked`);
  });
});

// Add Scheduled Report button
document.getElementById('btn-add-sched')?.addEventListener('click', () => {
  showToast('Opening Add Scheduled Report Dialog...');
});
