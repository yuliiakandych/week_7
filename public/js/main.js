//import { rejects } from "assert";

// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

    let userButtons = document.querySelectorAll('.u-link'),
       lightbox = document.querySelector('.lightbox');

       function renderSocialMedia(socialMedia){
           return`<ul class="u-social">
                ${socialMedia.map(item => `<li>${item}</li>`).join('')}
           </ul>`
       }

       function parseUserData(person) {     //person is the databasa result
            let targetDiv = document.querySelector('.lb-content'),
                targetImg = lightbox.querySelector('img');

            let bioContent =`
            <p>${person.bio}</p>
            <h4>Social Media:</h4>
            ${renderSocialMedia(person.social)}
            `;

            console.log(bioContent);

            targetDiv.innerHTML = bioContent;
            targetImg.src = person.imgsrc;
            lightbox.classList.add('show-lb');

       }

     function getUserData(event) {
         event.preventDefault();// kill the default a tag behaviour (don't navigate anywere)
         //debugger;

         let imgSrc = this.previousElementSibling.getAttribute('src');

         let url = `/${this.getAttribute('href')}`; 

         fetch(url) //go get the data
         .then(res => res.json())
         .then(data => {
             console.log("me database result is: ", data)

             data.imgsrc = imgSrc;
             

             parseUserData(data);
         })
         .catch((err) => {
             console.log(err)
         });
     }

     userButtons.forEach(button => button.addEventListener('click', getUserData))

     lightbox.querySelector('.close').addEventListener('click', function() {
         lightbox.classList.remove('show-lb');
     });

})();