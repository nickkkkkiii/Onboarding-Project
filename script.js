function goBack() {
  const lastSource = localStorage.getItem('lastSource');

  if (lastSource === 'from-project-list') {
    showProjectList();
  } else if (lastSource === 'from-employees') {
    showEmployees();
  } else {
    // По умолчанию возвращаемся на главную
    showWelcomeScreen();
  }
}

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
        <h5>Добро пожаловать в ПРКП!</h5>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="breadcrumbs">
        <span>Главная</span>
      </div>
      <div class="card">
        <h2>Выбери проект!</h2>
        <p>Выберите ваш проект, чтобы получить всю необходимую информацию: ссылки, контакты, FAQ и многое другое.</p>
        <button onclick="showProjectList()">Выбрать проект</button>
        <div class="button-spacing"></div>
        <button onclick="showEmployees()">Все сотрудники</button>
      </div>
    </div>
    <div class="footer-text">практика развития клиентских путей</div>
  `;

  setThemeToggleState(isDark);
}

function showProjectList() {
  const isDark = getSavedTheme();
  const listHtml = Object.keys(projectData).map(id => {
    const name = projectData[id].name;
    return `<li>
  <button class="project-button" onclick="showProject('${id}', 'from-project-list')">${name}</button>
  </li>`;
  }).join("");
  
  document.getElementById("app").innerHTML = `
    <div class="container">
     <div class="header-buttons">
        <button onclick="showWelcomeScreen()" style="margin-right: 10px;">Назад</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()">
          <div class="slider round"></div>
        </label>
      </div>
      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <span>Все проекты</span>
      </div>
      <div class="card">
        <h1>Все проекты</h1>
        <ul>
          ${listHtml}
        </ul>
      </div>
    </div>
    <div class="footer-text">практика развития клиентских путей</div>
  `;

  setThemeToggleState(isDark);
}

function showProject(id, source) {
  const project = projectData[id];
  if (!project) {
    document.getElementById("app").innerHTML = "<p>Проект не найден.</p>";
    return;
  }

  const isDark = getSavedTheme();
  
  localStorage.setItem('lastSource', source);

  // Определяем, откуда пользователь пришёл
  let breadcrumbsHtml = '';

  if (source === 'from-project-list') {
    // Путь: Главная → Все проекты → [Проект]
    breadcrumbsHtml = `
      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <a href="#" onclick="showProjectList()">Все проекты</a> → 
        <span>${project.name}</span>
      </div>
    `;
  } else if (source === 'from-employees') {
    // Путь: Главная → Сотрудники → [Проект]
    breadcrumbsHtml = `
      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <a href="#" onclick="showEmployees()">Сотрудники</a> → 
        <span>${project.name}</span>
      </div>
    `;
  } else {
    // По умолчанию показываем стандартный путь
    breadcrumbsHtml = `
      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <a href="#" onclick="showProjectList()">Все проекты</a> → 
        <span>${project.name}</span>
      </div>
    `;
  }

  let html = `
    <div class="container">
      <div class="header-buttons">
        <button onclick="goBack()" style="margin-right: 10px;">Назад</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()" ${isDark ? 'checked' : ''}>
          <div class="slider round"></div>
        </label>
      </div>

      ${breadcrumbsHtml}

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
          ${project.faq.map(faq => `
            <dt>${faq.q}</dt>
            <dd class="faq-answer">${faq.a}</dd>
          `).join("")}
        </dl>
      </div>
    </div>
    <div class="footer-text">практика развития клиентских путей</div>
  `;

  document.getElementById("app").innerHTML = html;
  setThemeToggleState(isDark);
}

function showEmployees() {
  const isDark = getSavedTheme();

  let html = `
    <div class="container">
      <div class="header-buttons">
        <button onclick="showWelcomeScreen()" style="margin-right: 10px;">Назад</button>
      </div>

      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <span>Сотрудники</span>
      </div>

      <div class="card">
        <h1>Сотрудники</h1>
        <p>Сотрудники практики:</p>

        <table class="employees-table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Роль</th>
              <th>Проект</th>
              <th>Telegram</th>
            </tr>
          </thead>
          <tbody>
  `;

  employees.forEach(emp => {
    const projectName = emp.project ? projectData[emp.project]?.name : "Без проекта";
    const projectId = emp.project ? emp.project : null;

    // Если есть проект — делаем его кликабельным
    const projectLink = projectId
    ? `<a href="#" onclick="showProject('${projectId}', 'from-employees')">${projectName}</a>`
    : projectName;

    html += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${projectLink}</td>
        <td><a href="${emp.telegram}">${emp.telegram}</a></td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>
    <div class="footer-text">практика развития клиентских путей</div>
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
