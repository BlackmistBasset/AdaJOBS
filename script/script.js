// URL: 'https://6277e34508221c96846a7195.mockapi.io/jobs'
const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')
const enlableSpinner = document.getElementById('render-spinner')

const renderSpinner = () => {
    enlableSpinner.style.display = 'block'
}

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
}
    
const createCardDetail = (cardDetail) => {
    const { name, location, category, seniority, description, horse } = cardDetail
    const { horseName, horseImg, horseDetail } = horse

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
                            <button class="btn-delete">Delete</button>
                            <button class="btn-edit">Edit</button>
                            </div>
                        </div>`
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
                    <option value="Horse Competition">Competition</option>
                    <option value="Horse Training">Training</option>
                    <option value="Horse Breeding">Breeding</option>
                </select>

                <h4>Horse Details:</h4>
                <label>Horse Name: </label>
                    <input type="text" id="horse-name"/>
                <label>Horse Img (Url): </label>
                    <input type="text" id="horse-img"/>
                <label>Horse Details: </label>
                    <textarea cols="30" rows="10" id="horse-detail"></textarea>
                <div>
                    <button onClick="getHorseJobs()">Cancel</button>
                    <button id="submit-job">Create job</button> 
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
            .then (data => console.log(data))
            .catch(err => console.log(err))
            .finally(() => setTimeout(getHorseJobs(), 1000)
            )
        }
        
      


