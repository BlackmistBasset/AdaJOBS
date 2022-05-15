// URL: 'https://6277e34508221c96846a7195.mockapi.io/jobs'

const sample =  {
    "name": "Horse Caretaker",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus turpis in eu mi bibendum neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus turpis in eu mi bibendum neque.",
    "location": "CABA",
    "category": "Horse care",
    "seniority": "Junior",
    "horses": [
     {
      "names": [
       "horse-name1",
       "horse-name2"
      ],
      "img": "./assets/horse-sample.png",
      "description": "horses-details"
     }
    ],
    "id": "1"
   }

   const card = document.querySelector('.card')

//    card.innerHTML = `<h2>${sample.name}</h2>
//                      <div>
//                      <p>${sample.description}</p>
//                      </div>
//                      <h3><span>${sample.location}</span><span>${sample.category}</span><span>${sample.seniority}</span></h3>
//                      <button>See Details</button>`