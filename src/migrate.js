function start() {

	const mongoose = require('mongoose'),
		  async = require('async'),
		  config = require('./config')(),
		  logger  = require('./logger'),
		  MigrateHandler = require('./lib/MigrateHandler');

	mongoose.Promise = Promise,

	async.series(
		[
			(callback) => {
				logger.debug('Migration handler::Connecting to Mongoose...');

				const dbURI = config.mongo.uri,
					  db = mongoose.connection;

				db.on('connecting', function() {
					logger.debug('Connecting to MongoDB...');
				});

				db.on('error', function(error) {
					logger.error('Error in MongoDB connection: ' + error);
					mongoose.disconnect();
					callback(error);
				});

				db.on('connected', function() {
					logger.debug('MongoDB connected!');
					callback();
				});

				db.once('open', function() {
					logger.debug('MongoDB connection opened!');
				});

				db.on('reconnected', function () {
					logger.debug('MongoDB reconnected!');
				});

				db.on('disconnected', function() {
					logger.debug('MongoDB disconnected!');
					mongoose.connect(dbURI, { autoReconnect: true, useMongoClient: true});
				});

				mongoose.connect(dbURI, { autoReconnect: true, useMongoClient: true });
			},
			(callback) => {
				logger.debug('We can start migration now');

				(new MigrateHandler()).start()
					.then(() => {
						logger.info('Migration handler:: All scripts were invoked');
						process.exit();
					}).catch((err) => {
						logger.info('Migration handler:: Error ', err);
						process.exit();
					});
			}
		],
		(err) => {
			if(err) {
				logger.error('Migration handler process problem:', err);
				process.exit();
			}
		}
	);

	process.on('SIGTERM', function(){
		logger.info('Migration handler::Exiting...');
		mongoose.connection.close(function () {
			logger.info('Migration handler::Mongoose default connection disconnected.');
			process.exit(0);
		});
	});

	process.on('uncaughtException', function(err) {
		logger.info('Migration handler::Uncaught Exception:', err);
		process.exit();
	});

	process.on('unhandledRejection', console.error)
}

start();
