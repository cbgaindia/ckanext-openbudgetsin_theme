

// ######################### Trending Section functionalities ###################################

const trendingList = [
    {
        title: "Assam Budget Explorer 2023-24 is now LIVE!",
        link: "https://assam2023.openbudgetsindia.org/"
    },    
    {
        title: "Union Budget Explorer 2023-24 is NOW LIVE!",
        link: "https://union.openbudgetsindia.org"
    },    
    {
        title: "Get Union Budget 2023-24 data in CSV, XLSX & PDF formats",
        link: "https://openbudgetsindia.org/dataset?tags=union+budget+2023"
    },    
    {
        title: "Access Union Budget at a Glance & Trends in Receipts as interactive visualizations",
        link: "https://openbudgetsindia.org/dataset?res_format=JSON&tags=budget2022"
    },
    // {
    //     title: "Watch: A guide to help you explore the Open Budgets India platform",
    //     link: "https://youtu.be/xKjzH1ZB3c4"
    // },
    // {
    //     title: "Want to know more about budgets? Watch this 5 min tutorial!",
    //     link: "https://youtu.be/fGxNh5Xfn2I"
    // },
    {
        title: "Get all the latest union and state budget documents for FY 2021-22",
        link: "https://openbudgetsindia.org/dataset?q=%222021-22%22&sort=title_string+asc"
    },
]
let activeIndex = 1
let lastChangeFlag = false
const leftButton = document.getElementById('trending-list-left-button')
const rightButton = document.getElementById('trending-list-right-button')
const trendingItem = document.getElementById('trending-list-link')
const trendingListPagination = document.getElementById('trending-list-pagination')

// Event listeners for Trending Section
leftButton && leftButton.addEventListener('click', () => {
    handleLeftButtonClick()
})

rightButton && rightButton.addEventListener('click', () => {
    handleRightButtonClick()
})

setInterval(() => {
    leftButton && handleAutoChangeTrendingList()
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
    links.forEach(link => link.addEventListener('click', (e) => {
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
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="dashboards" class="mobile-menu-link">
      <span>Dashboards</span> 
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="budgetDatasets" class="mobile-menu-link">
      <span>Budget Datasets</span>
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    obiPlatform : 
    `<div id="mobile-menu-obi-platform">
    <div class="menu-title-bar">
      <button id="mobileMenuHome" class="mobile-menu-back-button"></button>
      <span>OBI Platform</span>
    </div>
    <a href="/pages/how-to-use-the-poevenrtal" target="_blank">
      <span>How to Use</span> 
    </a>
    <a href="/pages/faqs" target="_blank">
      <span>FAQs</span> 
    </a>
    <a href="/about" target="_blank">
      <span>About Us</span>
    </a>
    <a href="#" id="obivideos" class="mobile-menu-link">
      <span>OBI Videos</span>
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    </div>`,

    obivideos : 
    ` <div id="mobile-menu-obi-videos">
    <div class="menu-title-bar">
      <button id="obiPlatform" class="mobile-menu-back-button"></button>
      <span>OBI Videos</span>
    </div>
    <a href="https://youtu.be/PyolFXWARsI" target="_blank">
      <span>Video: OBI Platform</span> 
    </a>
    <a href="https://youtu.be/m5KCwJXTBfI" target="_blank">
      <span>Video: OBI Platform (Hindi)</span> 
    </a>
    <a href="https://youtu.be/--_Z6T4_gf8" target="_blank">
      <span>Video: Budget Basics</span> 
    </a>
    <a href="https://www.youtube.com/watch?v=TovrkaW5HZY" target="_blank">
      <span>Video: Budget Basics (Hindi)</span> 
    </a>
    <a href="https://youtu.be/N7HPuZa9q6I" target="_blank">
      <span>Video: Schemes Dashboard</span> 
    </a>
    <a href="https://www.youtube.com/watch?v=pkzmJJ5itHs" target="_blank">
      <span>Video: Budget Forum</span> 
    </a>
    <a href="https://www.youtube.com/watch?v=BQU2EG3zm-M" target="_blank">
      <span>Video: Budget Forum (Hindi)</span> 
    </a>
    <a href="https://youtu.be/WOcxmRwSO9U" target="_blank">
      <span>Video: Gender Responsive Budgeting</span> 
    </a>
    <a href="https://youtu.be/1O_4jh-jnUs" target="_blank">
      <span>Video: Child Responsive Budgeting</span> 
    </a>
    <a href="https://youtu.be/VgALx59WlIQ" target="_blank">
      <span>Video: How revenue collection from GST has fared in the first 5 years</span> 
    </a>
    `,

    dashboards : 
    `<div id="mobile-menu-dashboards">
    <div class="menu-title-bar">
        <button id="mobileMenuHome" class="mobile-menu-back-button"></button>
        <span>Dashboards</span>
    </div>
    <a href="#" id="unionDashboards" class="mobile-menu-link">
      <span>Union Dashboards</span> 
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="stateDashboards" class="mobile-menu-link">
      <span>State Dashboards</span> 
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="districtDashboards" class="mobile-menu-link">
      <span>District Dashboards</span>
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
    </a>
    <a href="#" id="schemesDashboards" class="mobile-menu-link">
      <span>Schemes Dashboard</span>
      <img src="/arrow/right-white.svg" class="dropdown-right-arrow" />
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
    <a href="https://union.openbudgetsindia.org/en/" target="_blank">
    <span>Union Budget Explorer 2023-24</span> 
    </a>    
    <a href="https://union2022.openbudgetsindia.org/en/" target="_blank">
    <span>Union Budget Explorer 2022-23</span> 
    </a>
    <a href="https://union2021.openbudgetsindia.org/en/" target="_blank">
    <span>Union Budget Explorer 2021-22</span> 
    </a>
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
    <a href="https://odisha2022.openbudgetsindia.org/" target="_blank">
      <span>Odisha Budget Explorer 2022-23</span>
    </a>    
    <a href="https://hp.openbudgetsindia.org/" target="_blank">
      <span>Himachal Pradesh Fiscal Data Explorer</span>
    </a>
    <a href="https://assam2023.openbudgetsindia.org/en/" target="_blank">
        <span>Assam Budget Explorer 2023-24</span> 
    </a>    
    <a href="https://assam2022.openbudgetsindia.org/en/" target="_blank">
    <span>Assam Budget Explorer 2022-23</span> 
    </a>
    <a href="https://assam2021.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2021-22</span> 
    </a>
    <a href="https://assam2020.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2020-21</span> 
    </a>
    <a href="https://assam2019.openbudgetsindia.org/en/" target="_blank">
      <span>Assam Budget Explorer 2019-20</span> 
    </a>
    <a href="https://sectors.openbudgetsindia.org/" target="_blank">
      <span>Sector Dashboard</span> 
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
  </div>`,

  schemesDashboards :
    `<div id="mobile-menu-schemes-dashboards">
    <div class="menu-title-bar">
        <button id="dashboards" class="mobile-menu-back-button"></button>
        <span>Schemes Dashboard</span>
    </div>
    <a href="https://schemes.openbudgetsindia.org/" target="_blank">
      <span>Schemes Dashboard</span> 
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

const platformDropdownContainer = document.getElementById('platform-dropdown-toggle')
const dashboardDropdownContainer = document.getElementById('dashboard-dropdown-toggle')

// #################### Platform Dropdown Funtionality ###############

const platformDropdownElement = document.getElementById('platform-dropdown')

platformDropdownElement.addEventListener('click', (e) => {
    // console.log('testing e target for dropdown', e.target.classList, e)
    if(e.target.className.includes('dropdown-menu-link')){
        e.stopPropagation()
    }
})


//###################### Dropdown Functionality ########################

const dropdownElement = document.getElementById('dashboard-dropdown')
const dropdownContent = document.getElementById('dropdown-menu-content')

dropdownElement.addEventListener('click', (e) => {
    if(e.target.className.includes('dropdown-menu-link')){
        e.stopPropagation()
    }
})

const handleUpdateDropdownContent = (id) => {
        if(platformDropdownContainer.classList.value.includes('open')){
            console.log('platform classlist open')
            platformDropdownElement.innerHTML = dropdownMenuContent[id]

        }
        else if(dashboardDropdownContainer.classList.value.includes('open')){
            console.log('dashboard classlist open')
            dropdownElement.innerHTML = dropdownMenuContent[id]
        }
        handleAddEventListenerForDropdown()
        handleBackButtonForDropdown()
}
const handleBackButtonForDropdown = () => {
    let dropdownBackButton = document.querySelector('.dropdown-title-bar')
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
let elem = document.getElementById('dashboard-dropdown-toggle')
elem.addEventListener('click', function (event) {
    elem2.classList.remove('open')
    elem.classList.toggle('open')
});
let elem2 = document.getElementById('platform-dropdown-toggle')
elem2.addEventListener('click', function (event) {
    elem.classList.remove('open')
    elem2.classList.toggle('open')
});
let body = document.getElementsByTagName('body')[0]
body.addEventListener('click', (e) => {
    if(e.target.getAttribute("name") === "platform-dropdown-toggle"){
    }
    if(e.target.getAttribute("name") === "dashboard-dropdown-toggle"){
    }
    else if(!(e.target.getAttribute("name") === "dashboard-dropdown-element")){
        elem.classList.remove('open')
    }
    // else{
    //     elem.classList.add('open')
    //     // elem2.classList.add('open')
    // }
})



const dropdownMenuContent = {
    dashboards: 
    `<li class="dropdown-menu-link" id="unionDashboards" name="dashboard-dropdown-element">
        <a href="#" class="dropdown-menu-link" name="dashboard-dropdown-element">
          <span name="dashboard-dropdown-element">Union Dashboards</span>
          <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link"  name="dashboard-dropdown-element"/>
        </a>
    </li>
    <li class="dropdown-menu-link" id="stateDashboards" name="dashboard-dropdown-element">
        <a href="#" class="dropdown-menu-link" name="dashboard-dropdown-element">
            <span name="dashboard-dropdown-element">State Dashboards</span>
            <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link"  name="dashboard-dropdown-element"/>                    
        </a>
    </li>
    <li class="dropdown-menu-link" id="districtDashboards" name="dashboard-dropdown-element">
        <a href="#" class="dropdown-menu-link" name="dashboard-dropdown-element">
            <span name="dashboard-dropdown-element">District Dashboards</span>
            <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link"  name="dashboard-dropdown-element"/>                    
        </a>
    </li>
    <li class="dropdown-menu-link" id="schemesDashboards" name="dashboard-dropdown-element">
        <a href="#" class="dropdown-menu-link" name="dashboard-dropdown-element">
            <span name="dashboard-dropdown-element">Schemes Dashboard</span>
            <img src="./arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link"  name="dashboard-dropdown-element"/>                    
        </a>
    </li>`,

    unionDashboards: 
    `
    <div class="dropdown-title-bar" id="dashboards" name="dashboard-dropdown-element">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link" name="dashboard-dropdown-element"></button>
        <span name="dashboard-dropdown-element">Union Dashboards</span>
    </div>
    <li>
        <a href="https://union.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2023-24</span></a>
    </li>    
    <li>
        <a href="https://union2022.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2022-23</span></a>
    </li>
    <li>
        <a href="https://union2021.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2021-22</span></a>
    </li>
    <li>
        <a href="https://union2020.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2020-21</span></a>
    </li>
    <li>
        <a href="https://union2019.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2019-20</span></a>
    </li>
    <li>
        <a href="https://union2019i.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2019-20(I)</span></a>
    </li>
    <li>
    <a href="https://union2018.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Union Budget Explorer 2018-19</span></a>
    </li>`,

    stateDashboards: 
    `
    <div class="dropdown-title-bar" id="dashboards" name="dashboard-dropdown-element">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link" name="dashboard-dropdown-element"></button>
        <span name="dashboard-dropdown-element">State Dashboards</span>
    </div>
    <li>
        <a href="https://odisha2022.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Odisha Budget Explorer 2022-23</span></a>
    </li>    
    <li>
        <a href="https://hp.openbudgetsindia.org/" target="_blank"><span class="dashboards-span">Himachal Pradesh Fiscal Data Explorer</span></a>
    </li>
    <li>
        <a href="https://assam2023.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Assam Budget Explorer 2023-24</span></a>
    </li>    
    <li>
        <a href="https://assam2022.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Assam Budget Explorer 2022-23</span></a>
    </li>
    <li>
        <a href="https://assam2021.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Assam Budget Explorer 2021-22</span></a>
    </li>
    <li>
        <a href="https://assam2020.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Assam Budget Explorer 2020-21</span></a>
    </li>
    <li>
        <a href="https://assam2019.openbudgetsindia.org/en/" target="_blank"><span class="dashboards-span">Assam Budget Explorer 2019-20</span></a>
    </li>
    <li>
        <a href="https://sectors.openbudgetsindia.org/" target="_blank"><span class="dashboards-span">Sector Dashboard</span></a>
    </li>`,

    districtDashboards:
    `
    <div class="dropdown-title-bar" id="dashboards" name="dashboard-dropdown-element"">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link" name="dashboard-dropdown-element"></button>
        <span name="dashboard-dropdown-element">District Dashboards</span>
    </div>
    <li>
        <a href="https://dash.openbudgetsindia.org/superset/dashboard/odisha_balasore_treasury_dashboard/?standalone=true" target="_blank"><span class="dashboards-span">Balasore District Treasury Dashboard</span></a>
    </li>
    <li>
        <a href="https://dash.openbudgetsindia.org/superset/dashboard/ap_krishna_treasury_dashboard/?standalone=true" target="_blank"><span class="dashboards-span">Krishna District Treasury Dashboard</span></a>
    </li>`,

    schemesDashboards:
    `
    <div class="dropdown-title-bar" id="dashboards" name="dashboard-dropdown-element"">
        <button id="dashboards" class="dropdown-menu-back-button dropdown-menu-link" name="dashboard-dropdown-element"></button>
        <span name="dashboard-dropdown-element">Schemes Dashboard</span>
    </div>
    <li>
        <a href="https://schemes.openbudgetsindia.org/" target="_blank"><span class="dashboards-span">Schemes Dashboard</span></a>
    </li>`,

    platform: 
    `
    <li>
        <a href="/pages/how-to-use-the-portal" target="_blank">How to Use</a>
        <!-- <img src="./arrow/right.svg" class="dropdown-right-arrow" /> -->
    </li>
    <li>
        <a href="/pages/faqs" target="_blank">FAQs</a>
        <!-- <img src="./arrow/right.svg" class="dropdown-right-arrow" /> -->
    </li>
    <li>
        <a href="/about" target="_blank">About Us</a>
        <!-- <img src="./arrow/right.svg" class="dropdown-right-arrow" /> -->
    </li>
    <li class="dropdown-menu-link" id="obivideos" name="platform-dropdown-element">
        <a href="#" class="dropdown-menu-link" name="platform-dropdown-element">
        <span name="platform-dropdown-element">OBI Videos</span>
        <img src="/arrow/right.svg" class="dropdown-right-arrow dropdown-menu-link" name="platform-dropdown-element"/>
        </a>
    </li>`,

    obivideos:
    `
    <div class="dropdown-title-bar" id="platform" name="platform-dropdown-element"">
        <button id="platform" class="dropdown-menu-back-button dropdown-menu-link" name="platform-dropdown-element"></button>
        <span name="platform-dropdown-element">OBI Videos</span>
    </div>
    <li>
        <a href="https://youtu.be/xKjzH1ZB3c4" target="_blank"><span class="dashboards-span">Video: OBI Platform</span></a>
    </li>
    <li>
        <a href="https://youtu.be/m5KCwJXTBfI" target="_blank"><span class="dashboards-span">Video: OBI Platform (Hindi)</span></a>
    </li>
    <li>
        <a href="https://youtu.be/fGxNh5Xfn2I" target="_blank"><span class="dashboards-span">Video: Budget Basics</span></a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=TovrkaW5HZY" target="_blank"><span class="dashboards-span">Video: Budget Basics (Hindi)</span></a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=VLbr6gJ3cuw" target="_blank"><span class="dashboards-span">Video: Schemes Dashboard</span></a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=pkzmJJ5itHs" target="_blank"><span class="dashboards-span">Video: Budget Forum</span></a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=BQU2EG3zm-M" target="_blank"><span class="dashboards-span">Video: Budget Forum (Hindi)</span></a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=Kbp0r7oS578" target="_blank"><span class="dashboards-span">Video: Gender Responsive Budgeting</span></a>
    </li>`,

}

//########################### Swipe Right Button ########################

let scrollableContainer = document.getElementById('govt-tiers-cards-container')

scrollableContainer && scrollableContainer.addEventListener('scroll', () => {
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
