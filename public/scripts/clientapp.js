$(document).ready(function() {
    $('#post-animal').on('click', postAnimal);
    //getAnimalData();

});

function postAnimal() {
    event.preventDefault();
    var values = {};
    $.each($('#postAnimal').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    console.log(values);
    $.ajax({
        type: 'POST',
        url: '/postAnimal',
        data: values,
        success: function (data) {
            console.log(data);
            if(data) {
                console.log('from server:', data);
                getAnimalData();
            } else {
                console.log('error');
            }
        }
    });
}
function getAnimalData() {
    $.ajax({
        type: 'GET',
        url: '/getAnimal',
        success: function (data) {
            console.log('GET ' + data);
            $('#display-animal').empty();
            for (var i = 0; i < data.length; i++) {
                var toBePostedAnimal = data[i];
                console.log(toBePostedAnimal);
                displayAnimal(toBePostedAnimal);
            }
        }
    });
}

function displayAnimal(addedAnimal) {
    $('.display-animal').append('<p>' + '  ' + addedAnimal.animal_name + '  ' + parseInt(addedAnimal.count) + '</p>');
}