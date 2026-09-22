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
  const hStr = String(h).padStart(2,'0');
  const el = document.getElementById('sb-datetime');
  if (el) el.textContent = `${d}-${m}-${y} ${hStr}:${min} ${ampm}`;
}
updateClock();
setInterval(updateClock, 30000);

// ===== ANIMATE PROGRESS BARS =====
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.prog-bar').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = w; }, 200);
    });
  });
});

// ===== FILTER TABLE =====
const searchInput = document.getElementById('search-prod');
const filterDate  = document.getElementById('filter-date');
const filterLoom  = document.getElementById('filter-loom');
const filterShift = document.getElementById('filter-shift');
const filterQual  = document.getElementById('filter-quality');
const tableBody   = document.querySelector('#production-table tbody');

function filterTable() {
  const search = (searchInput?.value || '').toLowerCase();
  const loom   = filterLoom?.value   || 'All Looms';
  const shift  = filterShift?.value  || 'All Shifts';
  const qual   = filterQual?.value   || 'All Quality';

  if (!tableBody) return;
  tableBody.querySelectorAll('tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    const cells = row.querySelectorAll('td');
    const rowLoom  = cells[2]?.textContent.trim();
    const rowShift = cells[3]?.textContent.trim();
    const rowQual  = cells[6]?.textContent.trim();

    const matchSearch = !search || text.includes(search);
    const matchLoom   = loom  === 'All Looms'   || rowLoom === loom;
    const matchShift  = shift === 'All Shifts'  || rowShift === shift;
    const matchQual   = qual  === 'All Quality' || rowQual === qual;

    row.style.display = (matchSearch && matchLoom && matchShift && matchQual) ? '' : 'none';
  });
}

[searchInput, filterLoom, filterShift, filterQual].forEach(el => {
  el?.addEventListener('change', filterTable);
  el?.addEventListener('input', filterTable);
});

// ===== BUTTON HANDLERS =====
function toast(msg, color) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:34px;right:20px;background:${color};color:#fff;
    padding:9px 16px;border-radius:6px;font-family:'Chakra Petch',sans-serif;font-weight:700;
    font-size:12px;letter-spacing:.04em;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.5)`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

document.getElementById('btn-add-prod')?.addEventListener('click', () => toast('Opening Add Production form...', '#be1a1a'));
document.getElementById('btn-export')?.addEventListener('click',   () => toast('Exporting production data...', '#166534'));
document.getElementById('btn-fab-add')?.addEventListener('click',  () => toast('Opening Add Production form...', '#be1a1a'));

// ===== ACTION BUTTON CLICKS =====
document.querySelectorAll('.act-view').forEach(btn => {
  btn.addEventListener('click', function() {
    const row = this.closest('tr');
    const id = row?.querySelector('.entry-id')?.textContent;
    toast(`Viewing entry: ${id}`, '#1d4ed8');
  });
});
document.querySelectorAll('.act-edit').forEach(btn => {
  btn.addEventListener('click', function() {
    const row = this.closest('tr');
    const id = row?.querySelector('.entry-id')?.textContent;
    toast(`Editing entry: ${id}`, '#b45309');
  });
});
document.querySelectorAll('.act-del').forEach(btn => {
  btn.addEventListener('click', function() {
    const row = this.closest('tr');
    const id = row?.querySelector('.entry-id')?.textContent;
    if (confirm(`Delete entry ${id}?`)) {
      row.style.opacity = '0';
      row.style.transition = 'opacity .3s';
      setTimeout(() => row.remove(), 300);
      toast(`Deleted: ${id}`, '#7f1d1d');
    }
  });
});
