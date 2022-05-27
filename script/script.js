// URL: 'https://6277e34508221c96846a7195.mockapi.io/jobs'
const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')
const enlableSpinner = document.getElementById('render-spinner')

let selectedID, jobName, jobDescription, jobLocation, jobSeniority, jobCategory, saveHorseName, saveHorseImg, saveHorseDetails

const renderSpinner = () => {
    enlableSpinner.style.display = 'block'
}

// G E T

const getHorseJobs = () => {
    fetch('https://6277e34508221c96846a7195.mockapi.io/jobs')
        .then(res => res.json())
        .then(data => createJobCards(data))
        .catch(err => console.log(err))
}

getHorseJobs()

const createJobCards = (jobs) => {
    cardContainer.innerHTML = ''
    renderSpinner()
    setTimeout(() => {
        enlableSpinner.style.display = 'none'
        jobs.forEach(job => {
            const { name, id, description, location, category, seniority } = job
                cardContainer.innerHTML += `
                            <div class="card">
                            <h2>${name}</h2>
                                <div>
                                    <p>${description}</p>
                                </div>
                            <h3><span>${location}</span><span>${category}</span><span>${seniority}</span></h3>
                            <button onClick="seeJobDetails(${id})">See Details</button>
                            </div>
                        `
    })
 }, 2000)
}

const seeJobDetails = (jobId) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${jobId}`)
        .then(res => res.json())
        .then(data => createCardDetail(data))
    selectedID = jobId
}
    
const createCardDetail = (cardDetail) => {
    const { name, location, category, seniority, description, horse } = cardDetail
    const { horseName, horseImg, horseDetail } = horse

    jobName = name
    jobDescription = description
    jobLocation = location
    jobCategory = category
    jobSeniority = seniority

    saveHorseName = horseName
    saveHorseDetails = horseDetail
    saveHorseImg = horseImg

    cardContainer.innerHTML = ''

    renderSpinner()

    setTimeout( () => {
        enlableSpinner.style.display = 'none'

        cardContainer.innerHTML = `
                        <div class="card-detail">

                        <p class="return" onClick="getHorseJobs()">Go back</p> 
                        <div class="job-horse-container">
                        <div class="job-details">
                                    <h2>${name}</h2>
                                    <div class="job-description">
                                        <h4>Job Description:</h4>
                                        <p>${description}</p>
                                    </div>
                                    <div class="tags-container">
                                        <h3>Tags: </h3> 
                                        <span>${location}</span> 
                                        <span>${category}</span> 
                                        <span>${seniority}</span>
                                    </div>
                                </div>

                                <div class="horse-details">
                                    <img src="${horseImg}" alt="${horseName}"/>
                                    <h4>Horse Name: </h4> <p>${horseName} </p>
                                    <h4>Horse Aditional Details:</h4> <p>${horseDetail}</p>
                                </div>
                            </div>

                            <div class="button-container">
                            <button class="btn-delete" id="delete-job">Delete</button>
                            <button class="btn-edit" id="edit-job">Edit</button>
                            </div>
                        </div>`

        const btnDeleteJob = document.getElementById('delete-job')
        btnDeleteJob.addEventListener('click', warningDelete)

        const btnEditJob = document.getElementById('edit-job')
        btnEditJob.addEventListener('click', () => showEditForm(selectedID))
    }, 2000)
}

const searchForm = document.getElementById('search-form')

const createNewJob = () => {
    searchForm.style.display = 'none'
    cardContainer.innerHTML = `
                <form class="create-job-form">
                <label>Job Name: </label>
                    <input type="text" id="job-name" />
                <label>Description: </label>
                <textarea cols="30" rows="10" id="job-description"></textarea>

                <label>Job location:</label>
                <select name="Location" id="job-location">
                    <option value="Location">Location...</option>
                    <option value="CABA">CABA</option>
                    <option value="GBA Norte">GBA Norte</option>
                    <option value="GBA Oeste">GBA Oeste</option>
                    <option value="GBA Sur">GBA Sur</option>
                </select>

                <label>Job Seniority:</label>
                <select name="Seniority" id="job-seniority">
                    <option value="Seniority">Seniority...</option>
                    <option value="Trainee">Trainee</option>
                    <option value="Junior">Junior</option>
                    <option value="Semi-Senior">Semi Senior</option>
                    <option value="Senior">Senior</option>
                </select>
                
                <label>Job Category:</label>
                <select name="Category" id="job-category">
                    <option value="Category">Category...</option>
                    <option value="Horse Care">Horse Care</option>
                    <option value="Competition">Competition</option>
                    <option value="Training">Training</option>
                    <option value="Breeding">Breeding</option>
                </select>

                <h4>Horse Details:</h4>
                <label>Horse Name: </label>
                    <input type="text" id="horse-name"/>
                <label>Horse Img (Url): </label>
                    <input type="text" id="horse-img"/>
                <label>Horse Details: </label>
                    <textarea cols="30" rows="10" id="horse-detail"></textarea>
                <div>
                    <button class="btn-cancel" onClick="getHorseJobs()">Cancel</button>
                    <button class="btn-success" id="submit-job">Create job</button> 
                </div>
            </form>
            `

    const submitJob = document.getElementById('submit-job')
    submitJob.addEventListener('click', (e) => {
        e.preventDefault()
        submitNewJob()
    })
}

const btnCreateJob = document.getElementById('btn-create-job')

btnCreateJob.addEventListener('click', createNewJob)


// P O S T 

const saveJobInfo = () => {
    return {
        name: document.getElementById('job-name').value,
        description: document.getElementById('job-description').value,
        location: document.getElementById('job-location').value,
        category: document.getElementById('job-category').value,
        seniority: document.getElementById('job-seniority').value,
        horse: {
            horseName:document.getElementById('horse-name').value,
            horseImg: document.getElementById('horse-img').value,
            horseDetail: document.getElementById('horse-detail').value
        }
    } 
}


const submitNewJob = () => {
    
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs`, {
            method: "POST",
            headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(saveJobInfo())
            })
            .then(() => setTimeout(getHorseJobs(), 1000)
            )
        }
        
        
// D E L E T E
        
const deleteJob = (jobId) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${jobId}`, {
    method: 'DELETE'})

    .then(() => setTimeout(getHorseJobs(), 1000))
}

const warningModal = document.getElementById('delete-container')

const warningDelete = () => {
    
    cardContainer.innerHTML += `
    <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Warning</h3>
            <p>Are you sure you want to delete this job offer?</p>

            <div class="btn-container">
                <button class="btn-cancel" id="btn-cancel">Cancel</button>
                <button class="btn-success" id="delete-offer">Delete Offer</button>
            </div>
        </div>
    </div>
    `
    
    const cancelBtn = document.getElementById('btn-cancel')
    const modalContainer = document.getElementById('delete-container')
    cancelBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none'
        seeJobDetails(selectedID)
    })

    const deleteOffer = document.getElementById('delete-offer')
    deleteOffer.addEventListener('click', () => {
        deleteJob(selectedID) 
    })
}

// P U T 

const showEditForm = (selectedID) => {
    cardContainer.innerHTML += `
                    <form class="edit-job-form" id="edit-job-form">
                    <label>Job Name: </label>
                        <input type="text" id="job-name" value="${jobName}"/>
                    <label>Description: </label>
                    <textarea cols="30" rows="10" id="job-description"/>${jobDescription}</textarea>

                    <label>Job location:</label>
                    <select name="Location" id="job-location">
                    <option value="Location" class="option-location">Location...</option>
                    <option value="CABA" class="option-location">CABA</option>
                    <option value="GBA Norte" class="option-location">GBA Norte</option>
                    <option value="GBA Oeste" class="option-location">GBA Oeste</option>
                    <option value="GBA Sur" class="option-location">GBA Sur</option>
                    </select>
                    <label>Job Seniority:</label>
                    <select name="Seniority" id="job-seniority">
                        <option value="Seniority" class="option-seniority">Seniority...</option>
                        <option value="Trainee class="option-seniority"">Trainee</option>
                        <option value="Junior" class="option-seniority">Junior</option>
                        <option value="Semi-Senior" class="option-seniority">Semi Senior</option>
                        <option value="Senior" class="option-seniority">Senior</option>
                        </select>
                        <label>Job Category:</label>
                        <select name="Category" id="job-category">
                        <option value="Category" class="option-category">Category...</option>
                        <option value="Horse Care" class="option-category">Horse Care</option>
                        <option value="Competition" class="option-category">Competition</option>
                        <option value="Training" class="option-category">Training</option>
                        <option value="Breeding" class="option-category">Breeding</option>
                        </select>
                        
                        <h4>Horse Details:</h4>
                        <label>Horse Name: </label>
                        <input type="text" id="horse-name" value="${saveHorseName}" />
                        <label>Horse Img (Url): </label>
                        <input type="text" id="horse-img" value="${saveHorseImg}" />
                        <label>Horse Details: </label>
                        <textarea cols="30" rows="10" id="horse-detail">${saveHorseDetails}</textarea>
                        <div>
                        <button class="btn-cancel" id="cancel-edit">Cancel</button>
                        <button class="btn-success" id="btn-edit-job">Edit job</button> 
                        </div>
                        </form>
                        `

    const optionLocation = document.querySelectorAll('.option-location')  
        for (const option of optionLocation) {
            option.value === jobLocation && option.setAttribute('selected', 'selected')
    }

    
    const optionSeniority = document.querySelectorAll('.option-seniority')  
    for (const option of optionSeniority) {
        option.value === jobSeniority && option.setAttribute('selected', 'selected')
    }
    
    const optionCategory = document.querySelectorAll('.option-category')  
    for (const option of optionCategory) {
        option.value == jobCategory && option.setAttribute('selected', 'selected')
    }


    const btnCancelEdit = document.getElementById('cancel-edit')
    btnCancelEdit.addEventListener('click', (e) => {
        e.preventDefault()

        const editJobForm = document.getElementById('edit-job-form')
        editJobForm.style.display = 'none'
        seeJobDetails(selectedID)
    })

    const btnEditJob = document.getElementById('btn-edit-job')
    btnEditJob.addEventListener('click', (e) => {
        e.preventDefault()
        editJob(selectedID)
    })
}

const editJob = (selectedID) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${selectedID}`, {
        method: "PUT",
            headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(saveJobInfo())
    })
    .then(() => seeJobDetails(selectedID))
}


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
        console.log(searchBy.value)
        console.log(primaryFilter)

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
            console.log(senioritySearch.value)
        })
    }
console.log(secondaryFilter)
})


const filterSearch = (secondaryFilter) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/?search=${secondaryFilter}`)
        .then(res => res.json())
        .then(data => createJobCards(data))
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