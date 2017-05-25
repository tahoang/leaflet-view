/*
Test choropleth
*/

import {expect} from 'chai';

import {Choropleth} from '../src/index.js';

describe('Choropleth', ()=> {
	it('should be exist', ()=>{
		let choropleth = new Choropleth('test');
		console.log(choropleth.thematicObj);
		expect(choropleth.thematicObj).to.not.be.undefined;
	});
});