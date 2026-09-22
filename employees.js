// ============================================================
// EMPLOYEES JAVASCRIPT — Udayaravi Weave Master
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

// ===== SUB-TABS SWITCHING =====
const subtabs = document.querySelectorAll('.subtab-btn');
subtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    subtabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabName = tab.textContent.trim();
    showToast(`View switched to: ${tabName}`);
  });
});

// ===== EMPLOYEE FILTERING & SEARCH =====
const fDept = document.getElementById('f-dept');
const fRole = document.getElementById('f-role');
const fStatus = document.getElementById('f-status');
const fSearch = document.getElementById('f-search-emp');
const gSearch = document.getElementById('g-search');
const btnSearch = document.getElementById('btn-search');
const btnReset = document.getElementById('btn-reset');
const btnAddEmp = document.getElementById('btn-add-emp');
const rows = document.querySelectorAll('#table-employees tbody tr');
const countDisplay = document.querySelector('.tc-count');

function applyFilters() {
  const query = (fSearch?.value || gSearch?.value || '').toLowerCase().trim();
  const deptVal = fDept ? fDept.value : 'All Departments';
  const roleVal = fRole ? fRole.value : 'All Roles';
  const statusVal = fStatus ? fStatus.value : 'All Status';

  let visibleCount = 0;

  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    const dept = r.getAttribute('data-dept') || '';
    const role = r.getAttribute('data-role') || '';
    const status = r.getAttribute('data-status') || '';

    const matchQuery = !query || text.includes(query);
    const matchDept = (deptVal === 'All Departments') || (dept.toLowerCase() === deptVal.toLowerCase());
    const matchRole = (roleVal === 'All Roles') || (role.toLowerCase() === roleVal.toLowerCase());
    const matchStatus = (statusVal === 'All Status') || (status.toLowerCase() === statusVal.toLowerCase());

    if (matchQuery && matchDept && matchRole && matchStatus) {
      r.style.display = '';
      visibleCount++;
    } else {
      r.style.display = 'none';
    }
  });

  if (countDisplay) {
    countDisplay.textContent = `Showing 1 - ${visibleCount} of 42 employees`;
  }
}

if (fSearch) fSearch.addEventListener('input', applyFilters);
if (gSearch) gSearch.addEventListener('input', applyFilters);
if (fDept) fDept.addEventListener('change', applyFilters);
if (fRole) fRole.addEventListener('change', applyFilters);
if (fStatus) fStatus.addEventListener('change', applyFilters);

if (btnSearch) {
  btnSearch.addEventListener('click', () => {
    applyFilters();
    showToast('Filters & search applied');
  });
}

if (btnReset) {
  btnReset.addEventListener('click', () => {
    if (fSearch) fSearch.value = '';
    if (gSearch) gSearch.value = '';
    if (fDept) fDept.selectedIndex = 0;
    if (fRole) fRole.selectedIndex = 0;
    if (fStatus) fStatus.selectedIndex = 0;
    rows.forEach(r => r.style.display = '');
    if (countDisplay) countDisplay.textContent = 'Showing 1 - 10 of 42 employees';
    showToast('Filters reset to default');
  });
}

// ===== ADD EMPLOYEE MODAL / ACTION =====
if (btnAddEmp) {
  btnAddEmp.addEventListener('click', () => {
    showToast('Opening "Add New Employee" form...');
  });
}

// ===== BOTTOM MANAGEMENT TILES =====
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const title = tile.querySelector('.tile-title')?.textContent || 'Action';
    showToast(`Navigating to ${title}...`);
  });
});

// ===== ROW ACTIONS =====
document.querySelectorAll('.act-ic-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const action = btn.getAttribute('data-action') || 'Action';
    const row = btn.closest('tr');
    const name = row?.querySelector('.emp-name-cell')?.textContent?.trim() || 'Employee';
    showToast(`${action}: ${name}`);
  });
});

// ===== TOAST NOTIFICATION HELPER =====
function showToast(msg) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}
