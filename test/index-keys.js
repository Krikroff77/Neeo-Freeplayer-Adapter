var assert = require('assert');
var keys = require('../lib/keys');

describe('keys-mapping', function() {

    it('check key', function () {

        assert.equal(keys['POWER ON'], 'power');
        assert.equal(keys['POWER OFF'], 'power');

        assert.equal(keys['VOLUME UP'], 'vol_inc');
        assert.equal(keys['VOLUME DOWN'], 'vol_dec');
        assert.equal(keys['MUTE TOGGLE'], 'mute');
        
        assert.equal(keys['MENU'], 'home');
        assert.equal(keys['BACK'], 'red');

        assert.equal(keys['CHANNEL UP'], 'prgm_inc');
        assert.equal(keys['CHANNEL DOWN'], 'prgm_dec');

        assert.equal(keys['FUNCTION RED'], 'red');
        assert.equal(keys['FUNCTION GREEN'], 'green');
        assert.equal(keys['FUNCTION YELLOW'], 'yellow');
        assert.equal(keys['FUNCTION BLUE'], 'blue');

        assert.equal(keys['CURSOR ENTER'], 'ok');
        assert.equal(keys['CURSOR UP'], 'up');
        assert.equal(keys['CURSOR DOWN'], 'down');
        assert.equal(keys['CURSOR LEFT'], 'left');
        assert.equal(keys['CURSOR RIGHT'], 'right');

        assert.equal(keys['DIGIT 0'], '0');
        assert.equal(keys['DIGIT 1'], '1');
        assert.equal(keys['DIGIT 2'], '2');
        assert.equal(keys['DIGIT 3'], '3');
        assert.equal(keys['DIGIT 4'], '4');
        assert.equal(keys['DIGIT 5'], '5');
        assert.equal(keys['DIGIT 6'], '6');
        assert.equal(keys['DIGIT 7'], '7');
        assert.equal(keys['DIGIT 8'], '8');
        assert.equal(keys['DIGIT 9'], '9');
    });

});