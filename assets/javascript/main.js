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
var numberOfImagesDisplay = 3;
// create topic button
function createTopicButton(topic) {
    var btn = `<button type="button" class="btn btn-primary mr-2 mb-2 data-topic=${topic}">${topic}</button>`;

    //console.log(btn);
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
}//

function createGifImageCard(gif) {
    console.log(gif.images.fixed_height_still.url);
    var btn = 
    `<div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img src=${gif.images.fixed_height_still.url}>
            <div class="card-body">
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
                    This content is a little bit longer.</p>
            </div>
        </div>
    </div>`;
    $gifPlaceholder.append(btn);
    //console.log(btn);
    //return btn;
}

function clearImages() {
    $gifPlaceholder.empty();
}

function displayImage(){

    clearImages();
    var gifName = $(this).attr("data-topic");
    //var gifName = 'flcl';
    if (typeof gifName=="undefined") return;
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

function renderButtons() {
    // create buttons and append in html
    topics.forEach(topic=>$('.lead.topic-view')
                            .append(createTopicButton(topic)));
}

$("button").on("click", displayImage);

renderButtons();
//displayImage(numberOfImagesDisplay);