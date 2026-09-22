// ============================================================
// SETTINGS JAVASCRIPT — Udayaravi Weave Master
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
    showToast(`Settings section: ${tabName}`);
  });
});

// ===== BUTTON ACTIONS & FORMS =====
const btnSaveCompany = document.getElementById('btn-save-company');
if (btnSaveCompany) {
  btnSaveCompany.addEventListener('click', () => {
    showToast('Company information saved successfully!');
  });
}

const btnSavePrefs = document.getElementById('btn-save-prefs');
if (btnSavePrefs) {
  btnSavePrefs.addEventListener('click', () => {
    showToast('System preferences updated!');
  });
}

const btnChangeLogo = document.getElementById('btn-change-logo');
if (btnChangeLogo) {
  btnChangeLogo.addEventListener('click', () => {
    showToast('Choose new logo image (PNG/JPG)...');
  });
}

const btnSaveApp = document.getElementById('btn-save-app');
if (btnSaveApp) {
  btnSaveApp.addEventListener('click', () => {
    showToast('Appearance settings applied!');
  });
}

const btnCreateBk = document.getElementById('btn-create-bk');
if (btnCreateBk) {
  btnCreateBk.addEventListener('click', () => {
    showToast('Database backup initiated...');
    setTimeout(() => showToast('Backup completed successfully!'), 1500);
  });
}

// ===== MAINTENANCE TILES =====
document.querySelectorAll('.sys-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const txt = tile.querySelector('.st-txt')?.textContent?.trim() || 'Action';
    showToast(`Executing: ${txt}...`);
  });
});

// ===== USERS & ROLES BUTTONS =====
document.querySelectorAll('.btn-ur').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(`Opening ${btn.textContent.trim()}...`);
  });
});

// ===== INTEGRATIONS =====
const btnManageInteg = document.getElementById('btn-manage-integ');
if (btnManageInteg) {
  btnManageInteg.addEventListener('click', () => {
    showToast('Opening Third-Party Integrations Manager...');
  });
}

document.querySelectorAll('.integ-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.querySelector('.integ-name')?.textContent?.trim() || 'Integration';
    showToast(`Configuring ${name}...`);
  });
});

// ===== NOTIFICATIONS CONFIGURE =====
const btnCfgNotif = document.getElementById('btn-cfg-notif');
if (btnCfgNotif) {
  btnCfgNotif.addEventListener('click', () => {
    showToast('Opening notification channel rules...');
  });
}

// ===== GLOBAL SEARCH INPUT =====
const gSearch = document.getElementById('g-search');
if (gSearch) {
  gSearch.addEventListener('input', () => {
    const val = gSearch.value.trim();
    if (val.length > 2) {
      showToast(`Searching settings for: "${val}"`);
    }
  });
}

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
