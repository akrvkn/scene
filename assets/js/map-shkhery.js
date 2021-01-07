var shkhery = [
    [61.698935, 30.69642],
    [61.678964, 30.713447],
    [61.667382, 30.692677],
    [61.640386, 30.696831],
    [61.599649, 30.79099],
    [61.59259, 30.834671],
    [61.611857, 30.867297],
    [61.624059, 30.863296],
    [61.688135, 30.82631],
    [61.703888, 30.829761],
    [61.709127, 30.843476],
    [61.700122, 30.943785],
    [61.671332, 30.984925],
    [61.67052, 31.005696],
    [61.647541, 31.041101],
    [61.636958, 31.066131],
    [61.588177, 31.034925]
];

var shkheryPoints = [
    { name: "Сортавала", latitude: 61.702943, longitude: 30.691633 },
    { name: "о.Хонкасало", latitude: 61.620556, longitude: 30.827315 },
    { name: "о.Карнетсаари", latitude: 61.613165, longitude: 30.875833 },
    { name: "о.Орьятсаари", latitude: 61.6223, longitude: 30.896925 },
    { name: "о.Тулолансаари", latitude: 61.673873, longitude: 30.889811 },
    { name: "о.Карпансаари", latitude: 61.660201, longitude: 30.972662 },
    { name: "о.Мякисало", latitude: 61.680169, longitude: 31.019105 },
    { name: "о.Пеллотсаари", latitude: 61.638904, longitude: 31.030388 },
    { name: "о.Келло", latitude: 61.58815, longitude: 31.033981 }
];

function renderOstrova() {
    var map = L.map("map-shkhery").setView([61.698935, 30.69642], 8);
    L.polyline(shkhery, { color: "#0962a8" }).addTo(map);
    L.tileLayer(
        "https://vec{s}.maps.yandex.net/tiles?l=map&v=20.10.06-1&z={z}&x={x}&y={y}&scale=2&lang=ru_RU",
        {
            subdomains: ["01", "02", "03", "04"],
            attribution: '<a href="https://yandex.ru" target="_blank">Яндекс</a>',
            reuseTiles: true,
            updateWhenIdle: false
        }
    ).addTo(map);
    map.options.crs = L.CRS.EPSG3395;
    L.Icon.Default.imagePath = "assets/lib/images/";

    shkheryPoints.forEach(function(el) {
        L.marker([el.latitude, el.longitude]).addTo(map);
    });
    map.fitBounds(shkhery);
}

renderOstrova();