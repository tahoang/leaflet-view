/*
Test choropleth
*/

import {expect} from 'chai';

import Choropleth from '../src/choropleth.js';

describe('Choropleth', ()=> {
	it('should be exist', ()=>{
		let choropleth = new Choropleth('test');
		// console.log(choropleth.thematicObj);
		expect(choropleth.thematicObj).to.not.be.undefined;
	});
});

describe('Choropleth', ()=> {
	it('should be able to set classification', ()=>{
		let choropleth = new Choropleth('test');
		// console.log(choropleth.thematicObj);
		choropleth.setClassification('quantile');
		expect(choropleth.thematicObj.currentClassification).to.equal('quantile');
	});
});

describe('Choropleth', ()=> {
	it('should be able to set number of classes', ()=>{
		let choropleth = new Choropleth('test');
		// console.log(choropleth.thematicObj);
		choropleth.setNumOfClasses(3)
		expect(choropleth.thematicObj.numClasses).to.equal(3);
	});
});