const dashboardList = [
  {
    title: "Union Budget Explorer 2022-23",
    class: "mt-4",
    img: "../../gifs/sequence-scatter.png",
    link: "https://union.openbudgetsindia.org/en/",
  },
  {
    title: "Union Budget Explorer 2021-22",
    class: "mt-4",
    img: "../../gifs/graphic.png",
    link: "https://union2021.openbudgetsindia.org/en/",
  },
  {
    title: "Union Budget Explorer 2020-21",
    class: "mt-4",
    img: "../../gifs/sequence-area.jpg",
    link: "https://union2020.openbudgetsindia.org/en/",
  },
  {
    title: "Union Budget Explorer 2019-20",
    class: "mt-4",
    img: "../../gifs/sequence-bar.jpg",
    link: "https://union2019.openbudgetsindia.org/en/",
  },
  {
    title: "Union Budget Explorer 2019-20 (Interim)",
    class: "mt-4",
    img: "../../gifs/sequence-line.jpg",

    link: "https://union2019i.openbudgetsindia.org/en/",
  },
  {
    title: "Union Budget Explorer 2018-19",
    class: "mt-4",
    img: "../../gifs/sequence-pie.jpg",
    link: "https://union2018.openbudgetsindia.org/en/",
  },
  {
    title: "Himachal Fiscal Data Explorer",
    class: "mt-4",
    img: "../../gifs/sequence-scatter.png",
    link: "https://hp.openbudgetsindia.org/en/",
  },
  {
    title: "Odisha Budget Explorer 2022-23",
    class: "mt-4",
    img: "../../gifs/sequence-area.jpg",
    link: "https://odisha2022.openbudgetsindia.org/en/",
  },
  {
    title: "Assam Budget Explorer 2022-23",
    class: "mt-4",
    img: "../../gifs/sequence-area.jpg",
    link: "https://assam2022.openbudgetsindia.org/en/",
  },
  {
    title: "Assam Budget Explorer 2021-22",
    class: "mt-4",
    img: "../../gifs/sequence-area.jpg",
    link: "https://assam2021.openbudgetsindia.org/en/",
  },
  {
    title: "Assam Budget Explorer 2020-21",
    class: "mt-4",
    img: "../../gifs/sequence-square.jpg",
    link: "https://assam2020.openbudgetsindia.org/en/",
  },
  {
    title: "Assam Budget Explorer 2019-20",
    class: "mt-4",
    img: "../../gifs/sequence-pie.jpg",
    link: "https://assam2019.openbudgetsindia.org/en/",
  },
  {
    title: "Sector Dashboard",
    class: "mt-4",
    img: "../../gifs/sequence-bar.jpg",
    link: "https://sectors.openbudgetsindia.org/",
  },
  {
    title: "Balasore District Treasury",
    class: "mt-4",
    img: "../../gifs/sequence-square.jpg",
    link: "https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true",
  },
  {
    title: "Krishna District Treasury",
    class: "mt-4",
    img: "../../gifs/sequence-area.jpg",
    link: "https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true",
  },
  {
    title: "Schemes Dashboard",
    class: "mt-4",
    img: "../../gifs/sequence-line.jpg",
    link: "https://schemes.openbudgetsindia.org",
  },
];

let dashboardCardsHTML = "";
const createAndAppendCard = (dashboard) => {
  return `<a
    href="${dashboard.link}"
    target="_blank"
    class="scheme-card card-link-container ${dashboard.class}"
  >
    <div class="image-container">
      <img src="${dashboard.img}" alt="dashboard-logo" />
    </div>
    <div class="text-container mt-2">
      <h4>${dashboard.title}</h4>
    </div>
  </a>`;
};

const dashboardContainer = document.querySelector("#dashboard-list-container");

dashboardList.forEach((dashboard, index) => {
  dashboardCardsHTML = dashboardCardsHTML + createAndAppendCard(dashboard);
});

dashboardContainer.innerHTML = dashboardCardsHTML;
