// ============================================================
// UDAYARAVI WEAVE MASTER — SIMPLE MULTILINGUAL & ACCESSIBILITY HELPER
// Designed for factory workers, master weavers, and all operators
// ============================================================

const DICTIONARY = {
  en: {
    // Top Bar & Global
    "looms_status": "🟢 12 LOOMS RUNNING | 🔴 2 STOPPED",
    "quick_bill": "➕ NEW BILL",
    "today": "Today",
    "on": "ON",
    "off": "OFF",
    "tagline": "Weaving Progress<br/>A Stronger Tomorrow",
    
    // Sidebar
    "nav_dashboard": "Dashboard",
    "nav_dashboard_sub": "Home",
    "nav_production": "Production",
    "nav_production_sub": "Looms",
    "nav_stock": "Stock",
    "nav_stock_sub": "Yarn & Cloth",
    "nav_salespay": "Sales & Payments",
    "nav_salespay_sub": "Cash & Bills",
    "nav_reports": "Reports",
    "nav_reports_sub": "Summary",
    "nav_customers": "Customers",
    "nav_customers_sub": "Buyers",
    "nav_employees": "Employees",
    "nav_employees_sub": "Workers",
    "nav_suppliers": "Suppliers",
    "nav_suppliers_sub": "Yarn Sellers",
    "nav_settings": "Settings",
    "nav_settings_sub": "Options",

    // Dashboard Cards
    "card_looms": "Looms Running",
    "card_looms_sub": "12 of 14 Working Now",
    "card_cash": "Cash Collected Today",
    "card_cash_sub": "Goal: ₹50,000",
    "card_yarn": "Yarn in Godown",
    "card_yarn_sub": "142 Bags (2 Colors Low)",
    "card_pending": "Pending Money to Collect",
    "card_pending_sub": "From 5 Customers",

    // Quick Actions
    "act_new_bill": "➕ New Bill",
    "act_add_yarn": "➕ Add Yarn",
    "act_print_report": "🖨️ Print Today's Summary",
    
    // Status badges
    "status_running": "🟢 RUNNING",
    "status_stopped": "🔴 STOPPED",
    "status_paid": "🟢 PAID",
    "status_due": "🔴 DUE / UNPAID",
    "status_present": "🟢 PRESENT",
    "status_absent": "🔴 ABSENT",
    "status_in_stock": "🟢 IN STOCK",
    "status_low_stock": "🟡 LOW STOCK",
    "status_empty": "🔴 OUT OF STOCK",
    "collect_cash": "💵 Receive Money",
    "call": "📞 Call"
  },
  hi: {
    // Top Bar & Global
    "looms_status": "🟢 12 लूम चालू | 🔴 2 बंद",
    "quick_bill": "➕ नया बिल",
    "today": "आज",
    "on": "चालू",
    "off": "बंद",
    "tagline": "बुनाई में प्रगति<br/>एक मजबूत कल",

    // Sidebar
    "nav_dashboard": "डैशबोर्ड",
    "nav_dashboard_sub": "मुख्य पृष्ठ",
    "nav_production": "उत्पादन",
    "nav_production_sub": "लूम की बुनाई",
    "nav_stock": "गोदाम / स्टॉक",
    "nav_stock_sub": "धागा और कपड़ा",
    "nav_salespay": "बिक्री और रुपये",
    "nav_salespay_sub": "बिल और रोकड़",
    "nav_reports": "हिसाब / रिपोर्ट",
    "nav_reports_sub": "दैनिक रिपोर्ट",
    "nav_customers": "ग्राहक (पार्टी)",
    "nav_customers_sub": "खरीदार",
    "nav_employees": "कर्मचारी / कारीगर",
    "nav_employees_sub": "हाजिरी",
    "nav_suppliers": "सप्लायर",
    "nav_suppliers_sub": "धागा विक्रेता",
    "nav_settings": "सेटिंग्स",
    "nav_settings_sub": "विकल्प",

    // Dashboard Cards
    "card_looms": "चालू लूम मशीनें",
    "card_looms_sub": "14 में से 12 चल रही हैं",
    "card_cash": "आज आया हुआ नकद",
    "card_cash_sub": "लक्ष्य: ₹50,000",
    "card_yarn": "गोदाम में धागा",
    "card_yarn_sub": "142 बोरी (2 रंग कम हैं)",
    "card_pending": "बाकी पैसा वसूलना है",
    "card_pending_sub": "5 ग्राहकों से लेना है",

    // Quick Actions
    "act_new_bill": "➕ नया बिल बनाएं",
    "act_add_yarn": "➕ धागा स्टॉक में जोड़ें",
    "act_print_report": "🖨️ आज का हिसाब पर्ची प्रिंट करें",

    // Status badges
    "status_running": "🟢 चालू",
    "status_stopped": "🔴 बंद",
    "status_paid": "🟢 पूरा जमा",
    "status_due": "🔴 बाकी है",
    "status_present": "🟢 हाजिर",
    "status_absent": "🔴 गैरहाजिर",
    "status_in_stock": "🟢 भरपूर माल",
    "status_low_stock": "🟡 कम माल",
    "status_empty": "🔴 खत्म हो गया",
    "collect_cash": "💵 रुपये जमा करें",
    "call": "📞 फोन करें"
  },
  kn: {
    // Top Bar & Global
    "looms_status": "🟢 12 ಮಗ್ಗ ಚಾಲನೆಯಲ್ಲಿದೆ | 🔴 2 ನಿಂತಿದೆ",
    "quick_bill": "➕ ಹೊಸ ಬಿಲ್",
    "today": "ಇಂದು",
    "on": "ಚಾಲು",
    "off": "ಬಂದ್",
    "tagline": "ನೇಯ್ಗೆಯ ಪ್ರಗತಿ<br/>ಉಜ್ವಲ ನಾಳೆ",

    // Sidebar
    "nav_dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "nav_dashboard_sub": "ಮುಖ್ಯ ಪುಟ",
    "nav_production": "ಉತ್ಪಾದನೆ",
    "nav_production_sub": "ಮಗ್ಗದ ಕೆಲಸ",
    "nav_stock": "ದಾಸ್ತಾನು",
    "nav_stock_sub": "ನೂಲು & ಬಟ್ಟೆ",
    "nav_salespay": "ಮಾರಾಟ & ಪಾವತಿ",
    "nav_salespay_sub": "ಹಣ & ಬಿಲ್",
    "nav_reports": "ವರದಿಗಳು",
    "nav_reports_sub": "ದೈನಂದಿನ ಲೆಕ್ಕ",
    "nav_customers": "ಗ್ರಾಹಕರು",
    "nav_customers_sub": "ಖರೀದಿದಾರರು",
    "nav_employees": "ಕೆಲಸಗಾರರು",
    "nav_employees_sub": "ಹಾಜರಾತಿ",
    "nav_suppliers": "ಪೂರೈಕೆದಾರರು",
    "nav_suppliers_sub": "ನೂಲು ವ್ಯಾಪಾರಿ",
    "nav_settings": "ಸೆಟ್ಟಿಂಗ್ಸ್",
    "nav_settings_sub": "ಆಯ್ಕೆಗಳು",

    // Dashboard Cards
    "card_looms": "ನಡೆಯುತ್ತಿರುವ ಮಗ್ಗಗಳು",
    "card_looms_sub": "14 ರಲ್ಲಿ 12 ಕೆಲಸ ಮಾಡುತ್ತಿವೆ",
    "card_cash": "ಇಂದು ಸಂಗ್ರಹವಾದ ನಗದು",
    "card_cash_sub": "ಗುರಿ: ₹50,000",
    "card_yarn": "ಗೋದಾಮಿನಲ್ಲಿರುವ ನೂಲು",
    "card_yarn_sub": "142 ಚೀಲ (2 ಬಣ್ಣ ಕಡಿಮೆ ಇದೆ)",
    "card_pending": "ಬರಬೇಕಾದ ಬಾಕಿ ಹಣ",
    "card_pending_sub": "5 ಗ್ರಾಹಕರಿಂದ",

    // Quick Actions
    "act_new_bill": "➕ ಹೊಸ ಬಿಲ್ ಮಾಡಿ",
    "act_add_yarn": "➕ ನೂಲು ಸೇರಿಸಿ",
    "act_print_report": "🖨️ ಇಂದಿನ ಲೆಕ್ಕ ಪ್ರಿಂಟ್ ಮಾಡಿ",

    // Status badges
    "status_running": "🟢 ನಡೆಯುತ್ತಿದೆ",
    "status_stopped": "🔴 ನಿಂತಿದೆ",
    "status_paid": "🟢 ಪಾವತಿಸಲಾಗಿದೆ",
    "status_due": "🔴 ಬಾಕಿ ಇದೆ",
    "status_present": "🟢 ಹಾಜರು",
    "status_absent": "🔴 ಗೈರುಹಾಜರು",
    "status_in_stock": "🟢 ದಾಸ್ತಾನು ಇದೆ",
    "status_low_stock": "🟡 ಕಡಿಮೆ ಇದೆ",
    "status_empty": "🔴 ಖಾಲಿಯಾಗಿದೆ",
    "collect_cash": "💵 ಹಣ ಪಡೆಯಿರಿ",
    "call": "📞 ಕರೆ ಮಾಡಿ"
  }
};

let currentLang = localStorage.getItem('wm_lang') || 'en';

function setLanguage(lang) {
  if (!DICTIONARY[lang]) return;
  currentLang = lang;
  localStorage.setItem('wm_lang', lang);

  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (DICTIONARY[lang] && DICTIONARY[lang][key]) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = DICTIONARY[lang][key];
      } else {
        el.innerHTML = DICTIONARY[lang][key];
      }
    }
  });

  // Highlight active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Simple Toast Notification with Pleasant Sound or Visual Pop
function showSimpleToast(message, type = 'success') {
  const existing = document.querySelector('.wm-simple-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'wm-simple-toast ' + type;
  
  const icon = type === 'success' ? '✅' : (type === 'alert' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span class="toast-msg">${message}</span>`;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  
  // Attach lang buttons if present
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const l = btn.getAttribute('data-lang');
      setLanguage(l);
      const label = l === 'hi' ? 'भाषा: हिन्दी' : (l === 'kn' ? 'ಭಾಷೆ: ಕನ್ನಡ' : 'Language: English');
      showSimpleToast(label, 'info');
    });
  });
});
