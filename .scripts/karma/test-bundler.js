/**
 * @file    test suite config
 * @author  Remo Vetere <remo.vetere@gmail.com>
 * @date    11.06.2016
 */

import 'babel-polyfill';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

global.expect = chai.expect;
global.should = chai.should();

const context = require.context('../../src', true, /.*test.(js|jsx)$/);
context.keys().forEach(context);
