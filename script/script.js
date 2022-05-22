// URL: 'https://6277e34508221c96846a7195.mockapi.io/jobs'
const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')

const getHorseJobs = () => {
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
        const { name, location, category, seniority, description } = cardDetail
    cardContainer.innerHTML = `
                                <div class="card-detail">
                                    <h2>${name}</h2>
                                    <p>${description}</p>
                                    <div>
                                        <h3>Tags: </h3> 
                                        <span>${location}</span> 
                                        <span>${category}</span> 
                                        <span>${seniority}</span>
                                    </div>
                                    <div class="button-container">
                                        <button class="btn-editar">Editar</button>
                                        <button class="btn-eliminar">Eliminar</button>
                                    </div>
                                </div>`
    }