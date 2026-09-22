// Sidebar nav
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('javascript:')) {
      return; // Allow page navigation
    }
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    this.classList.add('active');
  });
});

// Toggle
const tog = document.getElementById('master-tog');
const togTxt = document.getElementById('tog-txt');
if (tog) {
  tog.addEventListener('change', function() {
    togTxt.textContent = this.checked ? 'ON' : 'OFF';
    togTxt.style.color = this.checked ? '#22c55e' : '#7a9ab8';
  });
}

// Animate progress bars on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pbar').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = w; }, 200);
    });
  });
});

// Button toasts
function toast(msg, color) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:20px;right:20px;background:${color};color:#fff;
    padding:9px 16px;border-radius:6px;font-family:Rajdhani,sans-serif;font-weight:700;
    font-size:13px;letter-spacing:.04em;z-index:9999;box-shadow:0 4px 18px rgba(0,0,0,.5);
    animation:tin .25s ease`;
  document.head.insertAdjacentHTML('beforeend',
    `<style>@keyframes tin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}</style>`);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

document.getElementById('btn-add')?.addEventListener('click',   () => toast('Add Production →', '#15803d'));
document.getElementById('btn-stock')?.addEventListener('click', () => toast('Stock Entry →', '#1d4ed8'));
document.getElementById('btn-sale')?.addEventListener('click',  () => toast('New Sale →', '#15803d'));
document.getElementById('btn-pay')?.addEventListener('click',   () => toast('Record Payment →', '#b45309'));
document.getElementById('btn-rep')?.addEventListener('click',   () => toast('View Reports →', '#334155'));
