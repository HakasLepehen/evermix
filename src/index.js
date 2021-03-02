import './styles/styles.scss';
import './assets/img/call-img.svg';
import './assets/img/basket-img.svg';
import './assets/img/comparsion.svg';
import './assets/img/logo.svg';
import './assets/img/slide-item.jpg';
import './assets/img/search_icon.svg';
import './assets/img/slide-left-arrow.svg';
import './assets/img/slide-right-arrow.svg';
import './assets/fonts/Montserrat-Regular.ttf';
import './assets/img/diCaprio.gif';
import './assets/img/home_special_solutions.png';
import './assets/img/black_right_arrow.svg';
import './assets/img/calculation.svg';
import './assets/img/question.svg';
import {Loader} from "@googlemaps/js-api-loader";

function Marker(lat, lng) {
    this.lat = lat;
    this.lng = lng;
}

let map;
let markers = [
    new Marker(56.7678557, 60.8027013),
    new Marker(56.8408178, 60.5787715),
    new Marker(56.8403162, 60.6220571),
    new Marker(56.8440169, 60.6415134),
    new Marker(56.8364945, 60.6134046),
    new Marker(56.7960052, 60.6363833),

];
const loader = new Loader({
    apiKey: 'AIzaSyBOXjzORCt4qtazCEkxJqXyajzsMnUcnyU',
    version: 'week',
});
loader.load().then(() => {
    map = new google.maps.Map(document.querySelector('.map-wrapper'), {
        center: { lat: 56.8403092, lng: 60.597135 },
        zoom: 12,
    });

    markers.forEach((el) => {
        new google.maps.Marker({
            position: el,
            map,
            title: ""
        })
    })
})

//Екатеринбург, пер. Речной, 1, литер И  56.7678557,60.8027013
// ул Московская,д.1  56.8408178,60.5787715
// Проспект Ленина, д.52/2  56.8403162,60.6220571
// Проспект Ленина, д.101/2  56.8440169,60.6415134
// ул.Малышева, 53, офис 452  56.8364945,60.6134046
// ул. Белинского, 256, оф.452  56.7960052,60.6363833


console.log('Index.js was loaded');