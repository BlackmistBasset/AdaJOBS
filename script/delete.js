        
// D E L E T E
        
const deleteJob = (jobId) => {
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs/${jobId}`, {
    method: 'DELETE'})

    .then(() => setTimeout(getHorseJobs(), 1000))
    .catch(err => console.log(err))
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
