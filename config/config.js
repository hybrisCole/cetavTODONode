var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    db: 'mongodb://nodejitsu_hybriscole:bug19ogrk7fgmcvda8soefbnii@ds039267.mongolab.com:39267/nodejitsu_hybriscole_nodejitsudb1893573149',
    root: rootPath,
    app: {
      name: 'CETAV'
    }
  },
  test: {
    db: 'mongodb://nodejitsu_hybriscole:bug19ogrk7fgmcvda8soefbnii@ds039267.mongolab.com:39267/nodejitsu_hybriscole_nodejitsudb1893573149',
    root: rootPath,
    app: {
      name: 'CETAV'
    }
  },
  production: {
    db: 'mongodb://nodejitsu_hybriscole:bug19ogrk7fgmcvda8soefbnii@ds039267.mongolab.com:39267/nodejitsu_hybriscole_nodejitsudb1893573149',
    root: rootPath,
    app: {
      name: 'CETAV'
    }
  }
}