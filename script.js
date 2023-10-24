
const accessKey = "7SJEl6KQSYtTM4uhCqODBsM1Q6whgQTj2Dj1T-7NzHQ";
//create 4 major elemets - form,input search field, search results, show more button
const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// define inputdata and page variable
let inputData = "";
let page = 1;

//create function for data fetch, store and run again on event call show more
async function searchImages(){
    //capture dynamic input data of search bar here
    inputData = inputEle.value;

    //call api url with dynamic page count, input string and access key
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    //fetch response from url, store response.json in data, and then store data.results in results
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    //not calling anything if page number is equal to 1
    if(page === 1){
        searchResults.innerHTML= "";
    }

    //map the result in respective divs and images and anchor tags
    results.map((result) =>{
        //creating main div is capturing as imagewrapper and save 
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        //create img tag with source url with thumbnail and alt description
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        //append the image tag to main imagewrapper
        imageWrapper.appendChild(image);

        //define anchor tag and link to image file and set target as blank browser
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        //add image anchor tag with the image tag and image wrapper div tag
        imageWrapper.appendChild(imageLink);
        // placing all elements of image wrapper element inside search Results div which is the main div of image list view
        searchResults.appendChild(imageWrapper);


    } );
    //increase the page count
    page++
    if(page > 1){
        //as soon as page count becomes 2 we can show show more
        showMore.style.display = "block"
    }
}

//the add event listener function while clicking submit button
formEle.addEventListener("submit",(event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})

//show more event listener function while clicking the show more button
showMore.addEventListener("click",()=>{
    searchImages();
})