// URL: 'https://6277e34508221c96846a7195.mockapi.io/jobs'
const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')

const getHorseJobs = () => {
    cardContainer.innerHTML = ''
    fetch('https://6277e34508221c96846a7195.mockapi.io/jobs')
        .then(res => res.json())
        .then(data => createJobCards(data))
        .catch(err => console.log(err))
}

getHorseJobs()

const createJobCards = (jobs) => {
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
}

const seeJobDetails = (jobId) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${jobId}`)
        .then(res => res.json())
        .then(data => createCardDetail(data))
    }
    
    const createCardDetail = (cardDetail) => {
        const { name, location, category, seniority, description, horse } = cardDetail
        const { horseName, horseImg, horseDetail } = horse
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
                                    <button class="btn-edit">Edit</button>
                                    <button class="btn-delete">Delete</button>
                                </div>
                            </div>`
    }