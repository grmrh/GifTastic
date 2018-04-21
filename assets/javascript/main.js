// create string array for topics

var topics = [
    {
        category: 'Cartoons_Comics',
        topic: ['The_Simpsons', 'Spongebob_Squarepants', '101_dalmatians', 'aladdin',
            'bambi', 'mulan', 'the_lion_king']
    },
    {
        category: 'Art_Design',
        topic: ['architecture', 'geometry', 'timelapse', 'sculpture', 'typography']
    },
    {
        category: 'Food_Drink',
        topic: ['coffee', 'doughnut', 'pancakes', 'sushi']
    },
    {
        category: 'Nature',
        topic: ['clouds', 'sunrise', 'northern_lights', 'lava', 'ocean', 'moon']
    },
    {
        category: 'Science',
        topic: ['space', 'nasa', 'robot', 'mathematics', 'computers', 'technology']
    },
    {
        category: 'Movies',
        topic: ['Harry_Potter', 'Star_wars', 'The_dark_knight', 'Indiana_Jones']
    },
    {
        category: 'News_Politics',
        topic: ['Joe_Biden', 'north_korea', 'Barack_Obama', 'Bernie_Sanders']
    }
];

var additionalTopics = [
    {
        category: 'Cartoons_Comics',
        topic: ['Sleeping_beauty', 'Beauty_and_beast', ' fantasia', 'pinoccchio']
    },
    {
        category: 'Art_Design',
        topic: ['photography', 'art', 'loop']
    },
    {
        category: 'Food_Drink',
        topic: ['Ice_cream', 'Pizza', 'bacon']
    },
    {
        category: 'Nature',
        topic: ['night', 'snow', 'waterfall']
    },
    {
        category: 'Science',
        topic: ['meteor', 'biology', 'chemistry']
    },
    {
        category: 'Movies',
        topic: ['night_of_the_living_dead', 'casablanca','the_godfather', 'the_matrix']
    },
    {
        category: 'News_Politics',
        topic: ['the_colbert_report', 'hillary_clinton', 'nancy_pelosi', 'protest']
    }
];


const $gifPlaceholder = $('.gif-placeholder');
var numberOfImagesDisplay = 10;
// create topic button
function createTopicButton(topic) {
    var btn = `<button type="button" class="btn btn-primary mr-2 mb-2" data-topic=${topic}>${topic}</button>`;

    //console.log(btn);
    return btn;
}
// create topic button
function createTopicButton2(topic) {
    var btn = $('<button/>', {
        text: topic,
        addClass: "btn btn-primary mr-2 mb-2",
        attr: ("data-topic", topic),
        click: displayImage
    });
    //console.log(btn);
    return btn;
}//

function createCategoryCard(obj) {
    var cat = ` <div class="col-md-4">
                <div class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">${obj.category}</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col" data-cat='${obj.category}'></div>
                    </div>
                </div>
                </div>
            </div>`;
    return cat;
}

function createGifImageCard(gif) {
    //console.log(gif.images.fixed_height_still.url);
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

$gifPlaceholder.on('click', '.gif', function () {
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

function displayImage(event) {

    clearImages();
    //console.log(event.target);
    //console.log($(this));
    var gifName = $(this).attr("data-topic");
    //var gifName = 'flcl';
    if (typeof gifName === "undefined") return;
    //console.log(gifName);

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${gifName}?&limit=${numberOfImagesDisplay}&api_key=GZ7LJoqKI2Yk6p16jkA84qedLZHXvq9i`;
    //console.log(queryURL);

    var option = {
        url: queryURL,
        method: 'GET'
    };

    $.ajax(option)
        .done(function (response, status, xhr) {
            //console.log(response);
            //add gif imgages to place holde
            response.data.forEach(gif => createGifImageCard(gif));
        })
        .fail(function (response, status, xhr) {

        })
}

function addGifButton() {
    // get a button topic value from a selected dropdown
    var category = $("#gifCategorySelect").attr("selected", "selected").val().trim();
    var topic = $("#gifTopicSelect").attr("selected", "selected").val().trim();
    ///console.log(category);
    console.log(topic);
    $(document).find(`[data-cat='${category}']`).append(createTopicButton(topic));
}

function createCategoryDropdown($dropdownList, data) {
    for (var index in data) {
        console.log(data[index].category);
        $dropdownList.append($("<option/>")
                    .attr('value', data[index].category)
                    .text(data[index].category));
    }
}

function createTopicDropdown($dropdownList, category, data) {
    var topicData = $.grep(data, function(dataItem, i) {
        return dataItem.category == category;
    })
    // need validation - one data item in topicData
    var topics = topicData[0].topic;
    console.log(topics);
    for (var index in topics) {
        $dropdownList.append($("<option/>")
                    .attr('value', topics[index])
                    .text(topics[index]));
    }
}

function renderCatagories() {

    topics.forEach(obj => {
        $('.lead.topic-view').append(createCategoryCard(obj));

        obj.topic.forEach(topicName =>
            $(document).find(`[data-cat='${obj.category}']`).append(createTopicButton(topicName)));
        //renderButtons(obj);
    });
}//

function renderButtons(obj) {
    // create buttons and append in html
    // topics.forEach(topic=>$('.lead.topic-view')
    //                         .append(createTopicButton(topic)));
    var $selector = $(document).find(`[data-cat='${obj.category}']`);
    console.log(selector);
    console.log(obj.category);
    console.log(obj.topic);

    obj.topic.forEach(topicName => $selector
        .append(createTopicButton(topicName)));
}

$(document).on('change', "#gifCategorySelect", function() {
    $('#gifTopicSelect').empty();
    $("option[value=" + this.value + "]", this)
        .attr("selected", true)
        .siblings()
        .removeAttr('selected');

    createTopicDropdown($('#gifTopicSelect'), 
                    this.value,
                    additionalTopics);
})

$(document).on('change', "#gifTopicSelect", function() {
    $("option[value=" + this.value + "]", this)
        .attr("selected", true)
        .siblings()
        .removeAttr('selected');
})

// gif images shown in the designated place by clicking on one of the buttons
$('.lead.topic-view').on("click", "button", displayImage);

// download additional gif
$('#addGifBtn').on('click', addGifButton);


//$('button').on("click", displayImage); -- not working
createCategoryDropdown($('#gifCategorySelect'), additionalTopics);
console.log($("#gifCategorySelect").attr("selected", "selected").val().trim());
renderCatagories();
