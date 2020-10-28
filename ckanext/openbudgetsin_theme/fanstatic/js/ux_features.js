// ######################### Trending Section functionalities ###################################

const trendingList = [
    {
        title: "Introducing the new Himachal Pradesh Fiscal Data Explorer",
        link: "https://hp.openbudgetsindia.org/"
    },
    {
        title: "Content2",
        link: ""
    },
    {
        title: "Content3",
        link: ""
    },
    {
        title: "Content4",
        link: ""
    },
    {
        title: "Content5",
        link: ""
    }
]
let activeIndex = 1
let lastChangeFlag = false
const leftButton = document.getElementById('trending-list-left-button')
const rightButton = document.getElementById('trending-list-right-button')
const trendingItem = document.getElementById('trending-list-link')
const trendingListPagination = document.getElementById('trending-list-pagination')

// Event listeners for Trending Section
leftButton.addEventListener('click', () => {
    handleLeftButtonClick()
})

rightButton.addEventListener('click', () => {
    handleRightButtonClick()
})

// setInterval(() => {
//     handleAutoChangeTrendingList()
// }, 5000);

const handleLeftButtonClick = () => {
    if(activeIndex === trendingList.length){
        rightButton.removeAttribute("disabled")
        rightButton.style.backgroundImage = "url('../../../arrow-right.svg')"
    }
    if(activeIndex === 2){
        leftButton.setAttribute("disabled", true)
        leftButton.style.backgroundImage = "url('../../../arrow-left-fade.svg')"
    }
    
    activeIndex -= 1;
    handleLastChangeFlag()
    handleUpdateTrendingItem()
}

const handleRightButtonClick = () => {
    if(activeIndex === 1){
        leftButton.removeAttribute("disabled")
        leftButton.style.backgroundImage = "url('../../../arrow-left.svg')"
    }
    if(activeIndex === trendingList.length-1){
        rightButton.setAttribute("disabled", true)
        rightButton.style.backgroundImage = "url('../../../arrow-right-fade.svg')"
    }
    
    activeIndex += 1;
    handleLastChangeFlag()
    handleUpdateTrendingItem()
}

// Function for updating content in trending list
const handleUpdateTrendingItem = () => {
    const trendingItemContent = trendingList[activeIndex-1]

    // Dom manipulation
    trendingItem.classList.add('fade-out');
    trendingListPagination.innerHTML = `${activeIndex}/${trendingList.length}`
    setTimeout(() => {
        trendingItem.classList.remove('fade-out')
        trendingItem.innerHTML = trendingItemContent.title
        trendingItem.setAttribute("href", trendingItemContent.link)
    }, 400);
}

const handleLastChangeFlag = () => {
    lastChangeFlag = true
    setTimeout(() => {
        lastChangeFlag = false
    }, 5000);
}

// Function for self changing 
const handleAutoChangeTrendingList = () => {
    console.log('inside auto change trending list')
    if(!lastChangeFlag){
        if(activeIndex === trendingList.length){
            activeIndex = 1
            leftButton.setAttribute("disabled", true)
            leftButton.style.backgroundImage = "url('../../../arrow-left-fade.svg')"
            rightButton.removeAttribute("disabled")
            rightButton.style.backgroundImage = "url('../../../arrow-right.svg')"
            handleUpdateTrendingItem()
        }
        else{
            handleRightButtonClick()
        }
    }
}



//################################## Mobile Menu ############################################

let mobileMenuButton = document.getElementById('mobile-menu-toggle')
let sidebar = document.getElementById('mobile-menu-sidebar')
let closeButton = document.getElementById('mobile-menu-close-btn')
let sidebarContent = document.getElementById('mobile-menu-content')

mobileMenuButton.addEventListener('click', () => {
    sidebar.style.width = "304px";
})

closeButton.addEventListener('click', () => {
    sidebar.style.width = "0";
})

const handleUpdateMenuContent = (id) => {
    sidebarContent.classList.add('fade-out');
    setTimeout(() => {
        sidebarContent.classList.remove('fade-out')
        sidebarContent.innerHTML = mobileMenuContent[id]
        handleAddEventListener()
        handleBackButton()
    }, 400);
}

const handleAddEventListener = () => {
    let links = document.querySelectorAll(".mobile-menu-link")
    console.log('adding links', links)
    links.forEach(link => link.addEventListener('click', (e) => {
        console.log('inside click on link', link, e, link.id)
        handleUpdateMenuContent(link.id)
    }));
}
const handleBackButton = () => {
    let closebtn = document.getElementById('mobile-menu-close-btn')
    let backButton = document.querySelector('.mobile-menu-back-button')
    if(closebtn){
        closebtn.addEventListener('click', () => {
            sidebar.style.width = "0";
        })
    }
    else{
        backButton.addEventListener('click', () => {
            handleUpdateMenuContent(backButton.id)
        })
    }

}
handleAddEventListener()

const mobileMenuContent = {
    
    mobileMenuHome : 
    `<div id="mobile-menu-home" class="mobile-menu-home">
    <button id="mobile-menu-close-btn" class="closebtn"></button>
    <a href="#" id="obiPlatform" class="mobile-menu-link">
      <span>OBI Platform</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="dashboards" class="mobile-menu-link">
      <span>Dashboards</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="budgetDatasets" class="mobile-menu-link">
      <span>Budget Datasets</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    obiPlatform : 
    `<div id="mobile-menu-obi-platform">
    <div class="menu-title-bar">
      <button id="mobileMenuHome" class="mobile-menu-back-button"></button>
      <span>OBI Platform</span>
    </div>
    <a href="https://openbudgetsindia.org/pages/how-to-use-the-portal" target="_blank">
      <span>How to Use</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://openbudgetsindia.org/pages/faqs" target="_blank">
      <span>FAQs</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://openbudgetsindia.org/about" target="_blank">
      <span>About Us</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    dashboards : 
    `<div id="mobile-menu-dashboards">
    <div class="menu-title-bar">
        <button id="mobileMenuHome" class="mobile-menu-back-button"></button>
        <span>Dashboards</span>
    </div>
    <a href="#" id="unionDashboards" class="mobile-menu-link">
      <span>Union Dashboards</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="stateDashboards" class="mobile-menu-link">
      <span>State Dashboards</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="districtDashboards" class="mobile-menu-link">
      <span>District Dashboards</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    budgetDatasets :
    `<div id="mobile-menu-budget-datasets">
    <div class="menu-title-bar">
        <button id="mobileMenuHome" class="mobile-menu-back-button"></button>
        <span>Budget Datasets</span>
    </div>
    <a href="https://openbudgetsindia.org/organization" target="_blank">
      <span>By Tiers of Government</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://openbudgetsindia.org/group" target="_blank">
      <span>By Sectors</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://openbudgetsindia.org/dataset" target="_blank">
      <span>All Datasets</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    unionDashboards : 
    `<div id="mobile-menu-union-dashboards">
    <div class="menu-title-bar">
        <button id="dashboards" class="mobile-menu-back-button"></button>
        <span>Union Dashboards</span>
    </div>
    <a href="https://union2020.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2020-21</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://union2019.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2019-20</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://union2019i.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2019-20(I)</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://union2018.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2018-19</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    stateDashboards : 
    `<div id="mobile-menu-state-dashboards">
    <div class="menu-title-bar">
        <button id="dashboards" class="mobile-menu-back-button"></button>
        <span>State Dashboards</span>
    </div>
    <a href="#">
      <span>Himachal Pradesh Fiscal Data Explorer</span>
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://assam2019.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2019-20</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://cbgaindia.github.io/story-generator/" target="_blank">
      <span>Story Generator</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    districtDashboards :
    `<div id="mobile-menu-district-dashboards">
    <div class="menu-title-bar">
        <button id="dashboards" class="mobile-menu-back-button"></button>
        <span>District Dashboards</span>
    </div>
    <a href="https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true" target="_blank">
      <span>Balasore District Treasury Dashboard</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true" target="_blank">
      <span>Krishna District Treasury Dashboard</span> 
      <img src="./arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
  </div>`
}
// let mobileMenuContent = [
//     {
//         id : "mobile-menu-obi-platform",
//         title: "OBI Platform",
//         link: "",
//         submenu: [
//             {
//                 id : "",
//                 title: "How to Use",
//                 link: "",
//             },
//             {
//                 id : "",
//                 title: "FAQs",
//                 link: "",
//             },
//             {
//                 id : "",
//                 title: "About Us",
//                 link: "",
//             }
//         ]
//     },
//     {
//         id : "mobile-menu-budget-datasets",
//         title: "Budget Datasets",
//         link: "",
//         submenu: [
//             {
//                 id : "",
//                 title: "By Tiers of Government",
//                 link: "",
//             },
//             {
//                 id : "",
//                 title: "By Sectors",
//                 link: "",
//             },
//             {
//                 id : "",
//                 title: "All Datasets",
//                 link: "",
//             }   
//         ]
//     },
//     {
//         id : "mobile-menu-dashboards",
//         title: "Dashboards",
//         link: "",
//         submenu: [
//             {
//                 id : "",
//                 title: "Union Dashboards",
//                 link: "",
//                 submenu: [
//                     {
//                         id : "",
//                         title: "Union Budget Explorer 2020-21",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Union Budget Explorer 2019-20",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Union Budget Explorer 2019-20(I)",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Union Budget Explorer 2018-19",
//                         link: "",
//                     }
//                 ]
//             },
//             {
//                 id : "",
//                 title: "State Dashboards",
//                 link: "",
//                 submenu: [
//                     {
//                         id : "",
//                         title: "Himachal Pradesh Fiscal Data Explorer",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Assam Budget Explorer 2019-20",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Story Generator",
//                         link: "",
//                     }
//                 ]
//             },
//             {
//                 id : "",
//                 title: "District Dashboards",
//                 link: "",
//                 submenu: [
//                     {
//                         id : "",
//                         title: "Balasore District Treasury Dashboard",
//                         link: "",
//                     },
//                     {
//                         id : "",
//                         title: "Krishna District Treasury Dashboard",
//                         link: "",
//                     }
//                 ]
//             }
//         ]
//     }

// ]

