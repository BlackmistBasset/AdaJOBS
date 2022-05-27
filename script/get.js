const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')
const enlableSpinner = document.getElementById('render-spinner')
const errorContainer = document.getElementById('warning-container')


const searchForm = document.getElementById('search-form')
const showFooter = document.getElementById('footer')

let selectedID, jobName, jobDescription, jobLocation, jobSeniority, jobCategory, saveHorseName, saveHorseImg, saveHorseDetails

const renderSpinner = () => {
    enlableSpinner.style.display = 'block'
}

const renderErrorDetail = (errorDetail) => {
    errorContainer.innerHTML += `
    <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Error</h3>
            <p>We're sorry, but something went wrong. </p>

            <p>Error details:</p>
            <p>${errorDetail}</p>


            <div class="btn-container">
                <button class="btn-success" id="close-alert">Go to main page</button>
            </div>
        </div>
    </div>
    `
    const deleteContainer = document.getElementById('delete-container')
    const closeAlert = document.getElementById('close-alert')
    closeAlert.addEventListener('click', () => {
        deleteContainer.style.display = 'none'
        getHorseJobs()
    })
    
}

// G E T

const getHorseJobs = () => {
    searchForm.style.display = 'flex'
    fetch('https://6277e34508221c96846a7195.mockapi.io/jobs')
        .then(res => res.json())
        .then(data => createJobCards(data))
        .catch(err => renderErrorDetail(err))
}

getHorseJobs()

const createJobCards = (jobs) => {
    cardContainer.innerHTML = ''
    renderSpinner()
    setTimeout(() => {
        enlableSpinner.style.display = 'none'
        showFooter.style.display = 'block'
        jobs.forEach(job => {
            const { name, id, description, location, category, seniority } = job
                cardContainer.innerHTML += `
                            <div class="card">
                                <h2>${name}</h2>
                                    <div>
                                        <p>${description}</p>
                                    </div>
                                <h3> <span>${location}</span> <span>${category}</span> <span>${seniority}</span> </h3>

                                <button onClick="seeJobDetails(${id})">See Details</button>
                            </div>
                        `
    })
 }, 2000)
}

const seeJobDetails = (jobId) => {
    showFooter.style.display = 'none'
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${jobId}`)
        .then(res => res.json())
        .then(data => createCardDetail(data))
        .catch(err => renderErrorDetail(err))
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
        showFooter.style.display = 'block'

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






