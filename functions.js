var ce = (elemType) => {
    return document.createElement(elemType);
};
var ac = (parent, child) => {
    parent.appendChild(child);
};
var gebid = (id) => {
    return document.getElementById(id);
};
var gebcn = (name) => {
    return document.getElementsByClassName(name);
};
var cla = (elem, className) => {
    elem.classList.add(className);
};
// decifer Difficulty
var dD = (d) => {
    switch (d) {
        case '1':
            return 800;
        case '2':
            return 650;
        case '3':
            return 550;
        case '4':
            return 450;
        case '5':
            return 350;
    }
};
