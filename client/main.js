const complimentBtn = document.getElementById("complimentButton")
const spiritBtn = document.querySelector('#spiritButton')
const picsContainer = document.querySelector('#pics-container')
const form = document.querySelector('form')

const baseURL = "http://localhost:4000/api"

const picturesCallback = ({ data: narPics }) => displayPictures(narPics)
const errCallback = err => console.log(err.response.data)

const getAllPictures = () => {
    axios.get('http://localhost:4000/api/pictures')
    .then(picturesCallback)
    .catch(errCallback)
}
const createPicture = body => axios.post(`${baseURL}/pictures`, body).then(picturesCallback).catch(errCallback)
const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
        .catch(errCallback)
};
const getSpirit = () => {
    axios.get("http://localhost:4000/api/spirit/")
        .then(res => {
            const data = res.data;
            alert(data);
        })
        .catch(errCallback)
};
const updatePicture = (id, type) => axios.put(`${baseURL}/pictures/${id}`, {type}).then(picturesCallback).catch(errCallback)

const deletePicture = id => {
    axios.delete(`http://localhost:4000/api/pictures/${id}`)
        .then(picturesCallback)
        .catch(errCallback)
};

function submitHandler(e) {
    e.preventDefault()
    console.log('good')

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createPicture(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createPictureCard(picture) {
    const pictureCard = document.createElement('div')
    pictureCard.classList.add('picture-card')

    pictureCard.innerHTML = `<img alt='picture' src=${picture.imageURL} class="picture"/>
    <p class="picture">${picture.title}</p>
    <div class="btns-container">
        <button onclick="updatePicture(${picture.id}, 'minus')">-</button>
        <p class="picture-rating">${picture.rating} stars</p>
        <button onclick="updatePicture(${picture.id}, 'plus')">+</button>
    </div>
    <button onclick="deletePicture(${picture.id})">delete</button>
    `


    picsContainer.appendChild(pictureCard)
}

function displayPictures(arr) {
    picsContainer.innerHTML = ``
    for(let i = 0; i < arr.length; i++){
        createPictureCard(arr[i])
    }
} 


complimentBtn.addEventListener('click', getCompliment)
spiritBtn.addEventListener('click', getSpirit)
form.addEventListener('submit', submitHandler)

getAllPictures()