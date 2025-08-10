// This is not strictly necessary for the static site but shows how to add interactivity
const closeButton = document.querySelector('.close-btn');
closeButton.addEventListener('click', () => {
    // You could make the card disappear, for example
    document.querySelector('.card').style.display = 'none';
});
