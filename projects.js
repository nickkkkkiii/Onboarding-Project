const employees = [
  { name: "Крючков Александр", role: "Директор практики", project: "", telegram: "<a href='https://t.me/alexkruch93 '>@alexkruch93</a>" },
  { name: "Бавеян Эрик", role: "Менеджер портфеля", project: "", telegram: "<a href='https://t.me/erik_bav '>@erik_bav</a>" },
  { name: "Дубровский Андрей", role: "Архитектор", project: "", telegram: "<a href='https://t.me/andrew_nd '>@andrew_nd</a>" },
  { name: "Борисов Степан", role: "Системный аналитик", project: "project1", telegram: "<a href='https://t.me/Stepan_Borisov '>@Stepan_Borisov</a>" },
  { name: "Вихров Никита", role: "Системный аналитик", project: "project1", telegram: "<a href='https://t.me/Nikita_Vikhrov1 '>@Nikita_Vikhrov1</a>" },
  { name: "Нефедова Дарья", role: "Тестировщик", project: "project2", telegram: "<a href='https://t.me/kudryavayada '>@kudryavayada</a>" },
  { name: "Алямский Григорий", role: "Тестировщик", project: "project2", telegram: "<a href='https://t.me/valerik_mur_mur '>@valerik_mur_mur</a>" },
  { name: "Разин Никита", role: "Системный аналитик", project: "project2", telegram: "<a href='https://t.me/nikkkkkkkkkii '>@nikkkkkkkkkii</a>" },
  { name: "Иванов Сергей", role: "BE Разработчик", project: "project2", telegram: "<a href='https://t.me/Ivanov_Sergio_san '>@Ivanov_Sergio_san</a>" },
  { name: "Глик Виталий", role: "Системный аналитик", project: "project2", telegram: "<a href='https://t.me/aggromarus '>@aggromarus</a>" },
  { name: "Отин Андрей", role: "FE Разработчик", project: "project2", telegram: "<a href='https://t.me/AndreyOtin '>@AndreyOtin</a>" },
];

const projectData = {
  "project1": {
    name: "ГПН Автоматика. ЦИД",
    description: "Система для обработки, оптимизации и передачи данных нефтегазовой отрасли между смежными системами",
    links: [
      { title: "Документация", url: "https://docs.alpha.com " },
      { title: "Репозиторий", url: "https://github.com/alpha-project " }
    ],
    contacts: [
      { name: "Мария Блеунова", role: "PM", telegram: "@maryBLV" },
      { name: "Сервисная поддержка", role: "Helpdesk", telegram: "@servdesk_team" }
    ],
    faq: [
      {
        q: "Как получить доступ к репозиторию?",
        a: "Напишите РП и попросите добавить вас в репо."
      },
      {
        q: "Где находится чат проекта?",
        a: "Чат: <a href='https://t.me/сidproject '>@сidproject</a>"
      }
    ]
  },

  "project2": {
    name: "ГПН NewCRM",
    description: "CRM B2B",
    links: [
      { title: "DEV Контур", url: "https://front-ncrm.apps.dh-ext.dev.local/contractorSearch" },
      { title: "Confluence", url: "https://doc.dev.gazprom-neft.ru/display/NCRM/NEW+CRMB2B" },
      { title: "Jira", url: "https://task.dev.gazprom-neft.ru/secure/RapidBoard.jspa?projectKey=NCRM&rapidView=299" },
      { title: "Figma", url: "https://www.figma.com/design/9xDzzjYrHNYOIasVAxfpv8/NEW-CRM?node-id=1336-68963&node-type=canvas&t=PtdhVwJXr71W72zq-0" }
    ],
    contacts: [
      { name: "Тимербулатов Тимур", role: "PM", telegram: "<a href='https://t.me/TimurTimerbulatov '>@TimurTimerbulatov</a>" },
      { name: "Шеляговский Сергей", role: "DevOps", telegram: "<a href='https://t.me/pow3rshel '>@pow3rshel</a>" },
      { name: "Тарасов Александр", role: "TL Team1", telegram: "<a href='https://t.me/AlexandrTorasov '>@AlexandrTorasov</a>" },
      { name: "Баранов Роман>", role: "TL Team2", telegram: "<a href='https://t.me/r_baranov '>@r_baranov</a>" },
      { name: "Клосс Екатерина>", role: "Scrum-мастер", telegram: "<a href='https://t.me/ekaterinakloss '>@ekaterinakloss</a>" }
    ],
    faq: [
      {
        q: "Какие инструменты используются?",
        a: "Frontend: React\n Backend: Java Spring, Apache Kafka\n БД: PostgreSQL\n СУБД: DBeaver"
      }
    ]
  }
};
