// ============================================================
// CUSTOMERS JAVASCRIPT — Udayaravi Weave Master
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

// ===== CUSTOMER FILTERING & SEARCH =====
const fSearch = document.getElementById('f-search-cust');
const gSearch = document.getElementById('g-search');
const fType = document.getElementById('f-cust-type');
const fCity = document.getElementById('f-city');
const fStatus = document.getElementById('f-status');
const btnSearch = document.getElementById('btn-search');
const btnReset = document.getElementById('btn-reset');
const btnExport = document.getElementById('btn-export');
const btnAddCust = document.getElementById('btn-add-customer');
const rows = document.querySelectorAll('#table-customers tbody tr');
const countDisplay = document.querySelector('.t-count');

function applyFilters() {
  const query = (fSearch?.value || gSearch?.value || '').toLowerCase().trim();
  const typeVal = fType ? fType.value : 'All Types';
  const cityVal = fCity ? fCity.value : 'All Cities';
  const statusVal = fStatus ? fStatus.value : 'All Status';

  let visibleCount = 0;

  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const type = r.getAttribute('data-type') || '';
    const status = r.getAttribute('data-status') || '';
    const city = r.children[4]?.textContent || '';

    const matchQuery = !query || text.includes(query);
    const matchType = (typeVal === 'All Types') || (type.toLowerCase() === typeVal.toLowerCase());
    const matchCity = (cityVal === 'All Cities') || (city.toLowerCase() === cityVal.toLowerCase());
    const matchStatus = (statusVal === 'All Status') || (status.toLowerCase() === statusVal.toLowerCase());

    if (matchQuery && matchType && matchCity && matchStatus) {
      r.style.display = '';
      visibleCount++;
    } else {
      r.style.display = 'none';
    }
  });

  if (countDisplay) {
    countDisplay.textContent = `Showing 1 - ${visibleCount} of 156 customers`;
  }
}

if (fSearch) fSearch.addEventListener('input', applyFilters);
if (gSearch) gSearch.addEventListener('input', applyFilters);
if (fType) fType.addEventListener('change', applyFilters);
if (fCity) fCity.addEventListener('change', applyFilters);
if (fStatus) fStatus.addEventListener('change', applyFilters);
if (btnSearch) btnSearch.addEventListener('click', () => {
  applyFilters();
  showToast('Filters & search applied');
});

if (btnReset) {
  btnReset.addEventListener('click', () => {
    if (fSearch) fSearch.value = '';
    if (gSearch) gSearch.value = '';
    if (fType) fType.selectedIndex = 0;
    if (fCity) fCity.selectedIndex = 0;
    if (fStatus) fStatus.selectedIndex = 0;
    rows.forEach(r => r.style.display = '');
    if (countDisplay) countDisplay.textContent = 'Showing 1 - 10 of 156 customers';
    showToast('Filters reset to default');
  });
}

if (btnExport) {
  btnExport.addEventListener('click', () => {
    showToast('Exporting Customer Data to Excel / CSV...');
  });
}

if (btnAddCust) {
  btnAddCust.addEventListener('click', () => {
    showToast('Opening Add Customer modal dialog...');
  });
}

// Table action buttons
document.querySelectorAll('.t-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const title = btn.getAttribute('title') || 'Action';
    const row = btn.closest('tr');
    const custName = row ? row.querySelector('.td-name')?.textContent : '';
    showToast(`${title} clicked: ${custName}`);
  });
});

// Row click preview
rows.forEach(r => {
  r.addEventListener('click', () => {
    const custName = r.querySelector('.td-name')?.textContent;
    const code = r.querySelector('.td-code')?.textContent;
    showToast(`Selected ${custName} (${code})`);
  });
});

// Toast notification
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
