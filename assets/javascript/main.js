// create string array for topics

var topics = [
    'biology',
    'doughnut', 
    'flcl',
    'computer',
    'naruto',
    'nissan',
    'mathematics',
    'pokemon',
    'nasa',
    'space',
    'robot',
    'magnet',
    'tired'
];
const $gifPlaceholder = $('.gif-placeholder');
var numberOfImagesDisplay = 10;

// create topic button
function createTopicButton(topic) {
    var btn = `<button type="button" class="btn btn-primary mr-2 mb-2" data-topic=${topic}>${topic}</button>`;
    return btn;
}
// create topic button
function createTopicButton2(topic) {
    var btn = $('<button/>', {
        text: topic,
        addClass: "btn btn-primary mr-2 mb-2",
        attr: ("data-topic", topic),
        click: displayImage});
    //console.log(btn);
    return btn;
}


function createGifImageCard(gif) {
    console.log(gif.images.fixed_height_still.url);
    var image = gif.images;
    var btn = 
    `<div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img src=${image.fixed_height_still.url} data-still=${image.fixed_height_still.url} data-animate=${image.fixed_height.url} data-state='still' class='gif'>
            <div class="card-body">
                <p class="card-text">Rating: ${gif.rating}</p>
            </div>
        </div>
    </div>`;
    $gifPlaceholder.append(btn);
}

$gifPlaceholder.on('click', '.gif', function() {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});

function clearImages() {
    $gifPlaceholder.empty();
}

function displayImage(event){
    clearImages();
    //console.log(event.target);

    console.log($(this));
    var gifName = $(this).attr("data-topic");
    if (typeof gifName === "undefined") return;
    console.log(gifName);

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifName}?&limit=${numberOfImagesDisplay}&api_key=GZ7LJoqKI2Yk6p16jkA84qedLZHXvq9i`;
    console.log(queryURL);

    var option = {
        url: queryURL,
        method: 'GET'
    };

    $.ajax(option)
     .done(function(response, status, xhr){
         console.log(response);
        //add gif imgages to place holde
        response.data.forEach(gif=>createGifImageCard(gif));
     })
     .fail(function(response, status, xhr) {

     })
}

function addGifButton() {
    // get a button topic value from a selected dropdown
    var topic =  $("#gifTopicSelect").attr("selected", "selected").val().trim();
   $('.lead.topic-view').append(createTopicButton(topic));
}

function renderButtons() {
    // create buttons and append in html
    topics.forEach(topic=>$('.lead.topic-view')
                            .append(createTopicButton(topic)));
}

$('.lead.topic-view').on("click", "button", displayImage);

$('#addGifBtn').on('click', addGifButton);


/**
 * below code does not work
 */
//$('button').on("click", displayImage);

renderButtons();
//displayImage(numberOfImagesDisplay);