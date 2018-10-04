/*
Author: Tu Hoang
ESRGC2017

Map

render basic map for dashboards

Requires leaflet.js

Events 
onMapLoaded --fired when map is done initialized
onLayerChanged -- fired when new data is loaded to geojson
onGeomSelected -- fired when mouse clicked layer (geometry)
onFeatureMouseover -- fired when mouse is over a layer (geometry)
onFeatureMouseout -- fired when mouse is out of a layer (geometry)
onMapMoveend --fired when map is moved to a new center
onZoomToExtent --fired when zoom to extent button clicked (passed in mapviewer as a param)
setMapClickMode -- set selection mode (single or multi)

options:
autoLoad -- auto load map data (geojson)
mapData -- data array containing info to load geojson layers
center
zoomLevel
singleSelect
el -- element to draw map to

*/
//leaflet library

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster';

import LeafletViewer from './leafletViewer.js';
import _ from 'lodash';
import $ from 'jquery';

export default class LeafletWrapper {
  constructor(options) {
    // this.el = options.el;
    //copy options to this object
    Object.assign(this, options);
    this.name = 'MapWrapper';
    if (typeof this.mapData === 'undefined')
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
    const selected = _.filter(this.mapData, (v, k) => v.selected);
    this.selectedLayer = selected.length > 0 ? selected[0].name : ''; //geometry type "County" or "Region"
    this.selectedFeature = null;
    this.selectedFeatureName = '';
    this.selectedLayers = [];
    if (typeof this.singleSelect == 'undefined')
      this.singleSelect = false;//default to false (multiselect mode)
    this.mapParams = {};
    this.showMarkers = true;
    this.clusterMarkerCache = [];
    
    if(typeof this.autoLoad == 'undefined')
      this.autoLoad = false;//auto load option

    //render the map
    this.render();

  }

  render(options) {
    this.makeMap(); //set up map
    if(this.autoLoad)
      this.loadMapData(options); //load geometry       
    // this.renderControls(); //render layer controls
    console.log(this.name + ' has been initialized!')
  }

  makeMap() {
    var center = typeof this.center == 'undefined' ?
      new L.LatLng(38.3607, -75.5994) : new L.LatLng(this.center.y, this.center.x);;

    this.mapViewer = new LeafletViewer({
      el: this.el,
      center: center, //salisbury coordinates
      zoomLevel: this.zoomLevel || 10,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      scrollZoom: true,
      clusterOptions: {
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 40,
        iconCreateFunction: (cluster) => {
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

    this.mapViewer.Map.on('moveend', (ev) => {
      if (typeof this.onMapMoveend === 'function')
        this.onMapMoveend.call(this, ev);
    });
  }

  loadMapData(options) {
      var scope = this;
      //use backbone model to load layer data
      var model = new Backbone.Model();
      var mapData = this.mapData;
      if(mapData.length == 0) return;
      var counter = 0;
      var loadData = function(layer) {
        if (typeof layer == 'undefined') {
          if (typeof scope.onMapLoaded == 'function') {
            scope.onMapLoaded();
          }
          return;
        }
        if (layer.type == 'layer') {
          model.url = layer.url;
          model.fetch({
            success: (data) => {
              console.log('loaded map data for ' + layer.name);
              var newData = data.toJSON();
              layer.data = newData;
              //move to the next one
              counter++;
              if (counter < mapData.length) { //load more if exists
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
        } else { //if data is not a layer skip to the next one
          counter++;
          if (counter < mapData.length) //load more if exists
            loadData(mapData[counter]);
          else {

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
  showLayer(name, options) {
    console.log("showing  layer " + name);
    var scope = this;
    var setInitialAreaType = false;
    var entry = this.getLayer(name);
    if (typeof entry == 'undefined')
      return;
    scope.selectedLayer = name;
    scope.selectedFeatureName = '';
    scope.selectedFeature = null;
    scope.selectedLayers = [];
    var title = scope.getGeomName();
    scope.updateHoverText();
    var mapViewer = this.mapViewer;
    var newData = entry.data;
    var nameField = entry.nameField; //name of the property that contains geom name

    //determine layer styles (either a function returning style or a style object)
    var layerStyle = entry.style;
    var mouseoverStyle = {
      fillOpacity: 0.2
    };
    var selectedStyle = entry.selectedStyle || {
      //fillOpacity: 0.5
      //dashArray: '',
      opacity: 1,
      color: '#FCFF00',
      //color: '#E2E600',
      weight: 4
    };
    //console.log(options); //custom styles passed in options --this will bypass default style and styled specified in layer data
    if (typeof options != 'undefined') {
      if (options.style)
        layerStyle = options.style; //using function or style object
      if (options.mouseoverStyle)
        mouseoverStyle = options.mouseoverStyle;
      if (options.selectedStyle)
        selectedStyle = options.selectedStyle;
    }


    mapViewer.clearGeoJsonFeatures(); //clear old features
    mapViewer.addGeoJsonLayer(newData, {
      style: layerStyle,
      //this call back handles mouse events on feature selection
      onEachFeature: (feature, layer) => {

        //set initial areatype once layer is loaded
        if (!setInitialAreaType) {
          setInitialAreaType = true;
          scope.mapParams.areatype = feature.properties.areatype;
        }
        //console.log(feature);
        layer.on('click', function(e) {
          //console.log(e.target);
          //clear style (selected)       
          var layerGroup = mapViewer.getGeoJsonGroup();
          //console.log(e.target);
          //reset style for the whole layer group
          _.each(layerGroup.getLayers(), function(layers) {
            _.each(layers.getLayers(), function(l) {
              layers.resetStyle(l);
            });
          });
          //process selected feature
          var l = e.target; //get selected feature
          var index = null;
          //check whether the layer is currently selected
          for (var i = 0; i < scope.selectedLayers.length; i++) {
            var layer = scope.selectedLayers[i];
            if (_.isEqual(l.feature.properties, layer.feature.properties)) {
              index = i;
            }
          }
          //simulate toggle selection
          if (index != null) {
            scope.selectedLayers.splice(index, 1); //remove current layer from selected
          } else {
            if (scope.singleSelect == true)
              scope.selectedLayers = []; //reset selected layers when single select mode is on
            // scope.selectedFeature = l;
            scope.selectedLayers.push(l); //add selected layer to the collection
          }

          //set the last selected layer
          if (scope.selectedLayers.length > 0) {
            var sl = scope.selectedLayers[scope.selectedLayers.length - 1];
            scope.selectedFeature = sl;
            scope.selectedFeatureName = sl.feature.properties.name ||
              sl.feature.properties.region ||
              sl.feature.properties[nameField] || ''; //store selected feature name                                     
          } else

            scope.selectedFeature = null;

          //map updates
          var areatype = null,
            areacodes = [],
            params;

          //re-hilight the selected features
          _.each(scope.selectedLayers, function(sl) {
            sl.setStyle(selectedStyle);
            var props = sl.feature.properties;
            //access properties to get area type and code            
            if (typeof props.areatype != 'undefined' && typeof props.areacode != 'undefined') {
              //get areatype
              if (areatype == null)
                areatype = props.areatype; //only set once

              //get area code
              areacodes.push(props.areacode);
            }
          });
          if (areacodes.length > 0)
            params = {
              areatype: areatype,
              areacode: areacodes.join(',')
            };
          else
            params = {
              areatype: areatype,
              areacode: '0'
            };
          //update charts
          // scope.updateCharts(params);
          scope.mapParams = params;

          //finally run geom selected call back 
          if (typeof scope.onGeomSelected == 'function') {
            scope.onGeomSelected.call(scope, feature, scope.selectedLayers, entry); //pass selected feature as an argument
          }
        });
        layer.on('mouseover', function(e) {
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
          $('#hoverOverlay').text(area)

          if (typeof scope.onFeatureMouseover == 'function')
            scope.onFeatureMouseover(layer, entry);
        });
        layer.on('mouseout', function(e) {
          var layerGroup = mapViewer.getGeoJsonGroup();
          //console.log(e.target);
          //reset style for current target
          _.each(layerGroup.getLayers(), function(l) {
            l.resetStyle(e.target);
          });

          //re-hilight the selected features
          _.each(scope.selectedLayers, function(l) {
            l.setStyle(selectedStyle);
          });
          //show text on the hover box
          scope.updateHoverText();
          if (typeof scope.onFeatureMouseout == 'function')
            scope.onFeatureMouseout(layer, entry);
        });
      }
    });

    return mapViewer.getGeoJsonGroup();
  }
  getLayer(name) {
    for (var i in this.mapData) {
      var layer = this.mapData[i];

      if (layer.name == name)
        return layer;
    }
  }
  addZoomToExtent(iconContent) {
    var scope = this;
    // var data = this.mapData;
    // console.log(data);
    // var template = Handlebars.compile($(this.mapControlsTemplate).html());
    // var html = template({
    //   models: data
    // });
    // this.$('div.leaflet-bottom.leaflet-left').html(html);
    // //wire layer controls events
    // this.$('.overlays div.layers').on('click', function(e) {
    //   scope.mapControlClick.call(scope, e); //call callback in this view context
    // });
    // //hover box
    // this.$('div.leaflet-top.leaflet-right').append(
    //   '<div id="hoverOverlay" class="layerToggle" style="display: block;"></div>'
    // );

    if(typeof iconContent == 'undefined')
      iconContent = '<i class="fa fa-globe"></i>';

    //zoom to extent - insert the zoom to extent button to the 2 zoom in/out buttons
    $('div.leaflet-top.leaflet-left .leaflet-control-zoom-in').after([
      ' <a class="leaflet-control-zoom-out" id="zoomToExtent"',
      ' href="#" title="Zoom to Full-extent">',
      iconContent,
      '</a>'
    ].join(''));
    //zoom to extent button
    $('#zoomToExtent').on('click', function(e) {
      scope.mapViewer.zoomToGeoJsonFeatures(); //zoom to extent of current geojson layer
      if(typeof scope.onZoomToExtent == 'function')
        scope.onZoomToExtent(scope.mapViewer);
      return false;
    });
  }
  mapControlClick(e) {
    var c = e.currentTarget;
    var name = $(c).attr('data-name');
    console.log('map layer ' + name + ' control clicked');
    //show layer on the map
    this.showLayer(name);
    //add/remove check sign
    this.$(c).parent().find('i[role="checkbox"]').remove();
    $(c).find('p').append('<i class="fa fa-check" role="checkbox"></i>')
      // this.updateCharts(); //load defaults.
    if (typeof this.onLayerChanged == 'function')
      this.onLayerChanged.call(this, name);
  }
  getGeomName() {
    var title = '';
    if (this.selectedLayers.length > 1) {
      title = 'Multi Areas';
    } else if (this.selectedFeature == null)
      title = 'Statewide';
    else
      title = this.selectedLayer + ' ' + this.selectedFeatureName;
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

  updateHoverText() {
    var title = this.getGeomName();
    //show text on the hover box
    $('#hoverOverlay').text(title);
  }

  getCurrentParams() {
      var scope = this,
        areatype = null,
        areacodes = [];

      _.each(scope.selectedLayers, function(sl) {
        var props = sl.feature.properties;
        //access properties to get area type and code            
        if (typeof props.areatype != 'undefined' && typeof props.areacode != 'undefined') {
          //get areatype
          if (areatype == null)
            areatype = props.areatype; //only set once

          //get area code
          areacodes.push(props.areacode);
        }
      });
      if (areacodes.length > 0)
        return {
          areatype: areatype,
          areacode: areacodes.join(',')
        };
      else
        return {
          areatype: areatype,
          areacode: '0'
        };
    }
    //select geometry by name
  selectGeom(featureNames, selectStyle, nameField='NAME', invoke=false) {
    var scope = this;
    var mapViewer = this.mapViewer;
    var geoJsonGrp = mapViewer.getGeoJsonGroup();

    var style = selectStyle || {
      fillOpacity: .5
    };

    _.each(featureNames, function(f) {
      //loop through featureNames to find the selected geom
      var feature = null;
      //console.log(geoJsonGrp);
      geoJsonGrp.getLayers()[0].eachLayer(function(layer) {
        feature = layer.feature;
        if (typeof feature != 'undefined') {
          //console.log(feature);
          if (feature.properties[nameField].toString().toLowerCase() == f.toLowerCase()) {
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
      if (typeof scope.onGeomSelected == 'function' && invoke)
        scope.onGeomSelected.call(scope, null, scope.selectedLayers);
    });
    // return scope.selectedLayers;
  }
  //add cluster using json data or geojson data
  addClusterMarkers(data, popupTemplate, type = 'json', onClick) {
    var mapViewer = this.mapViewer;
    mapViewer.clearClusterMarkers(); //clear current clustermakers
    if (typeof data == 'undefined')
      data = this.clusterMarkerCache;
    else
      this.clusterMarkerCache = data;

    if (data.length == 0) {
      console.log('Can not add cluster markers. Data is empty.');
      return;
    }
    //check switch value
    if (!this.showMarkers)
      return;

    if(type == 'json') {
      //add new cluster markers
      _.each(data, function(d) {
        let template = typeof popupTemplate == 'undefined'? d.template : popupTemplate;
        var m = mapViewer.createMarker(d.y_coord, d.x_coord, {});
        m.bindPopup(template, {});
        mapViewer.addClusterMarker(m);
      });
    }
    else if(type == 'geojson'){
      //geojson
      mapViewer.addClusterGeoJson(data, {
        onEachFeature: (feature, layer) => {
          let properties = feature.properties;
          layer.bindPopup(L.Util.template(popupTemplate, properties));
          if(typeof onClick == 'function')
            layer.on('click', onClick);
        }
      });
    }
    else {console.log('Not supported data type. Use "geojson/json"');}

    return this.clusterGroup;
  }

  clearClusterMarkers() {
    var mapViewer = this.mapViewer;
    mapViewer.clearClusterMarkers(); //clear current clustermakers
  }

  setShowMarkers(value) {
    this.showMarkers = value;
    if (!value)
      this.clearClusterMarkers();
    else
      this.addClusterMarkers(); //passing no param to add the cached marker data
  }

  zoomToLocation(lon, lat, level) {
    let lvl = level || 14;
    this.mapViewer.zoomToPoint({
      x: lon,
      y: lat
    }, lvl);
  }

  setMapClickMode(mode) {
    if (mode == 'single')
      this.singleSelect = true;
    else if (mode == 'multi')
      this.singleSelect = false;
    else {
      if (this.singleSelect)
        console.log('Map click mode is: Single selection');
      else
        console.log('Map click mode is: Multi selection')
    }
  }

  getMapCenter() {
    return this.mapViewer.getMapCenter();
  }

  get Map () {
    return this.mapViewer.Map;
  }
};


