// ====================================================
// =============== MODEL ==============================
// ====================================================

var model = {
    adminPanel: {
        mode: true,
        on: false
    },
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
    getCurrentCat: function() {
        return model.currentCat;
    },
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    increment: function() {
        model.currentCat.count++;
        catView.render()
    },
    currentCount: function() {
        return model.currentCat.count;
    },
    init: function() {
        model.currentCat = model.cats[0]
        catListView.init();
        catView.init();
        if (model.adminPanel.mode) {
            var button = document.getElementById('adminBtn')
            button.addEventListener('click', function() {
                control.setAdminPanel(true)
                adminView.init();
            })
        }
    },
    getCatList: function() {
        return model.cats;
    },
    renderAdmin: function() {
        if (model.adminPanel.on) {
            adminView.render();
        }
    },
    setAdminPanel: function(bool) {
        model.adminPanel.on = bool;
    },
    saveForm: function() {

    },
    getAdminValues: function() {
        var adminForm = document.forms[0];
        this.catName = adminForm.elements["catName"].value;
        this.catURL = adminForm.elements["catURL"].value;
        this.catClick = adminForm.elements["catClick"].value;
        return [this.catName, this.catURL, this.catClick] || null;
    },
    saveAdminValues: function() {
        var currentValues = control.getAdminValues();
        model.currentCat.name = currentValues[0];
        model.currentCat.img = currentValues[1];
        model.currentCat.count = currentValues[2];
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
    render: function() {
        var cats = control.getCatList();
        for (var i = 0; i < cats.length; i++) {
            var buttonElem = this.catListElem.appendChild(document.createElement('button'));
            var cat = cats[i];
            buttonElem.innerHTML = cat.name;
            buttonElem.className += "btn btn-primary"
            buttonElem.addEventListener('click', (function(cat) {
                return function() {
                    control.setCurrentCat(cat);
                    catView.render();
                }
            })(cat))
        }
    }
};

var catView = {
    init: function() {
        this.catViewElem = document.getElementById('catView');
        this.catImgElem = document.getElementById('catImg');
        this.catCounter = document.getElementById('counter');
        this.catNameElem = document.getElementById('catName')
        this.catImgElem.addEventListener('click', function() {
            control.increment()
        })

        this.render();
    },
    render: function() {
        var currentCat = control.getCurrentCat();

        this.catImgElem.src = currentCat.img;
        this.catNameElem.textContent = currentCat.name;
        this.catCounter.textContent = currentCat.count;
        control.renderAdmin();
    }
}

var adminView = {
    init: function() {
        var adminPanel = document.getElementById('adminPanel')
        adminPanel.style.display = 'block';
        this.adminForm = document.forms[0];
        this.catName = this.adminForm.elements["catName"];
        this.catURL = this.adminForm.elements["catURL"];
        this.catClick = this.adminForm.elements["catClick"];
        var cancel = document.getElementById('cancel');
        var save = document.getElementById('save')

        cancel.addEventListener('click', (function(panel) {
            return function() {
                console.log('cancel clicked')
                control.setAdminPanel(false);
                panel.style.display = 'none';
            }
        })(adminPanel))

        save.addEventListener('click', (function(panel) {
            return function() {
                control.saveAdminValues();
                catView.render();
                control.setAdminPanel(false);
                panel.style.display = 'none';

            }
        })(adminPanel))
        this.render();
    },
    render: function() {
        var currentCat = control.getCurrentCat();


        this.catName.value = currentCat.name;
        this.catURL.value = currentCat.img;
        this.catClick.value = currentCat.count;

    }
}

control.init();


// var cats = document.getElementsByClassName('cat');
// var buttons = document.getElementsByTagName('button');

// var hideAllCats = function() {
//     for (var i = 0; i < cats.length; i++) {
//         cats[i].style.display = 'none';
//     }
// }
// var bindButtonToCat = function(idNumber) {
//     var button = document.getElementById('button' + idNumber);
//     var cat = document.getElementById('cat' + idNumber);
//     button.addEventListener('click', function() {
//         hideAllCats();
//         cat.style.display = 'block';
//     })
// }
// var bindCounterToCat = function(idNumber) {
//     var cat = document.getElementById('cat' + idNumber);
//     cat.addEventListener('click', function() {
//         var count = cat.childNodes[1].innerHTML;
//         count = parseInt(count) + 1;
//         cat.childNodes[1].innerHTML = count;
//     })

// }

/*
for (var i = 1; i <= buttons.length; i++) {
    bindButtonToCat(i)
}
for (var i = 1; i <= cats.length; i++) {
    bindCounterToCat(i)
}
*/