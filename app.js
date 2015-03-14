var cats = document.getElementsByClassName('cat');
var buttons = document.getElementsByTagName('button');

var model = {
    cats: [{
        name: "Cat One",
        img: "cat1.jpg",
        count: 0
    }, {
        name: "Cat Two",
        img: "cat2.jpg",
        count: 0
    }, {
        name: "Cat Three",
        img: "cat3.jpg",
        count: 0
    }, {
        name: "Cat Four",
        img: "cat4.jpg",
        count: 0
    }, {
        name: "Cat Five",
        img: "cat5sjpg",
        count: 0
    }]
};

var hideAllCats = function() {
    for (var i = 0; i < cats.length; i++) {
        cats[i].style.display = 'none';
    }
}
var bindButtonToCat = function(idNumber) {
    var button = document.getElementById('button' + idNumber);
    var cat = document.getElementById('cat' + idNumber);
    button.addEventListener('click', function() {
        hideAllCats();
        cat.style.display = 'block';
    })
}
var bindCounterToCat = function(idNumber) {
    var cat = document.getElementById('cat' + idNumber);
    cat.addEventListener('click', function() {
        var count = cat.childNodes[1].innerHTML;
        count = parseInt(count) + 1;
        cat.childNodes[1].innerHTML = count;
    })

}
for (var i = 1; i <= buttons.length; i++) {
    bindButtonToCat(i)
}
for (var i = 1; i <= cats.length; i++) {
    bindCounterToCat(i)
}

hideAllCats()