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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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


var _leafletViewer = __webpack_require__(2);

var _leafletViewer2 = _interopRequireDefault(_leafletViewer);

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"~/leaflet.markercluster/dist/MarkerCluster.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var map = function () {
  function map(options) {
    _classCallCheck(this, map);

    this.el = options.el;
    this.name = 'mapWrapper';
    this.mapData = options.mapData || [
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
      this.mapViewer = new _leafletViewer2.default({
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

exports.default = map;

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

var _mapViewer = __webpack_require__(3);

var _mapViewer2 = _interopRequireDefault(_mapViewer);

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
}(_mapViewer2.default);

exports.default = LeafletViewer;
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Author: Tu hoang
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ESRGC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Provides base (prototype) functions for mapviewer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     This class implement leaflet API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _util = __webpack_require__(4);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapViewer = function () {
  function MapViewer(options) {
    _classCallCheck(this, MapViewer);

    (0, _util2.default)(this, options);
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

exports.default = MapViewer;

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

exports.default = copy;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
!function(e,t,i){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(e){L.Util.setOptions(this,e),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var t=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,t?this._withAnimation:this._noAnimation),this._markerCluster=t?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(e){if(e instanceof L.LayerGroup)return this.addLayers([e]);if(!e.getLatLng)return this._nonPointGroup.addLayer(e),this.fire("layeradd",{layer:e}),this;if(!this._map)return this._needsClustering.push(e),this.fire("layeradd",{layer:e}),this;if(this.hasLayer(e))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(e,this._maxZoom),this.fire("layeradd",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var t=e,i=this._zoom;if(e.__parent)for(;t.__parent._zoom>=i;)t=t.__parent;return this._currentShownBounds.contains(t.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(e,t):this._animationAddLayerNonAnimated(e,t)),this},removeLayer:function(e){return e instanceof L.LayerGroup?this.removeLayers([e]):e.getLatLng?this._map?e.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(e)),this._removeLayer(e,!0),this.fire("layerremove",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),e.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(e)&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,e)&&this.hasLayer(e)&&this._needsRemoving.push({layer:e,latlng:e._latlng}),this.fire("layerremove",{layer:e}),this):(this._nonPointGroup.removeLayer(e),this.fire("layerremove",{layer:e}),this)},addLayers:function(e,t){if(!L.Util.isArray(e))return this.addLayer(e);var i,n=this._featureGroup,r=this._nonPointGroup,s=this.options.chunkedLoading,o=this.options.chunkInterval,a=this.options.chunkProgress,h=e.length,l=0,_=!0;if(this._map){var u=(new Date).getTime(),d=L.bind(function(){for(var c=(new Date).getTime();h>l;l++){if(s&&0===l%200){var p=(new Date).getTime()-c;if(p>o)break}if(i=e[l],i instanceof L.LayerGroup)_&&(e=e.slice(),_=!1),this._extractNonGroupLayers(i,e),h=e.length;else if(i.getLatLng){if(!this.hasLayer(i)&&(this._addLayer(i,this._maxZoom),t||this.fire("layeradd",{layer:i}),i.__parent&&2===i.__parent.getChildCount())){var f=i.__parent.getAllChildMarkers(),m=f[0]===i?f[1]:f[0];n.removeLayer(m)}}else r.addLayer(i),t||this.fire("layeradd",{layer:i})}a&&a(l,h,(new Date).getTime()-u),l===h?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(d,this.options.chunkDelay)},this);d()}else for(var c=this._needsClustering;h>l;l++)i=e[l],i instanceof L.LayerGroup?(_&&(e=e.slice(),_=!1),this._extractNonGroupLayers(i,e),h=e.length):i.getLatLng?this.hasLayer(i)||c.push(i):r.addLayer(i);return this},removeLayers:function(e){var t,i,n=e.length,r=this._featureGroup,s=this._nonPointGroup,o=!0;if(!this._map){for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):(this._arraySplice(this._needsClustering,i),s.removeLayer(i),this.hasLayer(i)&&this._needsRemoving.push({layer:i,latlng:i._latlng}),this.fire("layerremove",{layer:i}));return this}if(this._unspiderfy){this._unspiderfy();var a=e.slice(),h=n;for(t=0;h>t;t++)i=a[t],i instanceof L.LayerGroup?(this._extractNonGroupLayers(i,a),h=a.length):this._unspiderfyLayer(i)}for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):i.__parent?(this._removeLayer(i,!0,!0),this.fire("layerremove",{layer:i}),r.hasLayer(i)&&(r.removeLayer(i),i.clusterShow&&i.clusterShow())):(s.removeLayer(i),this.fire("layerremove",{layer:i}));return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(e){e.off(this._childMarkerEventHandlers,this),delete e.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var e=new L.LatLngBounds;this._topClusterLevel&&e.extend(this._topClusterLevel._bounds);for(var t=this._needsClustering.length-1;t>=0;t--)e.extend(this._needsClustering[t].getLatLng());return e.extend(this._nonPointGroup.getBounds()),e},eachLayer:function(e,t){var i,n,r,s=this._needsClustering.slice(),o=this._needsRemoving;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(s),n=s.length-1;n>=0;n--){for(i=!0,r=o.length-1;r>=0;r--)if(o[r].layer===s[n]){i=!1;break}i&&e.call(t,s[n])}this._nonPointGroup.eachLayer(e,t)},getLayers:function(){var e=[];return this.eachLayer(function(t){e.push(t)}),e},getLayer:function(e){var t=null;return e=parseInt(e,10),this.eachLayer(function(i){L.stamp(i)===e&&(t=i)}),t},hasLayer:function(e){if(!e)return!1;var t,i=this._needsClustering;for(t=i.length-1;t>=0;t--)if(i[t]===e)return!0;for(i=this._needsRemoving,t=i.length-1;t>=0;t--)if(i[t].layer===e)return!1;return!(!e.__parent||e.__parent._group!==this)||this._nonPointGroup.hasLayer(e)},zoomToShowLayer:function(e,t){"function"!=typeof t&&(t=function(){});var i=function(){!e._icon&&!e.__parent._icon||this._inZoomAnimation||(this._map.off("moveend",i,this),this.off("animationend",i,this),e._icon?t():e.__parent._icon&&(this.once("spiderfied",t,this),e.__parent.spiderfy()))};e._icon&&this._map.getBounds().contains(e.getLatLng())?t():e.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",i,this),this._map.panTo(e.getLatLng())):(this._map.on("moveend",i,this),this.on("animationend",i,this),e.__parent.zoomToBounds())},onAdd:function(e){this._map=e;var t,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(e),this._nonPointGroup.addTo(e),this._gridClusters||this._generateInitialClusters(),this._maxLat=e.options.crs.projection.MAX_LATITUDE,t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],n.newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(e){e.off("zoomend",this._zoomEnd,this),e.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(e){for(var t=e;t&&!t._icon;)t=t.__parent;return t||null},_arraySplice:function(e,t){for(var i=e.length-1;i>=0;i--)if(e[i]===t)return e.splice(i,1),!0},_removeFromGridUnclustered:function(e,t){for(var i=this._map,n=this._gridUnclustered,r=this._map.getMinZoom();t>=r&&n[t].removeObject(e,i.project(e.getLatLng(),t));t--);},_childMarkerDragStart:function(e){e.target.__dragStart=e.target._latlng},_childMarkerMoved:function(e){if(!this._ignoreMove&&!e.target.__dragStart){var t=e.target._popup&&e.target._popup.isOpen();this._moveChild(e.target,e.oldLatLng,e.latlng),t&&e.target.openPopup()}},_moveChild:function(e,t,i){e._latlng=t,this.removeLayer(e),e._latlng=i,this.addLayer(e)},_childMarkerDragEnd:function(e){e.target.__dragStart&&this._moveChild(e.target,e.target.__dragStart,e.target._latlng),delete e.target.__dragStart},_removeLayer:function(e,t,i){var n=this._gridClusters,r=this._gridUnclustered,s=this._featureGroup,o=this._map,a=this._map.getMinZoom();t&&this._removeFromGridUnclustered(e,this._maxZoom);var h,l=e.__parent,_=l._markers;for(this._arraySplice(_,e);l&&(l._childCount--,l._boundsNeedUpdate=!0,!(l._zoom<a));)t&&l._childCount<=1?(h=l._markers[0]===e?l._markers[1]:l._markers[0],n[l._zoom].removeObject(l,o.project(l._cLatLng,l._zoom)),r[l._zoom].addObject(h,o.project(h.getLatLng(),l._zoom)),this._arraySplice(l.__parent._childClusters,l),l.__parent._markers.push(h),h.__parent=l.__parent,l._icon&&(s.removeLayer(l),i||s.addLayer(h))):l._iconNeedsUpdate=!0,l=l.__parent;delete e.__parent},_isOrIsParent:function(e,t){for(;t;){if(e===t)return!0;t=t.parentNode}return!1},fire:function(e,t,i){if(t&&t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;e="cluster"+e}L.FeatureGroup.prototype.fire.call(this,e,t,i)},listens:function(e,t){return L.FeatureGroup.prototype.listens.call(this,e,t)||L.FeatureGroup.prototype.listens.call(this,"cluster"+e,t)},_defaultIconCreateFunction:function(e){var t=e.getChildCount(),i=" marker-cluster-";return i+=10>t?"small":100>t?"medium":"large",new L.DivIcon({html:"<div><span>"+t+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var e=this._map,t=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick;(t||n)&&this.on("clusterclick",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),e.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(e){for(var t=e.layer,i=t;1===i._childClusters.length;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===t._childCount&&this.options.spiderfyOnMaxZoom?t.spiderfy():this.options.zoomToBoundsOnClick&&t.zoomToBounds(),e.originalEvent&&13===e.originalEvent.keyCode&&this._map._container.focus()},_showCoverage:function(e){var t=this._map;this._inZoomAnimation||(this._shownPolygon&&t.removeLayer(this._shownPolygon),e.layer.getChildCount()>2&&e.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),t.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var e=this.options.spiderfyOnMaxZoom,t=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this._map;(e||i)&&this.off("clusterclick",this._zoomOrSpiderfy,this),t&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),n.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var e=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._map.getMinZoom(),this._zoom,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),e),this._currentShownBounds=e}},_generateInitialClusters:function(){var e=this._map.getMaxZoom(),t=this._map.getMinZoom(),i=this.options.maxClusterRadius,n=i;"function"!=typeof i&&(n=function(){return i}),this.options.disableClusteringAtZoom&&(e=this.options.disableClusteringAtZoom-1),this._maxZoom=e,this._gridClusters={},this._gridUnclustered={};for(var r=e;r>=t;r--)this._gridClusters[r]=new L.DistanceGrid(n(r)),this._gridUnclustered[r]=new L.DistanceGrid(n(r));this._topClusterLevel=new this._markerCluster(this,t-1)},_addLayer:function(e,t){var i,n,r=this._gridClusters,s=this._gridUnclustered,o=this._map.getMinZoom();for(this.options.singleMarkerMode&&this._overrideMarkerIcon(e),e.on(this._childMarkerEventHandlers,this);t>=o;t--){i=this._map.project(e.getLatLng(),t);var a=r[t].getNearObject(i);if(a)return a._addChild(e),e.__parent=a,void 0;if(a=s[t].getNearObject(i)){var h=a.__parent;h&&this._removeLayer(a,!1);var l=new this._markerCluster(this,t,a,e);r[t].addObject(l,this._map.project(l._cLatLng,t)),a.__parent=l,e.__parent=l;var _=l;for(n=t-1;n>h._zoom;n--)_=new this._markerCluster(this,n,_),r[n].addObject(_,this._map.project(a.getLatLng(),n));return h._addChild(_),this._removeFromGridUnclustered(a,t),void 0}s[t].addObject(e,i)}this._topClusterLevel._addChild(e),e.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()})},_enqueue:function(e){this._queue.push(e),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var e=0;e<this._queue.length;e++)this._queue[e].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var e=Math.round(this._map._zoom);this._processQueue(),this._zoom<e&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._map.getMinZoom(),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,e)):this._zoom>e?(this._animationStart(),this._animationZoomOut(this._zoom,e)):this._moveEnd()},_getExpandedVisibleBounds:function(){return this.options.removeOutsideVisibleBounds?L.Browser.mobile?this._checkBoundsMaxLat(this._map.getBounds()):this._checkBoundsMaxLat(this._map.getBounds().pad(1)):this._mapBoundsInfinite},_checkBoundsMaxLat:function(e){var t=this._maxLat;return t!==i&&(e.getNorth()>=t&&(e._northEast.lat=1/0),e.getSouth()<=-t&&(e._southWest.lat=-1/0)),e},_animationAddLayerNonAnimated:function(e,t){if(t===e)this._featureGroup.addLayer(e);else if(2===t._childCount){t._addToMap();var i=t.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else t._updateIcon()},_extractNonGroupLayers:function(e,t){var i,n=e.getLayers(),r=0;for(t=t||[];r<n.length;r++)i=n[r],i instanceof L.LayerGroup?this._extractNonGroupLayers(i,t):t.push(i);return t},_overrideMarkerIcon:function(e){var t=e.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[e]}});return t}}),L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._map.getMinZoom(),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._map.getMinZoom(),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(e,t){this._animationAddLayerNonAnimated(e,t)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(e,t){var i,n=this._getExpandedVisibleBounds(),r=this._featureGroup,s=this._map.getMinZoom();this._ignoreMove=!0,this._topClusterLevel._recursively(n,e,s,function(s){var o,a=s._latlng,h=s._markers;for(n.contains(a)||(a=null),s._isSingleParent()&&e+1===t?(r.removeLayer(s),s._recursivelyAddChildrenToMap(null,t,n)):(s.clusterHide(),s._recursivelyAddChildrenToMap(a,t,n)),i=h.length-1;i>=0;i--)o=h[i],n.contains(o._latlng)||r.removeLayer(o)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(n,t),r.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.clusterShow()}),this._topClusterLevel._recursively(n,e,t,function(e){e._recursivelyRestoreChildPositions(t)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(n,e,s,function(e){r.removeLayer(e),e.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(e,t){this._animationZoomOutSingle(this._topClusterLevel,e-1,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._map.getMinZoom(),e,this._getExpandedVisibleBounds())},_animationAddLayer:function(e,t){var i=this,n=this._featureGroup;n.addLayer(e),t!==e&&(t._childCount>2?(t._updateIcon(),this._forceLayout(),this._animationStart(),e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),e.clusterHide(),this._enqueue(function(){n.removeLayer(e),e.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(t,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(e,t,i){var n=this._getExpandedVisibleBounds(),r=this._map.getMinZoom();e._recursivelyAnimateChildrenInAndAddSelfToMap(n,r,t+1,i);var s=this;this._forceLayout(),e._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(1===e._childCount){var o=e._markers[0];this._ignoreMove=!0,o.setLatLng(o.getLatLng()),this._ignoreMove=!1,o.clusterShow&&o.clusterShow()}else e._recursively(n,i,r,function(e){e._recursivelyRemoveChildrenFromMap(n,r,t+1)});s._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(t.body.offsetWidth)}}),L.markerClusterGroup=function(e){return new L.MarkerClusterGroup(e)},L.MarkerCluster=L.Marker.extend({initialize:function(e,t,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this}),this._group=e,this._zoom=t,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(e){e=e||[];for(var t=this._childClusters.length-1;t>=0;t--)this._childClusters[t].getAllChildMarkers(e);for(var i=this._markers.length-1;i>=0;i--)e.push(this._markers[i]);return e},getChildCount:function(){return this._childCount},zoomToBounds:function(){for(var e,t=this._childClusters.slice(),i=this._group._map,n=i.getBoundsZoom(this._bounds),r=this._zoom+1,s=i.getZoom();t.length>0&&n>r;){r++;var o=[];for(e=0;e<t.length;e++)o=o.concat(t[e]._childClusters);t=o}n>r?this._group._map.setView(this._latlng,r):s>=n?this._group._map.setView(this._latlng,s+1):this._group._map.fitBounds(this._bounds)},getBounds:function(){var e=new L.LatLngBounds;return e.extend(this._bounds),e},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(e,t){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(e),e instanceof L.MarkerCluster?(t||(this._childClusters.push(e),e.__parent=this),this._childCount+=e._childCount):(t||this._markers.push(e),this._childCount++),this.__parent&&this.__parent._addChild(e,!0)},_setClusterCenter:function(e){this._cLatLng||(this._cLatLng=e._cLatLng||e._latlng)},_resetBounds:function(){var e=this._bounds;e._southWest&&(e._southWest.lat=1/0,e._southWest.lng=1/0),e._northEast&&(e._northEast.lat=-1/0,e._northEast.lng=-1/0)},_recalculateBounds:function(){var e,t,i,n,r=this._markers,s=this._childClusters,o=0,a=0,h=this._childCount;if(0!==h){for(this._resetBounds(),e=0;e<r.length;e++)i=r[e]._latlng,this._bounds.extend(i),o+=i.lat,a+=i.lng;for(e=0;e<s.length;e++)t=s[e],t._boundsNeedUpdate&&t._recalculateBounds(),this._bounds.extend(t._bounds),i=t._wLatLng,n=t._childCount,o+=i.lat*n,a+=i.lng*n;this._latlng=this._wLatLng=new L.LatLng(o/h,a/h),this._boundsNeedUpdate=!1}},_addToMap:function(e){e&&(this._backupLatlng=this._latlng,this.setLatLng(e)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(e,t,i){this._recursively(e,this._group._map.getMinZoom(),i-1,function(e){var i,n,r=e._markers;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())},function(e){var i,n,r=e._childClusters;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(e,t,i,n){this._recursively(e,n,t,function(r){r._recursivelyAnimateChildrenIn(e,r._group._map.latLngToLayerPoint(r.getLatLng()).round(),i),r._isSingleParent()&&i-1===n?(r.clusterShow(),r._recursivelyRemoveChildrenFromMap(e,t,i)):r.clusterHide(),r._addToMap()})},_recursivelyBecomeVisible:function(e,t){this._recursively(e,this._group._map.getMinZoom(),t,null,function(e){e.clusterShow()})},_recursivelyAddChildrenToMap:function(e,t,i){this._recursively(i,this._group._map.getMinZoom()-1,t,function(n){if(t!==n._zoom)for(var r=n._markers.length-1;r>=0;r--){var s=n._markers[r];i.contains(s._latlng)&&(e&&(s._backupLatlng=s.getLatLng(),s.setLatLng(e),s.clusterHide&&s.clusterHide()),n._group._featureGroup.addLayer(s))}},function(t){t._addToMap(e)})},_recursivelyRestoreChildPositions:function(e){for(var t=this._markers.length-1;t>=0;t--){var i=this._markers[t];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(e-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var r=this._childClusters.length-1;r>=0;r--)this._childClusters[r]._recursivelyRestoreChildPositions(e)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(e,t,i,n){var r,s;this._recursively(e,t-1,i-1,function(e){for(s=e._markers.length-1;s>=0;s--)r=e._markers[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())},function(e){for(s=e._childClusters.length-1;s>=0;s--)r=e._childClusters[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())})},_recursively:function(e,t,i,n,r){var s,o,a=this._childClusters,h=this._zoom;if(h>=t&&(n&&n(this),r&&h===i&&r(this)),t>h||i>h)for(s=a.length-1;s>=0;s--)o=a[s],e.intersects(o._bounds)&&o._recursively(e,t,i,n,r)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.Marker.include({clusterHide:function(){return this.options.opacityWhenUnclustered=this.options.opacity||1,this.setOpacity(0)},clusterShow:function(){var e=this.setOpacity(this.options.opacity||this.options.opacityWhenUnclustered);return delete this.options.opacityWhenUnclustered,e}}),L.DistanceGrid=function(e){this._cellSize=e,this._sqCellSize=e*e,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(e,t){var i=this._getCoord(t.x),n=this._getCoord(t.y),r=this._grid,s=r[n]=r[n]||{},o=s[i]=s[i]||[],a=L.Util.stamp(e);this._objectPoint[a]=t,o.push(e)},updateObject:function(e,t){this.removeObject(e),this.addObject(e,t)},removeObject:function(e,t){var i,n,r=this._getCoord(t.x),s=this._getCoord(t.y),o=this._grid,a=o[s]=o[s]||{},h=a[r]=a[r]||[];for(delete this._objectPoint[L.Util.stamp(e)],i=0,n=h.length;n>i;i++)if(h[i]===e)return h.splice(i,1),1===n&&delete a[r],!0},eachObject:function(e,t){var i,n,r,s,o,a,h,l=this._grid;for(i in l){o=l[i];for(n in o)for(a=o[n],r=0,s=a.length;s>r;r++)h=e.call(t,a[r]),h&&(r--,s--)}},getNearObject:function(e){var t,i,n,r,s,o,a,h,l=this._getCoord(e.x),_=this._getCoord(e.y),u=this._objectPoint,d=this._sqCellSize,c=null;for(t=_-1;_+1>=t;t++)if(r=this._grid[t])for(i=l-1;l+1>=i;i++)if(s=r[i])for(n=0,o=s.length;o>n;n++)a=s[n],h=this._sqDist(u[L.Util.stamp(a)],e),d>h&&(d=h,c=a);return c},_getCoord:function(e){return Math.floor(e/this._cellSize)},_sqDist:function(e,t){var i=t.x-e.x,n=t.y-e.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(e,t){var i=t[1].lat-t[0].lat,n=t[0].lng-t[1].lng;return n*(e.lat-t[0].lat)+i*(e.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(e,t){var i,n,r,s=0,o=null,a=[];for(i=t.length-1;i>=0;i--)n=t[i],r=this.getDistant(n,e),r>0&&(a.push(n),r>s&&(s=r,o=n));return{maxPoint:o,newPoints:a}},buildConvexHull:function(e,t){var i=[],n=this.findMostDistantPointFromBaseLine(e,t);return n.maxPoint?(i=i.concat(this.buildConvexHull([e[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,e[1]],n.newPoints))):[e[0]]},getConvexHull:function(e){var t,i=!1,n=!1,r=!1,s=!1,o=null,a=null,h=null,l=null,_=null,u=null;for(t=e.length-1;t>=0;t--){var d=e[t];(i===!1||d.lat>i)&&(o=d,i=d.lat),(n===!1||d.lat<n)&&(a=d,n=d.lat),(r===!1||d.lng>r)&&(h=d,r=d.lng),(s===!1||d.lng<s)&&(l=d,s=d.lng)}n!==i?(u=a,_=o):(u=l,_=h);var c=[].concat(this.buildConvexHull([u,_],e),this.buildConvexHull([_,u],e));return c}}}(),L.MarkerCluster.include({getConvexHull:function(){var e,t,i=this.getAllChildMarkers(),n=[];for(t=i.length-1;t>=0;t--)e=i[t].getLatLng(),n.push(e);return L.QuickHull.getConvexHull(n)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),i=this._group,n=i._map,r=n.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,t.length>=this._circleSpiralSwitchover?e=this._generatePointsSpiral(t.length,r):(r.y+=10,e=this._generatePointsCircle(t.length,r)),this._animationSpiderfy(t,e)}},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,n,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),s=r/this._2PI,o=this._2PI/e,a=[];for(a.length=e,i=e-1;i>=0;i--)n=this._circleStartAngle+i*o,a[i]=new L.Point(t.x+s*Math.cos(n),t.y+s*Math.sin(n))._round();return a},_generatePointsSpiral:function(e,t){var i,n=this._group.options.spiderfyDistanceMultiplier,r=n*this._spiralLengthStart,s=n*this._spiralFootSeparation,o=n*this._spiralLengthFactor*this._2PI,a=0,h=[];for(h.length=e,i=e-1;i>=0;i--)a+=s/r+5e-4*i,h[i]=new L.Point(t.x+r*Math.cos(a),t.y+r*Math.sin(a))._round(),r+=o/a;return h},_noanimationUnspiderfy:function(){var e,t,i=this._group,n=i._map,r=i._featureGroup,s=this.getAllChildMarkers();for(i._ignoreMove=!0,this.setOpacity(1),t=s.length-1;t>=0;t--)e=s[t],r.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(n.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:s}),i._ignoreMove=!1,i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,n,r,s,o=this._group,a=o._map,h=o._featureGroup,l=this._group.options.spiderLegPolylineOptions;for(o._ignoreMove=!0,i=0;i<e.length;i++)s=a.layerPointToLatLng(t[i]),n=e[i],r=new L.Polyline([this._latlng,s],l),a.addLayer(r),n._spiderLeg=r,n._preSpiderfyLatlng=n._latlng,n.setLatLng(s),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n);this.setOpacity(.3),o._ignoreMove=!1,o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var n,r,s,o,a,h,l=this,_=this._group,u=_._map,d=_._featureGroup,c=this._latlng,p=u.latLngToLayerPoint(c),f=L.Path.SVG,m=L.extend({},this._group.options.spiderLegPolylineOptions),g=m.opacity;for(g===i&&(g=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),f?(m.opacity=0,m.className=(m.className||"")+" leaflet-cluster-spider-leg"):m.opacity=g,_._ignoreMove=!0,n=0;n<e.length;n++)r=e[n],h=u.layerPointToLatLng(t[n]),s=new L.Polyline([c,h],m),u.addLayer(s),r._spiderLeg=s,f&&(o=s._path,a=o.getTotalLength()+.1,o.style.strokeDasharray=a,o.style.strokeDashoffset=a),r.setZIndexOffset&&r.setZIndexOffset(1e6),r.clusterHide&&r.clusterHide(),d.addLayer(r),r._setPos&&r._setPos(p);for(_._forceLayout(),_._animationStart(),n=e.length-1;n>=0;n--)h=u.layerPointToLatLng(t[n]),r=e[n],r._preSpiderfyLatlng=r._latlng,r.setLatLng(h),r.clusterShow&&r.clusterShow(),f&&(s=r._spiderLeg,o=s._path,o.style.strokeDashoffset=0,s.setStyle({opacity:g}));this.setOpacity(.3),_._ignoreMove=!1,setTimeout(function(){_._animationEnd(),_.fire("spiderfied",{cluster:l,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,n,r,s,o,a=this,h=this._group,l=h._map,_=h._featureGroup,u=e?l._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):l.latLngToLayerPoint(this._latlng),d=this.getAllChildMarkers(),c=L.Path.SVG;for(h._ignoreMove=!0,h._animationStart(),this.setOpacity(1),i=d.length-1;i>=0;i--)t=d[i],t._preSpiderfyLatlng&&(t.closePopup(),t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,o=!0,t._setPos&&(t._setPos(u),o=!1),t.clusterHide&&(t.clusterHide(),o=!1),o&&_.removeLayer(t),c&&(n=t._spiderLeg,r=n._path,s=r.getTotalLength()+.1,r.style.strokeDashoffset=s,n.setStyle({opacity:0})));h._ignoreMove=!1,setTimeout(function(){var e=0;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&e++;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),e>1&&_.removeLayer(t),l.removeLayer(t._spiderLeg),delete t._spiderLeg);h._animationEnd(),h.fire("unspiderfied",{cluster:a,markers:d})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)
}}),L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var t,i;for(t in e)for(i=e[t].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(e){var t,i;for(t in e)i=e[t],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(e,t){var i=this.options.icon;return L.setOptions(i,e),this.setIcon(i),t&&this.__parent&&this.__parent._group.refreshClusters(this),this}})}(window,document);

/***/ })
/******/ ]);