(() => {
  const body = document.body;
  const sidebar = document.getElementById('sidebar');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let toastTimer;

  const showToast = (message) => {
    toastText.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2800);
  };

  const viewCopy = {
    Overview: ['Good morning, Maya', 'Your workspace is clear. Here’s what moved while you were away.'],
    'Evidence graph': ['See the whole chain', 'Follow every claim back to the source that shaped it.'],
    Sources: ['Your evidence, in context', 'Keep the signal high and the source trail easy to inspect.'],
    'Review queue': ['Open the next uncertain link', 'A few decisions are waiting for a human read.'],
    Settings: ['Tune your workspace', 'Make TraceMind feel like home for the way your team thinks.']
  };

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      document.querySelectorAll('.nav-item').forEach((nav) => nav.classList.remove('active'));
      item.classList.add('active');
      document.getElementById('breadcrumbCurrent').textContent = view;
      document.getElementById('pageTitle').innerHTML = `${viewCopy[view][0]} <span>✦</span>`;
      document.getElementById('pageSubtitle').textContent = viewCopy[view][1];
      showToast(`${view} view selected`);
      sidebar.classList.remove('open');
    });
  });

  document.querySelectorAll('.trace-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.trace-tab').forEach((other) => other.classList.remove('active'));
      tab.classList.add('active');
      const label = tab.dataset.map === 'Confidence' ? 'Confidence lens' : `${tab.dataset.map} lens`;
      showToast(`${label} active`);
    });
  });

  const filterContent = (query) => {
    const normalized = query.trim().toLowerCase();
    ['activity', 'review'].forEach((section) => {
      const list = document.getElementById(`${section}List`);
      const empty = document.getElementById(`empty${section[0].toUpperCase()}${section.slice(1)}`);
      if (!list) return;
      const items = list.querySelectorAll('[data-searchable]');
      let visible = 0;
      items.forEach((item) => {
        const matches = !normalized || item.dataset.searchable.toLowerCase().includes(normalized);
        item.style.display = matches ? '' : 'none';
        if (matches) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    });
  };

  document.getElementById('globalSearch').addEventListener('input', (event) => filterContent(event.target.value));
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      document.getElementById('globalSearch').focus();
    }
    if (event.key === 'Escape') closeModal();
  });

  const modalBackdrop = document.getElementById('modalBackdrop');
  const investigationName = document.getElementById('investigationName');
  const openModal = () => { modalBackdrop.hidden = false; window.setTimeout(() => investigationName.focus(), 20); };
  const closeModal = () => { modalBackdrop.hidden = true; };
  document.getElementById('newInvestigation').addEventListener('click', openModal);
  document.getElementById('askAssistant').addEventListener('click', () => showToast('TraceMind is ready for your question'));
  document.getElementById('openGraph').addEventListener('click', () => showToast('Full graph view is opening'));
  document.getElementById('viewActivity').addEventListener('click', () => showToast('Showing the full activity feed'));
  document.getElementById('queueViewAll').addEventListener('click', () => showToast('Review queue expanded'));
  document.getElementById('upgradeButton').addEventListener('click', () => showToast('Capacity settings are ready'));
  document.getElementById('workspaceSwitcher').addEventListener('click', () => showToast('Workspace switcher opened'));
  document.getElementById('notificationButton').addEventListener('click', () => showToast('You’re all caught up'));
  document.getElementById('activityFilter').addEventListener('click', () => showToast('Activity filter: All'));
  document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (event) => { if (event.target === modalBackdrop) closeModal(); });

  document.getElementById('investigationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name')).trim();
    if (!name) return;
    const reviewList = document.getElementById('reviewList');
    const empty = document.getElementById('emptyReview');
    const item = document.createElement('div');
    item.className = 'review-item';
    item.dataset.searchable = `${name} New investigation high priority`;
    item.innerHTML = `<button class="review-check" type="button" aria-label="Mark ${name} as reviewed"></button><div><strong>${name}</strong><p><span class="priority high">New</span> Investigation <span class="review-separator">·</span> Just now</p></div><button class="review-open" type="button" aria-label="Open review">↗</button>`;
    reviewList.insertBefore(item, empty);
    bindReviewItem(item);
    closeModal();
    event.currentTarget.reset();
    showToast(`${name} added to your review queue`);
  });

  const bindReviewItem = (item) => {
    const checkbox = item.querySelector('.review-check');
    const openButton = item.querySelector('.review-open');
    checkbox.addEventListener('click', () => {
      item.classList.toggle('is-reviewed');
      checkbox.setAttribute('aria-label', item.classList.contains('is-reviewed') ? 'Mark as open' : 'Mark as reviewed');
      showToast(item.classList.contains('is-reviewed') ? 'Review marked complete' : 'Review reopened');
    });
    openButton.addEventListener('click', () => showToast('Review detail opened'));
  };
  document.querySelectorAll('.review-item').forEach(bindReviewItem);

  document.getElementById('importButton').addEventListener('click', () => document.getElementById('fileInput').click());
  document.getElementById('fileInput').addEventListener('change', (event) => {
    const count = event.target.files.length;
    if (count) showToast(`${count} source${count === 1 ? '' : 's'} ready to import`);
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    body.classList.toggle('dark');
    const dark = body.classList.contains('dark');
    localStorage.setItem('tracemind-theme', dark ? 'dark' : 'light');
    showToast(`${dark ? 'Dark' : 'Light'} theme enabled`);
  });
  if (localStorage.getItem('tracemind-theme') === 'dark') body.classList.add('dark');
})();
