/*
Author: Tu hoang
ESRGC
Provides base (prototype) functions for mapviewer

This class implement leaflet API
*/

import copy from './util.js';

var MapViewer = class {
  constructor(options) {
    copy(this, options);
  }

  zoomToExtent(extent) {
    this.map.fitBounds(new L.LatLngBounds(new L.LatLng(extent.xmin, extent.ymin),
      new L.LatLng(extent.xmax, extent.ymax)));
  }
  zoomToFullExtent() {}
    //zoom to xy (if level exists then zoom to that level otherwise maxlevel is used)
  zoomToXY(x, y, level) {
    if (typeof level == 'undefined')
      this.map.setView(new L.LatLng(y, x), this.map.getMaxZoom());
    else
      this.map.setView(new L.LatLng(y, x), level);
  }
  zoomIn() {
    this.map.zoomIn();
  }
  zoomOut() {
    this.map.zoomOut();
  }
  zoomToDataExtent(layer) {
    this.map.fitBounds(layer.getBounds());
  }
  panTo(x, y) {
    this.map.panTo(new L.LatLng(y, x));
  }
  locate() {
    this.map.locateAndSetView(this.map.getMaxZoom() - 2);
  }

};

export default MapViewer;
