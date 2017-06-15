/*
Author: Tu Hoang
Aug 2013

Thematic renderer
thematicRenderer.js

this class handles thematic rendering
*/

export default class Choropleth {

  constructor(fieldName) { //field name used to calculate ranges
    var scope = this;
    
    this._thematicObj = {
      fieldName: "", //attribute field used to calculate ranges
      currentClassification: "equalInterval",
      classRanges: {
        quantile: null,
        equalInterval: null
      },
      numClasses: 6, //default value
      themes: {
        green: ["#f4f8fa", "#dffbdb", "#c0fbbb", "#a1f69b", "#83f980", "#68f964"],
        red: ["#f5f7fa", "#f5dadd", "#f5bdc0", "#f5a1a4", "#f58487", "#f5686b"],
        blue: ["#f4f7fb", "#d7dafb", "#babdfb", "#9ea1fb", "#8184fb", "#6568fb"],
        yellow: ["#f5f8fa", "#f5f8dd", "#f5f8c0", "#f5f8a4", "#f5f887", "#f5f86b"],
        heatMap: ["#FEF0D9", "#FDCC8A", "#FC8D59", "#E34A33", "#B30000", "#6F0505"]
      },
      currentTheme: null,
      opacity: 0.8
    };
    this.setFieldName(fieldName);
    this.setColorTheme('green'); //default color theme
  }
  ///////////////////Thematic rendering////////////////////////////
  get thematicObj() {
    return this._thematicObj;
  }

  setNumOfClasses(num) {
    if (isFinite(num))
      this._thematicObj.numClasses = num;
    else
      console.log('Thematic renderer could not set number of classes to ' + num);
  }

  setCustomColorTheme (theme) {
    this._thematicObj.themes[theme.name] = theme.colors;
    this.setColorTheme(theme.name);
  }

  setOpacity (opacity) {
    this._thematicObj.opacity = opacity;
    //redraw
    this.redraw();
  }

  setFieldName (name) {
    this._thematicObj.fieldName = name;
  }

  setColorTheme (theme) {
    if (typeof theme !== "undefined") {
      this._thematicObj.currentTheme = this._thematicObj.themes[theme];
      //redraw
      this.redraw();
    }
  }

  setClassification (classification) {
    this._thematicObj.currentClassification = classification;
    //redraw
    this.redraw();
  }

  getColorIndex (value, ranges) {
    var index = this._thematicObj.numClasses - 1;
    for (var i = 0; i < this._thematicObj.numClasses - 1; i++) {
      if ((Number(value) >= Number(ranges[i])) && (Number(value) < Number(ranges[(i + 1)]))){
       // console.log("Match" + value +" with "+ranges[i]);
        index = i;
        break;
      }
    }
    return index;
  }

  getColorString (value) {
    if(value == 0)
      return '#DCDCDC';//gray color for 0
    var ranges = this._thematicObj.classRanges[this._thematicObj.currentClassification];
    if (typeof ranges != 'undefined') {
      var colorIndex = this.getColorIndex(value, ranges);
      //console.log("CURRENT THEME");
      //console.log(this._thematicObj.currentTheme);
      return this._thematicObj.currentTheme[colorIndex];
    }
  }

  getOpacity () {
    return this._thematicObj.opacity;
  }
  /*
  Calculate thematic ranges 
  return true if succeed otherwise false
  data format: unwrapped
  */
  calculateThematicRanges (data) {
      if (typeof this._thematicObj == 'undefined')
      return false;
    var fieldName = this._thematicObj.fieldName;
    if (fieldName == "") {
      console.log("CalculateThematicRanges: fieldName is required to calculate ranges");
      return false;
    }
    var valueArray = [];
     
    for (i in data) {
      var dataEntry = data[i];
      var value = Math.round(dataEntry[fieldName] * 100) / 100;
      if(isNaN(value))
        value = 0;
      valueArray.push(value);
    }
   
   //console.log(valueArray);
     
    if (valueArray.length < this._thematicObj.numClasses)
      this._thematicObj.numClasses = valueArray.length;
      
    var minVal = valueArray[0],
      maxVal = _.max(valueArray);
    var range = maxVal - minVal;

    //calculate quantile rangegull
    var quantile = [];
    quantile.push(minVal);
    var increment = Math.ceil(valueArray.length / this._thematicObj.numClasses);
    for (var i = increment; i < valueArray.length; i += increment) {
      quantile.push(valueArray[i]);
    }
    //calculate equal interval range assuming valueArray is in ascending order
    var equalInterval = [];

    var step = Math.ceil(range / this._thematicObj.numClasses);
    
    var rangeStartVal = Math.floor(minVal);
    equalInterval.push(rangeStartVal); //1st range start
    for (var i = 1; i < this._thematicObj.numClasses; i++) {
      rangeStartVal += step;
      equalInterval.push(Math.ceil(rangeStartVal));
    }

    this._thematicObj.classRanges.quantile = quantile;
    this._thematicObj.classRanges.equalInterval = equalInterval;
    this._thematicObj.calculated = true;
    return true;
  }
  redraw () {
   
  }

  //return legend data based on classification (quantile or equal interval)
  getLegendData (formatFn, classificationType) {
    if (typeof classificationType == 'undefined')
      classificationType = this._thematicObj.currentClassification;
    if (typeof formatFn != 'function')
      formatFn = function(num) {
        return num;
      }
    if (!this._thematicObj.calculated) {
      console.log('Data has not been calculated. Legend can not be generated.')
      return;
    }
    var scope = this;
    var ranges = this._thematicObj.classRanges[classificationType];
    if (typeof ranges == 'undefined') {
      console.log('Range data is undefined');
      return;
    }
    //console.log(ranges);

    var legends = _.map(ranges, function(v, index) {
      var label = '';
      if (typeof ranges[index + 1] == 'undefined')
        label = formatFn(v) + ' or greater';
      else
        label = [
          formatFn(v),
          ' - ',
          formatFn(ranges[index + 1])
        ].join('');
      //jOHN
      //For the legend, add a little to value so we dont get the nodata grey return
      if(v==0)v=v+.01;
      return {
        color: scope.getColorString(v),
        label: label
      }
    });
    legends = legends.reverse();
    return legends;
  }

}
