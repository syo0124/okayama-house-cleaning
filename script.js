(() => {
  const config = window.SITE_CONFIG || {};
  if (config.brand) {
    const el = document.querySelector('[data-brand]');
    el.firstChild.textContent = config.brand;
    document.title = `${config.brand}｜岡山のハウスクリーニング`;
  }
  const phone = String(config.phone || '').replace(/[^\d+]/g, '');
  if (/^\+?\d{10,15}$/.test(phone)) {
    document.querySelectorAll('[data-phone]').forEach(a => { a.href = `tel:${phone}`; a.setAttribute('aria-label', `電話で相談する ${config.phone}`); });
  }
  const form = document.getElementById('estimate-form');
  const formReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.formEmail || '');
  document.querySelectorAll('[data-form]').forEach(a => { a.href = '#estimate-form'; });
  if (formReady) {
    form.action = `https://formsubmit.co/${config.formEmail}`;
    const source = document.createElement('input');
    source.type = 'hidden'; source.name = '_url'; source.value = 'https://syo0124.github.io/okayama-house-cleaning/';
    form.appendChild(source);
    form.querySelector('button').disabled = false;
    document.getElementById('form-status').textContent = '送信後、迷惑メール対策の確認画面に進みます。';
  }
  form.addEventListener('submit', event => {
    if (!formReady) {
      event.preventDefault();
      document.getElementById('form-status').textContent = 'フォームは準備中です。お電話でご相談ください。';
    }
  });
  const status = document.getElementById('contact-status');
  status.textContent = phone && formReady ? `電話：${config.phone} ／ 24時間365日受付` : phone ? `電話：${config.phone} ／ フォームは準備中です。` : formReady ? '電話窓口は準備中です。フォームからご相談ください。' : 'お問い合わせ窓口は準備中です。';
})();
