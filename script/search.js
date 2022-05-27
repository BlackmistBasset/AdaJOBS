// S E A R C H   F I L T E R 

const searchBy = document.getElementById('search-by')

const locationSearch = document.getElementById('location-search')
const senioritySearch = document.getElementById('seniority-search')
const categorySearch = document.getElementById('category-search')

let primaryFilter = ''
let secondaryFilter = ' '

searchBy.addEventListener('change', () => {
    primaryFilter = searchBy.value

    if (searchBy.value === 'Location') {
        locationSearch.classList.add('show-bar')
        senioritySearch.classList.remove('show-bar')
        categorySearch.classList.remove('show-bar')

    } else if (searchBy.value === 'Seniority') {
        locationSearch.classList.remove('show-bar')
        senioritySearch.classList.add('show-bar')
        categorySearch.classList.remove('show-bar')

    } else  if (searchBy.value === 'Category') {
        locationSearch.classList.remove('show-bar')
        senioritySearch.classList.remove('show-bar')
        categorySearch.classList.add('show-bar')

    } else {
            locationSearch.classList.remove('show-bar')
            senioritySearch.classList.remove('show-bar')
            categorySearch.classList.remove('show-bar')
    }

    if (primaryFilter === 'Location') {
        locationSearch.addEventListener('change', () => {
            secondaryFilter = locationSearch.value
        })
    } else if (primaryFilter === 'Category') {
        categorySearch.addEventListener('change', () => {
            secondaryFilter = categorySearch.value
        }) 
    } else if (primaryFilter === 'Seniority') {
        senioritySearch.addEventListener('change', () => {
            secondaryFilter = senioritySearch.value
        })
    }
})


const filterSearch = (secondaryFilter) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/?search=${secondaryFilter}`)
        .then(res => res.json())
        .then(data => createJobCards(data))
        .catch(err => renderErrorDetail(err))
}

const btnSearch = document.getElementById('btn-search')
const btnCancelSearch = document.getElementById('btn-cancel-search')

btnSearch.addEventListener('click', () => filterSearch(secondaryFilter))

btnCancelSearch.addEventListener('click', () => {
    getHorseJobs()
    primaryFilter = ''
    secondaryFilter = ''
    searchBy.value = 'SearchBy'
    locationSearch.classList.remove('show-bar')
    senioritySearch.classList.remove('show-bar')
    categorySearch.classList.remove('show-bar')
})