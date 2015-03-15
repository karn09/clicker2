
// ====================================================
// =============== MODEL ==============================
// ====================================================

var model = {
    currentCat: null,
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
        img: "cat5.jpg",
        count: 0
    }]
};

// ====================================================
// =============== CONTROL ============================
// ====================================================

var control = {
    getCurrentCat: function () {
        return model.currentCat;
    },
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    }
}

// ====================================================
// =============== VIEWS ==============================
// ====================================================

var catListView = {
    init: function() {
        this.catListElem = document.getElementById('catlist');
        
        this.render();
    },
    render: function () {
        var catListLength = model.cats.length;
        for (var i = 0; i < catListLength; i++) {
            var buttonElem = this.catListElem.appendChild(document.createElement('button'));
            buttonElem.innerHTML = model.cats[i].name;
            
            buttonElem.addEventListener('click', (function (cat) {
                return function() {
                    control.setCurrentCat(cat);
                    catView.init();
                }
            })(model.cats[i]))
        }
    }
};
catListView.init();

var catView = {
    init: function () {
        this.catViewElem = document.getElementById('catView');
        
        this.render();
    },
    render: function () {
        var currentCat = control.getCurrentCat();
        var catPic = this.catViewElem.appendChild(document.createElement('img'));
        catPic.src = currentCat.img
    }
}

catView.init();


var cats = document.getElementsByClassName('cat');
var buttons = document.getElementsByTagName('button');

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
/*
for (var i = 1; i <= buttons.length; i++) {
    bindButtonToCat(i)
}
for (var i = 1; i <= cats.length; i++) {
    bindCounterToCat(i)
}
*/