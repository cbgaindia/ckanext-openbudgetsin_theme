

// ######################### Trending Section functionalities ###################################

const trendingList = [
    {
        title: "Get Union Budget 2020-21 data in CSV, XLSX & PDF formats",
        link: "https://openbudgetsindia.org/dataset?tags=union+budget+2020"
    },
    {
        title: "Access Assam Budget Data for FY 2020-21 in CSV, XLSX and PDF formats",
        link: "https://openbudgetsindia.org/organization/about/assam"
    },
    {
        title: "Download Maharashtra Budget Documents for FY 2020-21 and previous years",
        link: "https://openbudgetsindia.org/organization/about/maharashtra"
    },
    {
        title: "Get Odisha Budget Documents for FY 2020-21 and previous years",
        link: "https://openbudgetsindia.org/organization/about/odisha"
    },
    {
        title: "Access Rajasthan Budget Documents for FY 2020-21 and previous years",
        link: "https://openbudgetsindia.org/organization/about/rajasthan"
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

setInterval(() => {
    handleAutoChangeTrendingList()
}, 5000);

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
    </a>
    <a href="https://openbudgetsindia.org/pages/faqs" target="_blank">
      <span>FAQs</span> 
    </a>
    <a href="https://openbudgetsindia.org/about" target="_blank">
      <span>About Us</span>
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
    </a>
    <a href="https://openbudgetsindia.org/group" target="_blank">
      <span>By Sectors</span> 
    </a>
    <a href="https://openbudgetsindia.org/dataset" target="_blank">
      <span>All Datasets</span>
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
    </a>
    <a href="https://union2019.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2019-20</span> 
    </a>
    <a href="https://union2019i.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2019-20(I)</span>
    </a>
    <a href="https://union2018.openbudgetsindia.org/en/" target="_blank">
      <span>Union Budget Explorer 2018-19</span>
    </a>
    </div>`,

    stateDashboards : 
    `<div id="mobile-menu-state-dashboards">
    <div class="menu-title-bar">
        <button id="dashboards" class="mobile-menu-back-button"></button>
        <span>State Dashboards</span>
    </div>
    <a href="https://hp.openbudgetsindia.org/" target="_blank">
      <span>Himachal Pradesh Fiscal Data Explorer</span>
    </a>
    <a href="https://assam2020.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2020-21</span> 
    </a>
    <a href="https://assam2019.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2019-20</span> 
    </a>
    <a href="https://cbgaindia.github.io/story-generator/" target="_blank">
      <span>Story Generator</span> 
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
    </a>
    <a href="https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true" target="_blank">
      <span>Krishna District Treasury Dashboard</span> 
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


//###################### Dropdown Functionality ########################

const dropdownElement = document.getElementById('dashboard-dropdown')
const dropdownContent = document.getElementById('dropdown-menu-content')

dropdownElement.addEventListener('click', (e) => {
    console.log('testing e target for dropdown', e.target.classList, e)
    if(e.target.className.includes('dropdown-menu-link')){
        e.stopPropagation()
    }
})

const handleUpdateDropdownContent = (id) => {
    // dropdownContent.classList.add('fade-out');
    // setTimeout(() => {
        // dropdownContent.classList.remove('fade-out')
        // dropdownContent.innerHTML = dropdownMenuContent[id]
        dropdownElement.innerHTML = dropdownMenuContent[id]
        handleAddEventListenerForDropdown()
        handleBackButtonForDropdown()
    // }, 400);
}
const handleBackButtonForDropdown = () => {
    let dropdownBackButton = document.querySelector('.dropdown-menu-back-button')
    if(dropdownBackButton){
        dropdownBackButton.addEventListener('click', () => {
            handleUpdateDropdownContent(dropdownBackButton.id)
        })
    }
}
const handleAddEventListenerForDropdown = () => {
    let dropdownLinks = document.querySelectorAll(".dropdown-menu-link")
    dropdownLinks.forEach(link => link.addEventListener('click', (e) => {
        handleUpdateDropdownContent(link.id)
    }));
}

handleAddEventListenerForDropdown()




const dropdownMenuContent = {
    dashboards: 
    `<li class="dropdown-menu-link" id="unionDashboards">
        <a href="#" class="dropdown-menu-link">Union Dashboards</a>
        <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link" />
    </li>
    <li class="dropdown-menu-link" id="stateDashboards">
        <a href="#" class="dropdown-menu-link">State Dashboards</a>
        <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link" />
    </li>
    <li class="dropdown-menu-link" id="districtDashboards">
        <a href="#" class="dropdown-menu-link">District Dashboards</a>
        <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link" />
    </li>`,

    unionDashboards: 
    `
    <div class="dropdown-title-bar">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link"></button>
        <span>Union Dashboards</span>
    </div>
    <li>
        <a href="https://union2020.openbudgetsindia.org/en/" target="_blank">Union Budget Explorer 2020-21</a>
    </li>
    <li>
        <a href="https://union2019.openbudgetsindia.org/en/" target="_blank">Union Budget Explorer 2019-20</a>
    </li>
    <li>
        <a href="https://union2019i.openbudgetsindia.org/en/" target="_blank">Union Budget Explorer 2019-20(I)</a>
    </li>
    <li>
    <a href="https://union2018.openbudgetsindia.org/en/" target="_blank">Union Budget Explorer 2018-19</a>
    </li>`,

    stateDashboards: 
    `
    <div class="dropdown-title-bar">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link"></button>
        <span>State Dashboards</span>
    </div>
    <li>
        <a href="https://hp.openbudgetsindia.org/" target="_blank">Himachal Pradesh Fiscal Data Explorer</a>
    </li>
    <li>
        <a href="https://assam2020.openbudgetsindia.org/en/" target="_blank">Assam Budget Explorer 2020-21</a>
    </li>
    <li>
        <a href="https://assam2019.openbudgetsindia.org/en/" target="_blank">Assam Budget Explorer 2019-20</a>
    </li>
    <li>
        <a href="https://cbgaindia.github.io/story-generator/" target="_blank">Story Generator</a>
    </li>`,

    districtDashboards:
    `
    <div class="dropdown-title-bar">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link"></button>
        <span>District Dashboards</span>
    </div>
    <li>
        <a href="https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true" target="_blank">Balasore District Treasury Dashboard</a>
    </li>
    <li>
        <a href="https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true" target="_blank">Krishna District Treasury Dashboard</a>
    </li>`,
}

//########################### Swipe Right Button ########################

let scrollableContainer = document.getElementById('govt-tiers-cards-container')

scrollableContainer.addEventListener('scroll', () => {
    let swipeButton = scrollableContainer.querySelector('.swipe-right-button')
    if(swipeButton){
        swipeButton.style.display = "none"
    }
})


//########################### Home Search Section ########################

let inputBox = document.getElementById('home-search-input')
let searchButton = document.getElementById('home-search-button')
let searchButtonMobile = document.getElementById('home-search-button-mobile')
if(inputBox){
    inputBox.addEventListener('keyup', (e) => {
        console.log('testing input', e.target.value)
        let searchText = e.target.value.trim()
    
        if(searchText.length){
            // Active button - remove disable class
            searchButton.classList.add('active')
            searchButtonMobile.getElementsByTagName('img')[0].src = "home-search-icon-blue.svg"
        }
        else{
            // Disable button - add disable class
            searchButton.classList.remove('active')
            searchButtonMobile.getElementsByTagName('img')[0].src = "home-search-icon-grey.svg"
        }
    })
}