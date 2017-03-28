/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Author: Tu Hoang
ESRGC2017

View Map
base map view using backbone.js
element: '.map'
render basic map for dashboards

Requires leaflet.js

Events 
onMapLoaded --fired when map is done initialized
onLayerChanged -- fired when new data is loaded to geojson
onGeomSelected -- fired when mouse clicked layer (geometry)
onFeatureMouseover -- fired when mouse is over a layer (geometry)
onFeatureMouseout -- fired when mouse is out of a layer (geometry)

setMapClickMode -- set selection mode (single or multi)
*/
var LeafletViewer = __webpack_require__(2);

var map = function () {
  function map(options) {
    _classCallCheck(this, map);

    this.name = 'mapWrapper';
    this.mapData = [
      //defined in sub-classes
      // For example
      // {
      //   name: 'Region',
      //   type: 'layer',
      //   label: '',
      //   url: 'data/mdRegion.geojson',
      //   nameField: 'Regions',
      //   style: {
      //     fill: true,
      //     weight: 1,
      //     fillOpacity: 0.1,
      //     fillColor: '#2163B5',
      //     color: '#000'
      //   },
      //   selected: true
      // }
    ]; //specified geojson layers (in sub views)
    this.mapDataLoaded = false;
    this.selectedLayer = 'County'; //geometry type "County" or "Region"
    this.selectedFeature = null;
    this.selectedFeatureName = '';
    this.selectedLayers = [];
    this.singleSelect = false;
    this.mapParams = {};
    this.showMarkers = true;
    this.clusterMarkerCache = [];

    this.render();
  }

  _createClass(map, [{
    key: 'render',
    value: function render(options) {
      this.makeMap(); //set up map
      this.loadMapData(options); //load geometry       
      // this.renderControls(); //render layer controls
      console.log(this.name + ' has been initialized!');
    }
  }, {
    key: 'makeMap',
    value: function makeMap() {
      this.mapViewer = new LeafletViewer({
        el: this.el,
        center: new L.LatLng(38.3607, -75.5994), //salisbury coordinates
        zoomLevel: 10,
        scrollZoom: true,
        clusterOptions: {
          showCoverageOnHover: false,
          spiderfyOnMaxZoom: true,
          maxClusterRadius: 40,
          iconCreateFunction: function iconCreateFunction(cluster) {
            var childCount = cluster.getChildCount();
            var c = ' marker-cluster-';
            if (childCount <= 5) {
              c += 'small';
            } else if (childCount <= 10) {
              c += 'medium';
            } else {
              c += 'large';
            }

            return new L.DivIcon({
              html: '<div><span>' + childCount + '</span></div>',
              className: 'marker-cluster' + c,
              iconSize: new L.Point(40, 40)
            });
          }
        }
      });
    }
  }, {
    key: 'loadMapData',
    value: function loadMapData(options) {
      var scope = this;
      //use backbone model to load layer data
      var model = new Backbone.Model();
      var mapData = this.mapData;
      var counter = 0;
      var loadData = function loadData(layer) {
        if (typeof layer == 'undefined') {
          if (typeof scope.onMapLoaded == 'function') {
            scope.onMapLoaded();
          }
          return;
        }
        if (layer.type == 'layer') {
          model.url = layer.url;
          model.fetch({
            success: function success(data) {
              console.log('loaded map data for ' + layer.name);
              var newData = data.toJSON();
              layer.data = newData;
              //move to the next one
              counter++;
              if (counter < mapData.length) {
                //load more if exists
                loadData(mapData[counter]);
              } else {

                scope.mapDataLoaded = true;
                //show the state layer by default
                scope.showLayer(scope.selectedLayer, options);
                // scope.updateCharts(); //initially load charts data

                if (typeof scope.onMapLoaded == 'function') {
                  scope.onMapLoaded();
                }
              }
            }
          });
        } else {
          //if data is not a layer skip to the next one
          counter++;
          if (counter < mapData.length) {
            //load more if exists
            this.loadData(mapData[counter]);
          } else {

            scope.mapDataLoaded = true;
            //show the state layer by default
            scope.showLayer(scope.selectedLayer, options);
            // scope.updateCharts(); //initially load charts data

            if (typeof scope.onMapLoaded == 'function') {
              scope.onMapLoaded();
            }
          }
        }
      };
      loadData(mapData[counter]);
    }
    //clear geometry and add the layer that is being requested to show

  }, {
    key: 'showLayer',
    value: function showLayer(name, options) {
      console.log("showing  layer " + name);
      var scope = this;
      var setInitialAreaType = false;
      var layer = this.getLayer(name);
      if (typeof layer == 'undefined') return;
      scope.selectedLayer = name;
      scope.selectedFeatureName = '';
      scope.selectedFeature = null;
      scope.selectedLayers = [];
      var title = scope.getGeomName();
      scope.updateHoverText();
      var mapViewer = this.mapViewer;
      var newData = layer.data;
      var nameField = layer.nameField; //name of the property that contains geom name

      //determine layer styles (either a function returning style or a style object)
      var layerStyle = layer.style;
      var mouseoverStyle = {
        fillOpacity: 0.2
      };
      var selectedStyle = layer.selectedStyle || {
        //fillOpacity: 0.5
        //dashArray: '',
        opacity: 1,
        color: '#FCFF00',
        //color: '#E2E600',
        weight: 4
      };
      console.log(options); //custom styles passed in options --this will bypass default style and styled specified in layer data
      if (typeof options != 'undefined') {
        if (options.style) layerStyle = options.style; //using function or style object
        if (options.mouseoverStyle) mouseoverStyle = options.mouseoverStyle;
        if (options.selectedStyle) selectedStyle = options.selectedStyle;
      }

      mapViewer.clearGeoJsonFeatures(); //clear old features
      mapViewer.addGeoJsonLayer(newData, {
        style: layerStyle,
        //this call back handles mouse events on feature selection
        onEachFeature: function onEachFeature(feature, layer) {

          //set initial areatype once layer is loaded
          if (!setInitialAreaType) {
            setInitialAreaType = true;
            scope.mapParams.areatype = feature.properties.areatype;
          }
          //console.log(feature);
          layer.on('click', function (e) {
            //console.log(e.target);
            //clear style (selected)       
            var layerGroup = mapViewer.getGeoJsonGroup();
            //console.log(e.target);
            //reset style for the whole layer group
            _.each(layerGroup.getLayers(), function (layers) {
              _.each(layers.getLayers(), function (l) {
                layers.resetStyle(l);
              });
            });
            //process selected feature
            var l = e.target; //get selected feature
            var index = null;
            //check whether the layer is currently selected
            for (var i = 0; i < scope.selectedLayers.length; i++) {
              var layer = scope.selectedLayers[i];
              if (l.feature.properties.areacode == layer.feature.properties.areacode) {
                index = i;
              }
            }
            //simulate toggle selection
            if (index != null) {
              scope.selectedLayers.splice(index, 1); //remove current layer from selected
            } else {
              if (scope.singleSelect == true) scope.selectedLayers = []; //reset selected layers when single select mode is on
              // scope.selectedFeature = l;
              scope.selectedLayers.push(l); //add selected layer to the collection
            }

            //set the last selected layer
            if (scope.selectedLayers.length > 0) {
              var sl = scope.selectedLayers[scope.selectedLayers.length - 1];
              scope.selectedFeature = sl;
              scope.selectedFeatureName = sl.feature.properties.name || sl.feature.properties.region || sl.feature.properties[nameField] || ''; //store selected feature name                                     
            } else scope.selectedFeature = null;

            //map updates
            var areatype = null,
                areacodes = [],
                params;

            //re-hilight the selected features
            _.each(scope.selectedLayers, function (sl) {
              sl.setStyle(selectedStyle);
              var props = sl.feature.properties;
              //access properties to get area type and code            
              if (typeof props.areatype != 'undefined' && typeof props.areacode != 'undefined') {
                //get areatype
                if (areatype == null) areatype = props.areatype; //only set once

                //get area code
                areacodes.push(props.areacode);
              }
            });
            if (areacodes.length > 0) params = {
              areatype: areatype,
              areacode: areacodes.join(',')
            };else params = {
              areatype: areatype,
              areacode: '0'
            };
            //update charts
            // scope.updateCharts(params);
            scope.mapParams = params;

            //finally run geom selected call back 
            if (typeof scope.onGeomSelected == 'function') {
              scope.onGeomSelected.call(scope, feature, scope.selectedLayers); //pass selected feature as an argument
            }
          });
          layer.on('mouseover', function (e) {
            //set selected style
            var layer = e.target;
            layer.setStyle(mouseoverStyle);

            if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
            }

            //show text on the hover box
            var prop = e.target.feature.properties;
            var area = prop.name || prop.region || prop[nameField] || '';
            //settext
            scope.$('#hoverOverlay').text(area);

            if (typeof scope.onFeatureMouseover == 'function') scope.onFeatureMouseover(layer);
          });
          layer.on('mouseout', function (e) {
            var layerGroup = mapViewer.getGeoJsonGroup();
            //console.log(e.target);
            //reset style for current target
            _.each(layerGroup.getLayers(), function (l) {
              l.resetStyle(e.target);
            });

            //re-hilight the selected features
            _.each(scope.selectedLayers, function (l) {
              l.setStyle(selectedStyle);
            });
            //show text on the hover box
            scope.updateHoverText();
            if (typeof scope.onFeatureMouseout == 'function') scope.onFeatureMouseout(layer);
          });
        }
      });
    }
  }, {
    key: 'getLayer',
    value: function getLayer(name) {
      for (var i in this.mapData) {
        var layer = this.mapData[i];

        if (layer.name == name) return layer;
      }
    }
  }, {
    key: 'renderControls',
    value: function renderControls() {
      var scope = this;
      var data = this.mapData;
      // console.log(data);
      var template = Handlebars.compile($(this.mapControlsTemplate).html());
      var html = template({
        models: data
      });
      this.$('div.leaflet-bottom.leaflet-left').html(html);
      //wire layer controls events
      this.$('.overlays div.layers').on('click', function (e) {
        scope.mapControlClick.call(scope, e); //call callback in this view context
      });
      //hover box
      this.$('div.leaflet-top.leaflet-right').append('<div id="hoverOverlay" class="layerToggle" style="display: block;"></div>');
      //zoom to extent - insert the zoom to extent button to the 2 zoom in/out buttons
      this.$('div.leaflet-top.leaflet-left .leaflet-control-zoom-in').after([' <a class="leaflet-control-zoom-out" id="zoomToExtent"', ' href="#" title="Zoom to Full-extent">', '<i class="fa fa-globe"></i>', '</a>'].join(''));
      //zoom to extent button
      this.$('#zoomToExtent').on('click', function (e) {
        scope.mapViewer.zoomToGeoJsonFeatures(); //zoom to extent of current geojson layer
        return false;
      });
    }
  }, {
    key: 'mapControlClick',
    value: function mapControlClick(e) {
      var c = e.currentTarget;
      var name = $(c).attr('data-name');
      console.log('map layer ' + name + ' control clicked');
      //show layer on the map
      this.showLayer(name);
      //add/remove check sign
      this.$(c).parent().find('i[role="checkbox"]').remove();
      $(c).find('p').append('<i class="fa fa-check" role="checkbox"></i>');
      // this.updateCharts(); //load defaults.
      if (typeof this.onLayerChanged == 'function') this.onLayerChanged.call(this, name);
    }
  }, {
    key: 'getGeomName',
    value: function getGeomName() {
      var title = '';
      if (this.selectedLayers.length > 1) {
        title = 'Multi Areas';
      } else if (this.selectedFeature == null) title = 'Statewide';else title = this.selectedLayer + ' ' + this.selectedFeatureName;
      return title;

      // switch (this.selectedLayer) {
      //   case 'State':
      //     title = 'Statewide'
      //     break;
      //   case 'County':
      //     if (this.selectedLayers.length > 1) {
      //       title = 'Multi counties';
      //       break;
      //     }
      //     if (this.selectedFeature == null)
      //       title = 'All counties';
      //     else
      //       title = 'County: ' + this.selectedFeatureName;
      //     break;
      //   case 'Region':
      //   case 'WIA':
      //     if (this.selectedLayers.length > 1) {
      //       title = 'Multi areas';
      //       break;
      //     }
      //     if (this.selectedFeature == null)
      //       title = 'All areas';
      //     else
      //       title = 'Area: ' + this.selectedFeatureName;
      //     break;
      //   case 'Zip':
      //     if (this.selectedFeature == null)
      //       title = 'All zips';
      //     else
      //       title = 'Zip: ' + this.selectedFeatureName;
      //     break;
      // }
      return title;
    }
  }, {
    key: 'updateHoverText',
    value: function updateHoverText() {
      var title = this.getGeomName();
      //show text on the hover box
      this.$('#hoverOverlay').text(title);
    }
  }, {
    key: 'getCurrentParams',
    value: function getCurrentParams() {
      var scope = this,
          areatype = null,
          areacodes = [];

      _.each(scope.selectedLayers, function (sl) {
        var props = sl.feature.properties;
        //access properties to get area type and code            
        if (typeof props.areatype != 'undefined' && typeof props.areacode != 'undefined') {
          //get areatype
          if (areatype == null) areatype = props.areatype; //only set once

          //get area code
          areacodes.push(props.areacode);
        }
      });
      if (areacodes.length > 0) return {
        areatype: areatype,
        areacode: areacodes.join(',')
      };else return {
        areatype: areatype,
        areacode: '0'
      };
    }
    //select geometry by name

  }, {
    key: 'selectGeom',
    value: function selectGeom(featureNames, selectStyle) {
      var scope = this;
      var mapViewer = this.mapViewer;
      var geoJsonGrp = mapViewer.getGeoJsonGroup();

      var style = selectStyle || {
        fillOpacity: .5
      };

      _.each(featureNames, function (f) {
        //loop through featureNames to find the selected geom
        var feature = null;
        //console.log(geoJsonGrp);
        geoJsonGrp.getLayers()[0].eachLayer(function (layer) {
          feature = layer.feature;
          if (typeof feature != 'undefined') {
            //console.log(feature);
            if (feature.properties.name.toLowerCase() == f.toLowerCase()) {
              //found the feature, now select it
              layer.setStyle(style);
              //keep up with last selected feature
              scope.selectedFeature = layer;
              scope.selectedFeatureName = f;
              scope.selectedLayers.push(layer);
            }
          }
        });
        //show text on the hover box
        scope.updateHoverText();
        //select fetures with the attributes specified..to be implemented
        if (typeof this.onGeomSelected == 'function') this.onGeomSelected.call(this, feature);
      });
    }
  }, {
    key: 'addClusterMarkers',
    value: function addClusterMarkers(data, popupTemplate) {
      var mapViewer = this.mapViewer;
      mapViewer.clearClusterMarkers(); //clear current clustermakers
      if (typeof data == 'undefined') data = this.clusterMarkerCache;else this.clusterMarkerCache = data;

      if (data.length == 0) {
        console.log('Can not add cluster markers. Data is empty.');
        return;
      }
      //check switch value
      if (!this.showMarkers) return;

      //add new cluster markers
      _.each(data, function (d) {
        var m = mapViewer.createMarker(d.y_coord, d.x_coord, {});
        m.bindPopup(d.template, {});
        mapViewer.addClusterMarker(m);
      });
    }
  }, {
    key: 'clearClusterMarkers',
    value: function clearClusterMarkers() {
      var mapViewer = this.mapViewer;
      mapViewer.clearClusterMarkers(); //clear current clustermakers
    }
  }, {
    key: 'setShowMarkers',
    value: function setShowMarkers(value) {
      this.showMarkers = value;
      if (!value) this.clearClusterMarkers();else this.addClusterMarkers(); //passing no param to add the cached marker data
    }
  }, {
    key: 'zoomToLocation',
    value: function zoomToLocation(lon, lat, level) {
      var lvl = level || 14;
      this.mapViewer.zoomToPoint({
        x: lon,
        y: lat
      }, lvl);
    }
  }, {
    key: 'setMapClickMode',
    value: function setMapClickMode(mode) {
      if (mode == 'single') this.singleSelect = true;else if (mode == 'multi') this.singleSelect = false;else {
        if (this.singleSelect) console.log('Map click mode is: Single selection');else console.log('Map click mode is: Multi selection');
      }
    }
  }]);

  return map;
}();

module.exports = map;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(0);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _map2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapviewer = __webpack_require__(3);

var _mapviewer2 = _interopRequireDefault(_mapviewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Author: Tu hoang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ESRGC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Provides base (prototype) functions for mapviewer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Note: this class is defined using dx library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               implements leaflet API 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               operates foodshed application
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var LeafletViewer = function (_MapViewer) {
  _inherits(LeafletViewer, _MapViewer);

  function LeafletViewer(options) {
    _classCallCheck(this, LeafletViewer);

    var _this = _possibleConstructorReturn(this, (LeafletViewer.__proto__ || Object.getPrototypeOf(LeafletViewer)).call(this, options));

    var min_url = '';
    if (typeof _this.minimal == 'undefined') min_url = 'http://{s}.tiles.mapbox.com/v3/esrgc.map-y9awf40v/{z}/{x}/{y}.png';else min_url = _this.minimal;

    //map setup
    var minimal = L.tileLayer(min_url);
    //var satellite = L.tileLayer('http://{s}.tiles.mapbox.com/v3/esrgc.map-0y6ifl91/{z}/{x}/{y}.png');

    var baseMaps = {
      "Base Map": minimal
      //"Satellite": satellite
    };
    _this.features = new L.FeatureGroup([
      //new L.Marker([39.0, -76.70]).bindPopup('Some organization'),
      //new L.Marker([39.0, -76.20]).bindPopup('Abc company'),
      //new L.Marker([38.9, -76.0]).bindPopup('Eastern shore company'),
      //new L.Marker([38.36, -75.59]).bindPopup('Salisbury University')
    ]);
    _this.geoJsonFeatures = L.geoJson();
    _this.clusterGroup = new L.MarkerClusterGroup(_this.clusterOptions);

    var overlayMaps = {
      //'State': stateBoundary,
      //'Counties': counties,
      'Overlays': _this.geoJsonFeatures

    };
    _this.map = L.map(_this.el, {
      layers: [minimal, _this.features, _this.geoJsonFeatures, _this.clusterGroup],
      center: _this.center || new L.LatLng(39.0, -76.70),
      zoom: _this.zoomLevel || 7,
      scrollWheelZoom: _this.scrollZoom || false
    });

    //copy layers to layer controls
    if (typeof _this.baseLayers != 'undefined') for (var i in _this.baseLayers) {
      var layer = _this.baseLayers[i];
      if (layer !== undefined) baseMaps[i] = layer;
    }
    var overlayMaps = {
      //other overlay layers go here
      //feature layer
      //'Features': this.features,
      'Overlays': _this.geoJsonFeatures
    };
    if (typeof _this.overlays != 'undefined') {
      for (var i in _this.overlays) {
        var layer = _this.overlays[i];
        overlayMaps[i] = layer;
      }
    }
    //L.control.layers(baseMaps, overlayMaps).addTo(this.map);
    //L.control.scale().addTo(this.map);
    return _this;
  }

  _createClass(LeafletViewer, [{
    key: 'getGeoJsonGroup',
    value: function getGeoJsonGroup() {
      return this.geoJsonFeatures;
    }
  }, {
    key: 'getFeatureGroup',
    value: function getFeatureGroup() {
      return this.features;
    }
  }, {
    key: 'addGeoJsonLayer',
    value: function addGeoJsonLayer(data, option) {
      if (typeof data == 'undefined') {
        console.log('No data found');
        return;
      }
      console.log('Adding data to map...');
      //console.log(data);
      if (this.geoJsonFeatures != 'undefined') {
        if (typeof option == 'undefined') this.geoJsonFeatures.addLayer(L.geoJson(data));else this.geoJsonFeatures.addLayer(L.geoJson(data, option));
      }
      console.log('------Data added to map');
    }
  }, {
    key: 'clearGeoJsonFeatures',
    value: function clearGeoJsonFeatures() {
      if (this.geoJsonFeatures != 'undefined') this.geoJsonFeatures.clearLayers();
    }
  }, {
    key: 'addFeatureToFeatureGroup',
    value: function addFeatureToFeatureGroup(feature) {
      var features = this.features;
      if (typeof features == 'undefined') {
        console.log('No feature group found');
        return;
      }
      if (feature != null) features.addLayer(feature);
    }
  }, {
    key: 'clearFeatures',
    value: function clearFeatures() {
      var features = this.features;
      if (typeof features == 'undefined') {
        console.log('No feature group found');
        return;
      }
      features.clearLayers();
    }
  }, {
    key: 'createFeature',
    value: function createFeature(obj) {
      var wkt = new Wkt.Wkt();
      wkt.read(obj);
      var f = wkt.toObject();
      return f;
    }
  }, {
    key: 'createMarker',
    value: function createMarker(lat, lng, options) {
      return L.marker(L.latLng(lat, lng), options);
    }
  }, {
    key: 'addClusterMarker',
    value: function addClusterMarker(marker) {
      if (typeof this.clusterGroup == 'undefined') return;
      this.clusterGroup.addLayer(marker);
    }
  }, {
    key: 'clearClusterMarkers',
    value: function clearClusterMarkers() {
      this.clusterGroup.clearLayers();
    }
  }, {
    key: 'getClusterGroup',
    value: function getClusterGroup() {
      return this.clusterGroup;
    }
  }, {
    key: 'getFeaturesBound',
    value: function getFeaturesBound() {
      var features = this.features;
      if (typeof features == 'undefined') {
        console.log('No feature group found');
        return;
      }
      return features.getBounds();
    }
  }, {
    key: 'getGeoJsonFeaturesBound',
    value: function getGeoJsonFeaturesBound() {
      var features = this.geoJsonFeatures;
      if (typeof features == 'undefined') {
        console.log('No geojson feature found');
        return;
      }
      return features.getBounds();
    }
  }, {
    key: 'zoomToFeatures',
    value: function zoomToFeatures() {
      var bounds = this.getFeaturesBound();
      if (typeof bounds != 'undefined') this.map.fitBounds(bounds);
    }
  }, {
    key: 'zoomToGeoJsonFeatures',
    value: function zoomToGeoJsonFeatures() {
      var bounds = this.getGeoJsonFeaturesBound();
      if (typeof bounds != 'undefined') this.map.fitBounds(bounds);
    }
  }, {
    key: 'zoomToPoint',
    value: function zoomToPoint(point, zoom) {
      var z = zoom || this.map.getMaxZoom(); //default zoom
      if (typeof point.x != 'undefined' && typeof point.y != 'undefined') {
        var latlng = new L.LatLng(point.y, point.x);
        this.map.setView(latlng, z);
      } else {
        this.map.setView(point, z);
      }
    }
  }, {
    key: 'pointInPolygon',
    value: function pointInPolygon(point, vs) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

      var x = point[0],
          y = point[1];

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      return inside;
    }
  }]);

  return LeafletViewer;
}(_mapviewer2.default);

exports.default = LeafletViewer;
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Author: Tu hoang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ESRGC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Provides base (prototype) functions for mapviewer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     This class implement leaflet API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _util = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapViewer = function () {
  function MapViewer(options) {
    _classCallCheck(this, MapViewer);

    (0, _util.copy)(this, options);
  }

  _createClass(MapViewer, [{
    key: 'zoomToExtent',
    value: function zoomToExtent(extent) {
      this.map.fitBounds(new L.LatLngBounds(new L.LatLng(extent.xmin, extent.ymin), new L.LatLng(extent.xmax, extent.ymax)));
    }
  }, {
    key: 'zoomToFullExtent',
    value: function zoomToFullExtent() {}
    //zoom to xy (if level exists then zoom to that level otherwise maxlevel is used)

  }, {
    key: 'zoomToXY',
    value: function zoomToXY(x, y, level) {
      if (typeof level == 'undefined') this.map.setView(new L.LatLng(y, x), this.map.getMaxZoom());else this.map.setView(new L.LatLng(y, x), level);
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      this.map.zoomIn();
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      this.map.zoomOut();
    }
  }, {
    key: 'zoomToDataExtent',
    value: function zoomToDataExtent(layer) {
      this.map.fitBounds(layer.getBounds());
    }
  }, {
    key: 'panTo',
    value: function panTo(x, y) {
      this.map.panTo(new L.LatLng(y, x));
    }
  }, {
    key: 'locate',
    value: function locate() {
      this.map.locateAndSetView(this.map.getMaxZoom() - 2);
    }
  }]);

  return MapViewer;
}();

module.exports = MapViewer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//copy object properties
var copy = function copy(dest, source) {
  dest = dest || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        dest[property] = value;
      }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object
     * is an instance of window.Event.
     */

    var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;

    if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
      dest.toString = source.toString;
    }
  }
  return dest;
};

exports.default = { copy: copy };

/***/ })
/******/ ]);