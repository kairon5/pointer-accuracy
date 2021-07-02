let sizes;
let go = gebid('go');
var selectedSize = 'medium';
var selectedColor = 'lime';
var selectedTime = 40;
var settingsDiv = gebid('settings');
let difficulty = 3;

function blackBorder(e, eg) {
    if (e.id != 'medium' && e.id != 'lime') {
        e.clicked = 'false';
    } /*define the clicked value if it isn't already defined
        if it's defined then its the default value, and we don't want to set it to false or else 
        the mouseout event listener will erase it when its selected.*/
    e.addEventListener('mouseover', () => {
        e.style.border = '3px solid white';
    });
    e.addEventListener('mouseout', () => {
        if (e.clicked == 'false') e.style.border = 'none'; //dont erase the black border if it is selected
    });
    e.addEventListener('click', () => {
        if (e.classList.contains('size')) selectedSize = e.id;
        //update the selected size
        else selectedColor = e.style.backgroundColor; //update the selected color
        e.clicked = 'true';
        e.style.border = '3px solid white';
        for (var i = 0; i < eg.length; i++) {
            if (e != eg[i]) {
                //e is the specific element and eg is the group
                eg[i].style.border = 'none'; //make all other circles not have a black border
                eg[i].clicked = 'false';
            }
            for (var j = 0; j < sizes.length; j++) {
                sizes[j].style.backgroundColor = e.style.backgroundColor; //this line is why "sizes" is global
            }
        }
    });
}

let colors = gebcn('color');
sizes = gebcn('size');
for (var i = 0; i < colors.length; i++) {
    let color = colors[i];
    blackBorder(color, colors);
} //loop over colors and sizes and then apply a responsive black border to them.
for (var i = 0; i < sizes.length; i++) {
    let size = sizes[i];
    blackBorder(size, sizes);
}
const timeSlider = gebid('time-slider');
timeSlider.addEventListener('change', () => {
    selectedTime = timeSlider.value;
}); //update the time value
