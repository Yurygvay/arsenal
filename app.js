// ============================================================
//  НАСТРОЙКИ
// ============================================================
const BRAND_NAME = 'Арсенал';
const STORAGE_KEY = 'impulse_tracker_v1'; // Ключ оставляем, чтобы не потерять твои данные

// ============================================================
//  ИКОНКИ (SVG)
// ============================================================
const POWER_ICON = `<svg class="icon icon-power" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 L3 14 L11 14 L11 22 L21 10 L13 10 Z"/></svg>`;
const GOLD_ICON = `<svg class="icon icon-gold" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="#e8c264" stroke="#8b6a1f" stroke-width="1"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="#8b6a1f" stroke-width="0.6"/><path d="M12 6.5 L13.5 10.2 L17.5 10.4 L14.4 12.8 L15.4 16.6 L12 14.4 L8.6 16.6 L9.6 12.8 L6.5 10.4 L10.5 10.2 Z" fill="#8b6a1f"/></svg>`;
const SHOP_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></svg>`;
const SETTINGS_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
const POWER_LOGO = `<svg class="header__logo" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 L3 14 L11 14 L11 22 L21 10 L13 10 Z"/></svg>`;

// ============================================================
//  УТИЛИТЫ
// ============================================================
function todayISO() { return new Date().toISOString().slice(0, 10); }
function daysAgoISO(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }
function formatNumber(n) { return (n || 0).toLocaleString('ru-RU'); }
function formatDate(iso) { const [y, m, d] = iso.split('-'); return `${d}.${m}.${y}`; }
function uid(prefix) { return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

// ============================================================
//  ДЕФОЛТ
// ============================================================
const DEFAULT_DATA = {
  version: 3,
  settings: {
    difficulty: {
      easy:     { power: 5,  gold: 5  },
      medium:   { power: 10, gold: 10 },
      hard:     { power: 20, gold: 20 },
      veryHard: { power: 30, gold: 30 }
    }
  },
  departments: [
    { id: 'dep_study',  name: 'Учёба',                 order: 0 },
    { id: 'dep_social', name: 'Социалка',              order: 1 },
    { id: 'dep_skills', name: 'Навыки и знания',       order: 2 },
    { id: 'dep_home',   name: 'Быт',                   order: 3 },
    { id: 'dep_phys',   name: 'Физическое состояние',  order: 4 },
  ],
  skills: [
    { id: 'sk_math',     departmentId: 'dep_study',  name: 'Математический анализ', order: 0 },
    { id: 'sk_eng',      departmentId: 'dep_study',  name: 'Английский язык',       order: 1 },
    { id: 'sk_prog',     departmentId: 'dep_study',  name: 'Программирование',      order: 2 },
    { id: 'sk_meet',     departmentId: 'dep_social', name: 'Знакомства',            order: 0 },
    { id: 'sk_talk',     departmentId: 'dep_social', name: 'Общение',               order: 1 },
    { id: 'sk_speak',    departmentId: 'dep_social', name: 'Выступления',           order: 2 },
    { id: 'sk_newskill', departmentId: 'dep_skills', name: 'Освоение навыков',      order: 0 },
    { id: 'sk_practice', departmentId: 'dep_skills', name: 'Практика',              order: 1 },
    { id: 'sk_projects', departmentId: 'dep_skills', name: 'Личные проекты',        order: 2 },
    { id: 'sk_clean',    departmentId: 'dep_home',   name: 'Уборка',                order: 0 },
    { id: 'sk_cook',     departmentId: 'dep_home',   name: 'Готовка',               order: 1 },
    { id: 'sk_sport',    departmentId: 'dep_phys',   name: 'Физическая активность', order: 0 },
    { id: 'sk_care',     departmentId: 'dep_phys',   name: 'Уход за собой',         order: 1 },
  ],
  quests: [],
  rewards: [
    { id: 'rw_games',  name: 'Час видеоигр',               price: 50,  order: 0 },
    { id: 'rw_series', name: 'Серия любимого сериала',     price: 40,  order: 1 },
    { id: 'rw_sweet',  name: 'Десерт без вины',            price: 30,  order: 2 },
    { id: 'rw_rest',   name: 'Полдня отдыха',              price: 100, order: 3 },
    { id: 'rw_buy',    name: 'Небольшая покупка для себя', price: 200, order: 4 },
  ],
  purchases: []
};

// ============================================================
//  ХРАНИЛИЩЕ
// ============================================================
let data = loadData();
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    let parsed = JSON.parse(raw);
    if (parsed.permissions && !parsed.purchases) { parsed.purchases = parsed.permissions; delete parsed.permissions; }
    if (Array.isArray(parsed.quests)) {
      parsed.quests = parsed.quests.map(q => ({ ...q, power: q.power ?? q.gold ?? 0, gold: q.gold ?? q.power ?? 0 }));
    } else if (Array.isArray(parsed.actions)) {
      parsed.quests = parsed.actions.map(a => ({ id: a.id, description: a.description, departmentId: a.departmentId, skillId: a.skillId, difficulty: a.difficulty, power: a.basePower ?? 0, gold: a.basePower ?? 0, date: a.date, createdAt: a.createdAt }));
      delete parsed.actions;
    }
    if (parsed.settings?.difficulty) {
      for (const k of Object.keys(parsed.settings.difficulty)) {
        if (typeof parsed.settings.difficulty[k] === 'number') parsed.settings.difficulty[k] = { power: parsed.settings.difficulty[k], gold: parsed.settings.difficulty[k] };
      }
    }
    if (!parsed.quests) parsed.quests = [];
    if (!parsed.rewards) parsed.rewards = structuredClone(DEFAULT_DATA.rewards);
    if (!parsed.purchases) parsed.purchases = [];
    return { ...structuredClone(DEFAULT_DATA), ...parsed };
  } catch (e) { console.error(e); return structuredClone(DEFAULT_DATA); }
}
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { alert('Ошибка сохранения!'); }
}

// ============================================================
//  ДОСТУП
// ============================================================
function getDeptById(id) { return data.departments.find(d => d.id === id); }
function getSkillById(id) { return data.skills.find(s => s.id === id); }
function skillsOfDept(deptId) { return data.skills.filter(s => s.departmentId === deptId).sort((a, b) => a.order - b.order); }
function getRewardById(id) { return data.rewards.find(r => r.id === id); }

// ============================================================
//  РАСЧЁТЫ
// ============================================================
function totalPower() { return data.quests.reduce((s, q) => s + (q.power || 0), 0); }
function totalGoldEarned() { return data.quests.reduce((s, q) => s + (q.gold || 0), 0); }
function totalGoldSpent() { return data.purchases.reduce((s, p) => s + (p.price || 0), 0); }
function goldBalance() { return totalGoldEarned() - totalGoldSpent(); }
function powerToday() { const t = todayISO(); return data.quests.filter(q => q.date === t).reduce((s, q) => s + (q.power || 0), 0); }
function powerLast7() { const s = daysAgoISO(6), e = todayISO(); return data.quests.filter(q => q.date >= s && q.date <= e).reduce((acc, q) => acc + (q.power || 0), 0); }
function powerByDept() {
  const m = new Map(); for (const d of data.departments) m.set(d.id, 0);
  for (const q of data.quests) m.set(q.departmentId, (m.get(q.departmentId) || 0) + (q.power || 0)); return m;
}
function powerBySkill() {
  const m = new Map(); for (const s of data.skills) m.set(s.id, 0);
  for (const q of data.quests) m.set(q.skillId, (m.get(q.skillId) || 0) + (q.power || 0)); return m;
}
function recentQuests(limit = 12) { return [...data.quests].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, limit); }
function activePerms() { return data.purchases.filter(p => !p.usedAt); }

// ============================================================
//  РЕНДЕР ГРАФА
// ============================================================
function renderGraph() {
  const depts = data.departments.slice().sort((a, b) => a.order - b.order);
  if (depts.length === 0) return '';

  const deptPower = powerByDept();
  const skillPower = powerBySkill();
  
  // Базовые настройки графа
  const cx = 50; // центр в процентах
  const cy = 50;
  const rDept = 28; // радиус до отделов
  const rSkill = 42; // радиус до навыков
  
  let svgLines = '';
  let nodesHtml = '';
  
  // Центральный узел (Ты / Общая сила)
  const totalP = totalPower();
  nodesHtml += `<div class="graph-node graph-node--core" style="left:${cx}%; top:${cy}%; width:${40 + Math.min(30, totalP/50)}px; height:${40 + Math.min(30, totalP/50)}px;" title="Общая сила"><span style="top:auto; bottom:-20px;">Я</span></div>`;

  const angleStep = (Math.PI * 2) / depts.length;

  depts.forEach((dep, i) => {
    // Угол для отдела
    const angle = i * angleStep - Math.PI / 2; // Начинаем сверху
    const dx = cx + rDept * Math.cos(angle);
    const dy = cy + rDept * Math.sin(angle);
    
    // Линия от центра к отделу
    svgLines += `<line x1="${cx}%" y1="${cy}%" x2="${dx}%" y2="${dy}%" stroke="rgba(140, 184, 212, 0.3)" stroke-width="1.5" />`;
    
    // Размер отдела
    const p = deptPower.get(dep.id) || 0;
    const size = 20 + Math.min(20, p / 20);
    
    nodesHtml += `<div class="graph-node graph-node--dept" style="left:${dx}%; top:${dy}%; width:${size}px; height:${size}px;" title="${dep.name} (${p})">
      <span>${escapeHtml(dep.name)}</span>
    </div>`;

    // Навыки вокруг отдела
    const skills = skillsOfDept(dep.id);
    const skillAngleStep = (Math.PI / 3) / Math.max(1, skills.length - 1); // Разброс 60 градусов
    
    skills.forEach((sk, j) => {
      const sAngle = angle - (Math.PI / 6) + j * skillAngleStep;
      const sdx = cx + rSkill * Math.cos(sAngle);
      const sdy = cy + rSkill * Math.sin(sAngle);
      
      // Линия от отдела к навыку
      svgLines += `<line x1="${dx}%" y1="${dy}%" x2="${sdx}%" y2="${sdy}%" stroke="rgba(92, 68, 46, 0.4)" stroke-width="1" />`;
      
      const sp = skillPower.get(sk.id) || 0;
      const sSize = 8 + Math.min(12, sp / 10);
      
      nodesHtml += `<div class="graph-node graph-node--skill" style="left:${sdx}%; top:${sdy}%; width:${sSize}px; height:${sSize}px; opacity:${sp > 0 ? 1 : 0.4};" title="${sk.name} (${sp})"></div>`;
    });
  });

  return `
    <div class="graph-container">
      <svg class="graph-svg">${svgLines}</svg>
      ${nodesHtml}
    </div>
  `;
}

// ============================================================
//  РЕНДЕР (ОСНОВНОЙ)
// ============================================================
const app = document.getElementById('app');
function render() {
  const power = totalPower();
  const gold = goldBalance();
  const earned = totalGoldEarned();
  const deptPower = powerByDept();
  const maxDept = Math.max(1, ...Array.from(deptPower.values()));
  const active = activePerms();
  const recent = recentQuests();

  app.innerHTML = `
    <div class="app">
      <header class="header">
        <div class="header__brand">
          ${POWER_LOGO}
          <span class="header__name">${BRAND_NAME}</span>
        </div>
        <div class="header__actions">
          <button class="wallet-chip" data-action="open-shop" title="Магазин">
            ${GOLD_ICON}
            <span>${formatNumber(gold)}</span>
          </button>
          <button class="icon-btn" data-action="open-settings" aria-label="Настройки">${SETTINGS_ICON}</button>
        </div>
      </header>

      <!-- ДВЕ КОЛОНКИ ДЛЯ ДЕСКТОПА -->
      <main class="main desktop-grid">
        
        <!-- ЛЕВАЯ КОЛОНКА -->
        <div class="col-left">
          ${renderGraph()}
          <section class="hero">
            <div class="hero__grid">
              <div class="hero__card hero__card--power">
                <div class="hero__label">${POWER_ICON} Сила</div>
                <div class="hero__value">${formatNumber(power)}</div>
                <div class="hero__sub">сегодня <strong>+${formatNumber(powerToday())}</strong> · за 7 дней <strong>+${formatNumber(powerLast7())}</strong></div>
              </div>
              <div class="hero__card hero__card--gold">
                <div class="hero__label">${GOLD_ICON} Золото</div>
                <div class="hero__value">${formatNumber(gold)}</div>
                <div class="hero__sub">всего добыто <strong>${formatNumber(earned)}</strong></div>
              </div>
            </div>
          </section>

          ${active.length > 0 ? `
            <section class="section">
              <h2 class="section__title"><span>Активные разрешения</span><span>${active.length}</span></h2>
              ${active.map(p => `
                <div class="active-perm">
                  <div class="active-perm__main">
                    <div class="active-perm__name">${escapeHtml(p.rewardName)}</div>
                    <div class="action__meta">куплено ${formatDate(p.date)} · ${p.price} ${GOLD_ICON}</div>
                  </div>
                  <button class="btn btn--primary btn--sm" data-action="use-perm" data-id="${p.id}">Применить</button>
                  <button class="btn btn--danger btn--sm" data-action="cancel-perm" data-id="${p.id}" title="Вернуть золото">✕</button>
                </div>
              `).join('')}
            </section>
          ` : ''}
        </div>

        <!-- ПРАВАЯ КОЛОНКА -->
        <div class="col-right">
          <section class="section" style="margin-top: 0;">
            <h2 class="section__title"><span>Отделы</span><span>${formatNumber(power)} силы</span></h2>
            ${data.departments.length === 0 ? '<div class="empty">Отделов нет. Добавь в настройках.</div>' : data.departments.slice().sort((a, b) => a.order - b.order).map(dep => {
              const p = deptPower.get(dep.id) || 0;
              const pct = Math.round((p / maxDept) * 100);
              return `
                <div class="dept" data-action="open-dept" data-id="${dep.id}">
                  <div class="dept__row">
                    <div class="dept__name">${escapeHtml(dep.name)}</div>
                    <div class="dept__power">${formatNumber(p)} ${POWER_ICON}</div>
                  </div>
                  <div class="bar"><div class="bar__fill" style="width:${pct}%"></div></div>
                </div>
              `;
            }).join('')}
          </section>

          <section class="section">
            <h2 class="section__title"><span>Последние квесты</span></h2>
            ${recent.length === 0 ? '<div class="empty">Пока пусто. Сорвал листик с доски — нажми «+» внизу и запиши награду.</div>' : recent.map(q => {
              const dep = getDeptById(q.departmentId);
              const sk = getSkillById(q.skillId);
              return `
                <div class="action" data-action="edit-quest" data-id="${q.id}">
                  <div class="action__main">
                    <div class="action__desc">${escapeHtml(q.description)}</div>
                    <div class="action__meta">${dep ? escapeHtml(dep.name) : '—'} · ${formatDate(q.date)}</div>
                  </div>
                  <div class="action__rewards">
                    <span class="r-power">+${q.power} ${POWER_ICON}</span>
                    <span class="r-gold">+${q.gold} ${GOLD_ICON}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </section>
        </div>

      </main>

      <button class="fab" data-action="add-quest" aria-label="Записать квест">+</button>
    </div>
  `;
}
// ============================================================
//  МОДАЛКИ
// ============================================================
function openModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal">${html}</div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  return overlay;
}
function closeModal() { const m = document.querySelector('.modal-overlay'); if (m) m.remove(); }

// ============================================================
//  ФОРМА КВЕСТА
// ============================================================
function openQuestForm(questId = null) {
  const editing = questId ? data.quests.find(q => q.id === questId) : null;
  const d = data.settings.difficulty;

  if (data.departments.length === 0) {
    openModal(`<h2 class="modal__title">Сначала добавь отдел</h2><div class="modal__actions"><button class="btn btn--primary" data-action="open-settings">Настройки</button></div>`);
    return;
  }
  const initialDeptId = editing ? editing.departmentId : data.departments.slice().sort((a, b) => a.order - b.order)[0].id;

  openModal(`
    <h2 class="modal__title">${editing ? 'Редактировать квест' : 'Новый квест'}</h2>
    <form class="form" data-form="quest">
      <label class="field">
        <span class="field__label">Что сделал?</span>
        <input type="text" name="description" class="input" required value="${editing ? escapeHtml(editing.description) : ''}" placeholder="Например: дочитал главу по матану">
      </label>
      <label class="field">
        <span class="field__label">Отдел</span>
        <select name="departmentId" class="input">
          ${data.departments.slice().sort((a, b) => a.order - b.order).map(dep => `<option value="${dep.id}" ${dep.id === initialDeptId ? 'selected' : ''}>${escapeHtml(dep.name)}</option>`).join('')}
        </select>
      </label>
      <label class="field">
        <span class="field__label">Навык</span>
        <select name="skillId" class="input"></select>
      </label>
      <div class="field">
        <span class="field__label">Награда</span>
        <div class="chips" data-role="difficulty">
          ${['easy','medium','hard','veryHard'].map(key => {
            const labels = { easy:'Легко', medium:'Средне', hard:'Сложно', veryHard:'Оч. сложно' };
            return `<button type="button" class="chip" data-value="${key}"><strong>${labels[key]}</strong><small><span class="p">+${d[key].power}⚡</span><span class="g">+${d[key].gold}🪙</span></small></button>`;
          }).join('')}
          <button type="button" class="chip" data-value="custom" style="grid-column: span 2"><strong>Своё</strong><small>ввести вручную</small></button>
        </div>
        <div class="dual-inputs" data-role="custom-inputs" style="margin-top:10px; display:none">
          <label class="field" style="gap:4px"><span class="field__label">Сила</span><input type="number" name="customPower" class="input" min="0" max="10000" placeholder="0"></label>
          <label class="field" style="gap:4px"><span class="field__label">Золото</span><input type="number" name="customGold" class="input" min="0" max="10000" placeholder="0"></label>
        </div>
      </div>
      <label class="field">
        <span class="field__label">Дата</span>
        <input type="date" name="date" class="input" required value="${editing ? editing.date : todayISO()}">
      </label>
      <div class="modal__actions">
        ${editing ? `<button type="button" class="btn btn--danger" data-action="delete-quest" data-id="${editing.id}">Удалить</button>` : ''}
        <button type="button" class="btn" data-action="close-modal">Отмена</button>
        <button type="submit" class="btn btn--primary">Сохранить</button>
      </div>
    </form>
  `);

  const form = document.querySelector('[data-form="quest"]');
  const deptSelect = form.departmentId;
  const skillSelect = form.skillId;

  function fillSkills(deptId, selectedId) {
    const skills = skillsOfDept(deptId);
    if (skills.length === 0) { skillSelect.innerHTML = '<option value="">— нет навыков —</option>'; skillSelect.disabled = true; }
    else { skillSelect.disabled = false; skillSelect.innerHTML = skills.map(s => `<option value="${s.id}" ${s.id === selectedId ? 'selected' : ''}>${escapeHtml(s.name)}</option>`).join(''); }
  }
  fillSkills(initialDeptId, editing ? editing.skillId : null);
  deptSelect.addEventListener('change', () => fillSkills(deptSelect.value, null));

  let selectedDifficulty = editing ? editing.difficulty : 'medium';
  const chips = form.querySelectorAll('.chip');
  const customWrap = form.querySelector('[data-role="custom-inputs"]');
  const cpInput = form.customPower;
  const cgInput = form.customGold;

  function refreshChips() {
    chips.forEach(c => c.classList.toggle('chip--active', c.dataset.value === selectedDifficulty));
    customWrap.style.display = selectedDifficulty === 'custom' ? 'grid' : 'none';
  }
  chips.forEach(c => c.addEventListener('click', () => { selectedDifficulty = c.dataset.value; refreshChips(); }));
  refreshChips();
  if (editing && editing.difficulty === 'custom') { cpInput.value = editing.power; cgInput.value = editing.gold; }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const description = form.description.value.trim();
    if (!description) return alert('Введи описание');
    if (!form.skillId.value) return alert('Выбери навык');
    let power, gold;
    if (selectedDifficulty === 'custom') {
      power = parseInt(cpInput.value, 10) || 0;
      gold = parseInt(cgInput.value, 10) || 0;
      if (power <= 0 && gold <= 0) return alert('Хотя бы одно значение больше нуля');
    } else {
      const d2 = data.settings.difficulty[selectedDifficulty];
      power = d2.power; gold = d2.gold;
    }
    if (editing) {
      Object.assign(editing, { description, departmentId: form.departmentId.value, skillId: form.skillId.value, difficulty: selectedDifficulty, power, gold, date: form.date.value, updatedAt: new Date().toISOString() });
    } else {
      data.quests.push({ id: uid('q'), description, departmentId: form.departmentId.value, skillId: form.skillId.value, difficulty: selectedDifficulty, power, gold, date: form.date.value, createdAt: new Date().toISOString() });
    }
    saveData(); closeModal(); render();
  });
}

// ============================================================
//  ЭКРАН ОТДЕЛА
// ============================================================
function openDepartment(deptId) {
  const dep = getDeptById(deptId); if (!dep) return;
  const skills = skillsOfDept(deptId);
  const skillPower = powerBySkill();
  const deptQuests = data.quests.filter(q => q.departmentId === deptId).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  const totalDept = deptQuests.reduce((s, q) => s + (q.power || 0), 0);
  const totalGold = deptQuests.reduce((s, q) => s + (q.gold || 0), 0);

  openModal(`
    <h2 class="modal__title">${escapeHtml(dep.name)}</h2>
    <div style="text-align:center; margin-bottom:24px;">
      <div style="font-family:'Cinzel',serif; font-size:36px; font-weight:700; color:var(--power); text-shadow:0 0 15px var(--power-glow);">${formatNumber(totalDept)}</div>
      <div style="font-size:14px; color:var(--text-dim); margin-top:4px;">силы · ${formatNumber(totalGold)} золота добыто</div>
    </div>
    <div class="settings-section">
      <h3 class="settings-title">Навыки</h3>
      ${skills.length === 0 ? '<div class="empty">Нет навыков.</div>' : skills.map(sk => {
        const p = skillPower.get(sk.id) || 0;
        return `<div class="manage-skill manage-skill--row"><span>${escapeHtml(sk.name)}</span><span style="color:var(--power); font-family:'Cinzel',serif;">${formatNumber(p)}</span></div>`;
      }).join('')}
    </div>
    <div class="settings-section">
      <h3 class="settings-title">История (${deptQuests.length})</h3>
      ${deptQuests.length === 0 ? '<div class="empty">Пока пусто.</div>' : deptQuests.slice(0, 40).map(q => `
        <div class="action" data-action="edit-quest" data-id="${q.id}">
          <div class="action__main">
            <div class="action__desc">${escapeHtml(q.description)}</div>
            <div class="action__meta">${formatDate(q.date)}</div>
          </div>
          <div class="action__rewards">
            <span class="r-power">+${q.power} ${POWER_ICON}</span>
            <span class="r-gold">+${q.gold} ${GOLD_ICON}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="modal__actions"><button class="btn btn--primary" data-action="close-modal">Закрыть</button></div>
  `);
}

// ============================================================
//  МАГАЗИН
// ============================================================
function openShop() {
  const gold = goldBalance();
  const rewards = data.rewards.slice().sort((a, b) => a.order - b.order);

  openModal(`
    <h2 class="modal__title">Таверна</h2>
    <div class="shop-balance">${GOLD_ICON}<span class="shop-balance__value">${formatNumber(gold)}</span></div>
    ${rewards.length === 0 ? '<div class="empty">Товаров нет. Добавь плюсиком ниже.</div>' : rewards.map(r => {
      const ok = gold >= r.price;
      return `
        <div class="shop-item ${ok ? '' : 'shop-item--unaffordable'}">
          <div class="shop-item__main">
            <div class="shop-item__name">${escapeHtml(r.name)}</div>
            <div class="shop-item__price">${r.price} ${GOLD_ICON}</div>
          </div>
          <button class="btn btn--gold btn--sm" data-action="buy-reward" data-id="${r.id}" ${ok ? '' : 'disabled style="opacity:.4;cursor:not-allowed"'}>Купить</button>
        </div>
      `;
    }).join('')}
    <button class="btn btn--ghost" data-action="add-reward" style="width:100%;margin-top:6px">+ Выставить товар</button>
    <div class="modal__actions"><button class="btn btn--primary" data-action="close-modal">Уйти</button></div>
  `);
}

function buyReward(rewardId) {
  const r = getRewardById(rewardId); if (!r) return;
  const bal = goldBalance();
  if (bal < r.price) { alert(`Недостаточно золота. Нужно ещё ${r.price - bal}.`); return; }
  if (!confirm(`Купить «${r.name}» за ${r.price}?`)) return;
  data.purchases.push({ id: uid('perm'), rewardId: r.id, rewardName: r.name, price: r.price, date: todayISO(), createdAt: new Date().toISOString(), usedAt: null });
  saveData(); render(); openShop();
}
function usePerm(id) {
  const p = data.purchases.find(x => x.id === id); if (!p) return;
  if (!confirm(`Использовать «${p.rewardName}»?`)) return;
  p.usedAt = new Date().toISOString(); saveData(); render();
}
function cancelPerm(id) {
  const p = data.purchases.find(x => x.id === id); if (!p) return;
  if (!confirm(`Отменить покупку «${p.rewardName}»? ${p.price} золота вернётся.`)) return;
  data.purchases = data.purchases.filter(x => x.id !== id); saveData(); render();
}

// ============================================================
//  НАСТРОЙКИ
// ============================================================
function openSettings() {
  const rewards = data.rewards.slice().sort((a, b) => a.order - b.order);
  const diff = data.settings.difficulty;
  const diffLabels = { easy: 'Легко', medium: 'Средне', hard: 'Сложно', veryHard: 'Оч. сложно' };

  openModal(`
    <h2 class="modal__title">Настройки</h2>
    <div class="settings-section">
      <h3 class="settings-title">Шкала наград</h3>
      ${Object.keys(diff).map(k => `
        <div class="diff-row">
          <span class="diff-row__label">${diffLabels[k]}</span>
          <input type="number" class="input" data-diff="${k}" data-kind="power" value="${diff[k].power}" min="0" placeholder="⚡">
          <input type="number" class="input" data-diff="${k}" data-kind="gold" value="${diff[k].gold}" min="0" placeholder="🪙">
        </div>
      `).join('')}
    </div>
    <div class="settings-section">
      <h3 class="settings-title">Отделы и навыки</h3>
      <div class="manage-list">
        ${data.departments.slice().sort((a, b) => a.order - b.order).map(dep => `
          <div class="manage-dept">
            <div class="manage-dept__head">
              <span class="manage-dept__name">${escapeHtml(dep.name)}</span>
              <button class="icon-btn icon-btn--sm" data-action="rename-dept" data-id="${dep.id}">✎</button>
              <button class="icon-btn icon-btn--sm" data-action="delete-dept" data-id="${dep.id}">✕</button>
            </div>
            <div class="manage-skills">
              ${skillsOfDept(dep.id).map(sk => `<div class="manage-skill"><span>${escapeHtml(sk.name)}</span><button class="icon-btn icon-btn--sm" data-action="rename-skill" data-id="${sk.id}">✎</button><button class="icon-btn icon-btn--sm" data-action="delete-skill" data-id="${sk.id}">✕</button></div>`).join('')}
              <button class="btn btn--ghost btn--sm" data-action="add-skill" data-id="${dep.id}">+ навык</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn--ghost" data-action="add-dept" style="width:100%">+ Добавить отдел</button>
    </div>
    <div class="settings-section">
      <h3 class="settings-title">Товары (${rewards.length})</h3>
      ${rewards.length === 0 ? '<div class="empty" style="padding:12px;margin-bottom:8px">Товаров нет.</div>' : rewards.map(r => `<div class="manage-skill" style="padding:8px 0;border-bottom:1px solid var(--border);color:var(--text)"><span>${escapeHtml(r.name)}</span><span style="color:var(--gold);margin-right:6px">${r.price}</span><button class="icon-btn icon-btn--sm" data-action="edit-reward" data-id="${r.id}">✎</button><button class="icon-btn icon-btn--sm" data-action="delete-reward" data-id="${r.id}">✕</button></div>`).join('')}
      <button class="btn btn--ghost btn--sm" data-action="add-reward" style="margin-top:8px">+ товар</button>
    </div>
    <div class="settings-section">
      <h3 class="settings-title">Данные</h3>
      <div class="modal__actions" style="justify-content:flex-start">
        <button class="btn btn--ghost" data-action="export">Экспорт</button>
        <button class="btn btn--ghost" data-action="import">Импорт</button>
        <button class="btn btn--danger" data-action="reset">Сброс</button>
      </div>
    </div>
    <div class="modal__actions"><button class="btn btn--primary" data-action="close-modal">Готово</button></div>
  `);
}

// ============================================================
//  CRUD
// ============================================================
function addDepartment() { const name = prompt('Название отдела:'); if (!name || !name.trim()) return; data.departments.push({ id: uid('dep'), name: name.trim(), order: data.departments.length }); saveData(); openSettings(); render(); }
function renameDept(id) { const dep = getDeptById(id); if (!dep) return; const name = prompt('Новое название:', dep.name); if (!name || !name.trim()) return; dep.name = name.trim(); saveData(); openSettings(); render(); }
function deleteDept(id) { const dep = getDeptById(id); if (!dep) return; const count = data.quests.filter(q => q.departmentId === id).length; if (!confirm(count > 0 ? `В отделе «${dep.name}» ${count} квестов. Удалить всё?` : `Удалить отдел «${dep.name}»?`)) return; data.departments = data.departments.filter(d => d.id !== id); data.skills = data.skills.filter(s => s.departmentId !== id); data.quests = data.quests.filter(q => q.departmentId !== id); saveData(); openSettings(); render(); }
function addSkill(deptId) { const name = prompt('Название навыка:'); if (!name || !name.trim()) return; const skills = skillsOfDept(deptId); data.skills.push({ id: uid('sk'), departmentId: deptId, name: name.trim(), order: skills.length }); saveData(); openSettings(); render(); }
function renameSkill(id) { const sk = getSkillById(id); if (!sk) return; const name = prompt('Новое название:', sk.name); if (!name || !name.trim()) return; sk.name = name.trim(); saveData(); openSettings(); render(); }
function deleteSkill(id) { const sk = getSkillById(id); if (!sk) return; const count = data.quests.filter(q => q.skillId === id).length; if (!confirm(count > 0 ? `У навыка «${sk.name}» ${count} квестов. Удалить?` : `Удалить навык «${sk.name}»?`)) return; data.skills = data.skills.filter(s => s.id !== id); data.quests = data.quests.filter(q => q.skillId !== id); saveData(); openSettings(); render(); }

function addReward() { const name = prompt('Что можно купить?'); if (!name || !name.trim()) return; const price = parseInt(prompt('Цена в золоте:', '50'), 10); if (!price || price < 1) return; data.rewards.push({ id: uid('rw'), name: name.trim(), price, order: data.rewards.length }); saveData(); render(); if (document.querySelector('.shop-balance')) openShop(); else openSettings(); }
function editReward(id) { const r = getRewardById(id); if (!r) return; const name = prompt('Название:', r.name); if (!name || !name.trim()) return; const price = parseInt(prompt('Цена:', String(r.price)), 10); if (!price || price < 1) return; r.name = name.trim(); r.price = price; saveData(); render(); if (document.querySelector('.shop-balance')) openShop(); else openSettings(); }
function deleteReward(id) { if (!confirm('Удалить товар?')) return; data.rewards = data.rewards.filter(r => r.id !== id); saveData(); render(); if (document.querySelector('.shop-balance')) openShop(); else openSettings(); }

// ============================================================
//  ЭКСПОРТ / ИМПОРТ / СБРОС
// ============================================================
function exportData() { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `arsenal-backup-${todayISO()}.json`; a.click(); URL.revokeObjectURL(url); }
function importData() { const input = document.createElement('input'); input.type = 'file'; input.accept = 'application/json'; input.onchange = e => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => { try { const parsed = JSON.parse(ev.target.result); if (!parsed.quests || !parsed.departments || !parsed.skills) throw new Error('Неверный формат'); if (!confirm('Заменить текущие данные?')) return; data = parsed; if (!data.purchases) data.purchases = []; if (!data.rewards) data.rewards = []; saveData(); closeModal(); render(); } catch (err) { alert('Ошибка импорта: ' + err.message); } }; reader.readAsText(file); }; input.click(); }
function resetData() { if (!confirm('Удалить ВСЕ данные и вернуть стандартные? Необратимо.')) return; if (!confirm('Точно?')) return; data = structuredClone(DEFAULT_DATA); saveData(); closeModal(); render(); }

// ============================================================
//  СОБЫТИЯ
// ============================================================
document.addEventListener('click', e => {
  const t = e.target.closest('[data-action]'); if (!t) return;
  const action = t.dataset.action; const id = t.dataset.id;
  switch (action) {
    case 'add-quest': openQuestForm(); break;
    case 'edit-quest': openQuestForm(id); break;
    case 'delete-quest': if (confirm('Удалить квест?')) { data.quests = data.quests.filter(q => q.id !== id); saveData(); closeModal(); render(); } break;
    case 'open-shop': openShop(); break;
    case 'buy-reward': buyReward(id); break;
    case 'add-reward': addReward(); break;
    case 'edit-reward': editReward(id); break;
    case 'delete-reward': deleteReward(id); break;
    case 'use-perm': usePerm(id); break;
    case 'cancel-perm': cancelPerm(id); break;
    case 'open-settings': openSettings(); break;
    case 'close-modal': closeModal(); break;
    case 'open-dept': openDepartment(id); break;
    case 'add-dept': addDepartment(); break;
    case 'rename-dept': renameDept(id); break;
    case 'delete-dept': deleteDept(id); break;
    case 'add-skill': addSkill(id); break;
    case 'rename-skill': renameSkill(id); break;
    case 'delete-skill': deleteSkill(id); break;
    case 'export': exportData(); break;
    case 'import': importData(); break;
    case 'reset': resetData(); break;
  }
});

document.addEventListener('input', e => {
  const diff = e.target.dataset.diff; const kind = e.target.dataset.kind;
  if (!diff || !kind) return;
  const v = Math.max(0, parseInt(e.target.value, 10) || 0);
  data.settings.difficulty[diff][kind] = v;
  saveData();
});

// ============================================================
//  СТАРТ
// ============================================================
render();
