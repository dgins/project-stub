/* jshint node:true */
/* global MAKE */

var PATH = require('path'),
    environ = require('bem-environ')(__dirname);

environ.extendMake(MAKE);

//process.env.YENV = 'production';
//process.env.XJST_ASYNCIFY = 'yes';

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks/,
    bundlesLevelsRegexp : /^.+?\.bundles$/,

    libraries : [
        'bem-core @ f4b46ef0590549042d938f7e981df4d14eb4caef',
        'bem-components @ 82301a8af6c15c2849d1f755a24f594de6522251'
    ]

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'browser.js+bemhtml',
            'css',
            'ie.css',
            'html'
        ];

    },

    getLevelsByBundleName : function() {
        return {
            'desktop.bundles' : [
                'libs/bem-core/common.blocks',
                'libs/bem-core/desktop.blocks',
                'libs/bem-components/common.blocks',
                'libs/bem-components/desktop.blocks',
                'common.blocks',
                'desktop.blocks'
            ]
        };
    },

    getLevels : function() {
        var resolve = PATH.resolve.bind(PATH, this.root),
            buildLevel = this.getLevelPath();

        return (this.getLevelsByBundleName()[buildLevel] || [])
            .map(function(path) { return resolve(path); })
            .concat(resolve(PATH.dirname(this.getNodePrefix()), 'blocks'));
    }

});
