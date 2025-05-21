function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

function showWelcomeScreen() {
  document.getElementById("app").innerHTML = `
    <div class="container">
      <div class="card">
        <h1>Добро пожаловать в команду!</h1>
        <p>Выберите ваш проект, чтобы получить всю необходимую информацию: ссылки, контакты, FAQ и многое другое.</p>
        <button onclick="showProjectList()">Выбрать проект</button>
      </div>
    </div>
  `;
}

function showProjectList() {
  const listHtml = Object.keys(projectData).map(id => {
    const name = projectData[id].name;
    return `<li><button onclick="showProject('${id}')">${name}</button></li>`;
  }).join("");

  document.getElementById("app").innerHTML = `
    <div class="container">
      <button onclick="showWelcomeScreen()" style="margin-bottom: 20px;">← Назад</button>
      <h1>Все проекты</h1>
      <ul>
        ${listHtml}
      </ul>
    </div>
  `;
}

function showProject(id) {
  const project = projectData[id];
  if (!project) {
    document.getElementById("app").innerHTML = "<p>Проект не найден.</p>";
    return;
  }

  let html = `
    <div class="container">
      <button onclick="showProjectList()" style="margin-bottom: 20px;">← Назад</button>
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
}

(function initApp() {
  const projectId = getProjectIdFromUrl();
  if (projectId && projectData[projectId]) {
    showProject(projectId);
  } else {
    showWelcomeScreen();
  }
})();