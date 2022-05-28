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
        validateEditJobForm()
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
    .catch(err => console.log(err))
}

const validateEditJobForm = () => {

    const jobName = document.getElementById('job-name')
    const jobDescription = document.getElementById('job-description')
    const jobLocation = document.getElementById('job-location')
    const jobCategory = document.getElementById('job-category')
    const jobSeniority =  document.getElementById('job-seniority')

    const horseName = document.getElementById('horse-name')
    const horseImg = document.getElementById('horse-img')
    const horseDetail = document.getElementById('horse-detail')

    if (jobName.value === '' || jobDescription.value === '' || jobCategory.value === 'Category' || jobSeniority.value === 'Seniority' || jobLocation.value === 'Location' || horseName.value === '' || horseImg.value === '' || horseDetail.value === '') {
        errorContainer.innerHTML = `
        <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Error</h3>
            <p>Please fill every field! </p>

            <div class="btn-container">
                <button class="btn-success" id="close-alert">Close</button>
            </div>
        </div>
    </div>`
    } else {
        editJob(selectedID)
    }

    const closeAlert = document.getElementById('close-alert')
    const modalContainer = document.getElementById('delete-container')

    closeAlert.addEventListener('click', () => {
        modalContainer.style.display = 'none'
    })
}