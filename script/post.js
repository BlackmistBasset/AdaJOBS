// P O S T 

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
            .then(() => setTimeout(getHorseJobs(), 1000))
            .catch(err => console.log(err))
        }
        
