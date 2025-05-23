function getRoleColor(role) {
  switch (role) {
    case "Директор практики":
      return "red-badge";
    case "Менеджер портфеля":
      return "yellow-badge";
    case "Архитектор":
      return "green-badge";
    default:
      return "blue-badge";
  }
}

function toggleEmployeeCard(element) {
  const card = element.closest('.employee-card');
  const details = card.querySelector('.employee-details');
  const icon = card.querySelector('.toggle-icon'); // если есть иконка

  if (details.style.display === 'none') {
    details.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    details.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

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
        <div class="theme-switch-container">
          <label class="theme-switch">
            <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()" ${isDark ? 'checked' : ''}>
            <div class="slider round"></div>
          </label>
        </div>
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

      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <a href="#" onclick="showProjectList()">Все проекты</a> → 
        <span>${project.name}</span>
      </div>

      <div class="card">
        <h1>${project.name}</h1>

        <!-- Контейнер с прокруткой -->
        <div class="project-details-container">
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
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle" onclick="toggleDarkMode()" ${isDark ? 'checked' : ''}>
          <div class="slider round"></div>
        </label>
      </div>

      <div class="breadcrumbs">
        <a href="#" onclick="showWelcomeScreen()">Главная</a> → 
        <span>Сотрудники</span>
      </div>

      <div class="card">
        <h1>Сотрудники</h1>
        <p>Сотрудники практики:</p>

        <div class="employees-list">
  `;

  employees.forEach(emp => {
    const roleName = emp.role; // Не делаем uppercase, если не нужно
    const roleColor = getRoleColor(roleName);

    const projectName = emp.project ? projectData[emp.project]?.name || "Без проекта" : "Без проекта";
    const projectId = emp.project ? emp.project : null;

    const projectLink = projectId
      ? `<a href="#" onclick="showProject('${projectId}', 'from-employees')">${projectName}</a>`
      : `Без проекта`;

    html += `
      <div class="employee-card" onclick="toggleEmployeeCard(this)">
        <div class="role-badge ${roleColor}">${roleName}</div>
        
        <div class="employee-header">
          <strong>${emp.name}</strong>
          
          <span class="toggle-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L12 19L19 12" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>

        <div class="employee-details" style="display: none;">
          <div><strong>Роль:</strong> ${emp.role}</div>
          <div><strong>Проект:</strong> ${projectLink}</div>
          <div><strong>Telegram:</strong> <a href="${emp.telegram}">${emp.telegram}</a></div>
        </div>
      </div>
    `;
  });

  html += `
        </div>
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
