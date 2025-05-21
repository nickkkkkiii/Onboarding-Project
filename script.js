function setThemeToggleState(isDark) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.checked = isDark;
  }
}

function getSavedTheme() {
  return localStorage.getItem('darkMode') === 'true';
}

function loadTheme() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
}

// Переключение темы
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

// Проверяем сохранённую тему или системные настройки
function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

function showWelcomeScreen() {
  const isDark = getSavedTheme();
  document.getElementById("app").innerHTML = `
    <div class="container">
      <div class="header-buttons">
        <h5>Добро пожаловать!</h5>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="card">
        <h2>Выбери проект!</h2>
        <p>Выберите ваш проект, чтобы получить всю необходимую информацию: ссылки, контакты, FAQ и многое другое.</p>
        <button onclick="showProjectList()">Выбрать проект</button>
      </div>
    </div>
  `;

  setThemeToggleState(isDark);
}

function showProjectList() {
  const isDark = getSavedTheme();
  const listHtml = Object.keys(projectData).map(id => {
    const name = projectData[id].name;
    return `<li><button onclick="showProject('${id}')">${name}</button></li>`;
  }).join("");
  
  document.getElementById("app").innerHTML = `
    <div class="container">
     <div class="header-buttons">
        <button onclick="showWelcomeScreen()" style="margin-right: 10px;">← Назад</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="card">
        <h1>Все проекты</h1>
        <ul>
          ${listHtml}
        </ul>
      </div>
    </div>
  `;

  setThemeToggleState(isDark);
}

function showProject(id) {
  const isDark = getSavedTheme();
  const project = projectData[id];
  if (!project) {
    document.getElementById("app").innerHTML = "<p>Проект не найден.</p>";
    return;
  }

  let html = `
    <div class="container">
     <div class="header-buttons">
        <button onclick="showProjectList()" style="margin-right: 10px;">← Назад</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="card">
        <h1>${project.name}</h1>
        <p><strong>Описание:</strong> ${project.description}</p>

        <h3>🔗 Полезные ссылки</h3>
        <ul>
          ${project.links.map(link => `<li><a href="${link.url}" target="_blank">${link.title}</a></li>`).join("")}
        </ul>

        <h3>📞 Контакты</h3>
        <ul>
          ${project.contacts.map(contact => `<li><b>${contact.name}</b> (${contact.role}): ${contact.telegram}</li>`).join("")}
        </ul>

        <h3>❓ Частые вопросы</h3>
        <dl>
          ${project.faq.map(faq => `<dt>${faq.q}</dt><dd>${faq.a}</dd>`).join("")}
        </dl>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = html;
  setThemeToggleState(isDark);
}

(function initApp() {
  const projectId = getProjectIdFromUrl();
  if (projectId && projectData[projectId]) {
    showProject(projectId);
  } else {
    showWelcomeScreen();
  }
  loadTheme();
})();
