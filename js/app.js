window.initMap = function () {
    var southWest = L.latLng(-30,80),
        northEast = L.latLng(30,160),
        bounds = L.latLngBounds(southWest, northEast);
    map = L.map('map',{zoomControl: false,attributionControl: false,maxBounds: bounds,minZoom: 4}).setView([-7.093930, 107.110965], 9);
    // var CartoDB_DarkMatterNoLabels  = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
 //        maxZoom: 20
 //    }).addTo(map);
    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=581a69ec-f6c0-4c6b-8403-d8a8d2082a28', {
        maxZoom: 12
    }).addTo(map);  
    // var mapLight = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    // }).addTo(map);   
    // let layerStatic = L.esri.dynamicMapLayer({
    //     url: "https://inarisk.bnpb.go.id:6443/arcgis/rest/services/basemap/batas_administrasi/MapServer",
    //     opacity: 0.75
    // }).addTo(map);
    province = L.geoJson(null, {style: style});
    omnivore.topojson('https://raw.githubusercontent.com/irvanfaisal/cianjur-map/main/cianjur.json', null, province).on('ready', function() {
            
    }).setZIndex(-999).bringToBack().addTo(map);
    
    function style(feature) {
        return {
            weight: 0.25,
            // opacity: 0.75,
            fillColor: '#545454',
            color: '#fff',
            fillOpacity: 0.2,
            opacity: 0.9
        };
    }


};

window.addMapLayer = function (container,position) {
    let layer = L.control({position:position});
    layer.onAdd = function(map){
        this._div = L.DomUtil.get(container)
        return this._div
    }
    layer.addTo(map);
    document.getElementById(container).addEventListener('mouseover', function () {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        if (map.tap) map.tap.disable();
        document.getElementById('map').style.cursor='default';
        action = true;
    });
    document.getElementById(container).addEventListener('mouseout', function () {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (map.tap) map.tap.enable();
        document.getElementById('map').style.cursor='grab';
        action = false;
    });
    if (container == 'map-zoom') {
        document.getElementById("in").addEventListener("click", function() {
            if (map.getZoom() < 16) {
                map.setZoom(map.getZoom() + 1)
            }
        });
        document.getElementById("out").addEventListener("click", function() {
            if (map.getZoom() > 7) {
                map.setZoom(map.getZoom() - 1)
            }
        });
    }

};