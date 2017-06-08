/**
 * Created by eylamfried on 6/7/17.
 */

module.exports = function (app) {
    var q = require('q');
    var qs = require('querystring');
    var http = require('https');

    app.get('/api/project/index.html/search', searchYelp);

    var options = {
        "method": "GET",
        "hostname": "api.yelp.com",
        "port": null,
        "path": "/v3/businesses/search?term=restaurant&location=boulder&Authorization=Bearer%20f9v0cXyTOKnqPqew1gDFZdnI1JVtFxQKj8cEJwgp0sTI_X9RH6dqTi1pYzcPQhqq9DgexghKfOT08QH3I2GbC1Z7WTU5DcGN2NDwlBNzoo5PmCtuT_fjqr05NqQ4WXYx",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": "Bearer f9v0cXyTOKnqPqew1gDFZdnI1JVtFxQKj8cEJwgp0sTI_X9RH6dqTi1pYzcPQhqq9DgexghKfOT08QH3I2GbC1Z7WTU5DcGN2NDwlBNzoo5PmCtuT_fjqr05NqQ4WXYx",
            "cache-control": "no-cache"
        }
    };

    var grant = 'client_credentials';
    var id = 'lrtzj3c8xQyCghsBBOB9kA';
    var secret = 'Bf9ZR9QCzoJl1xCfwoLp8deVGO7AYo0iZGzumCaLBl5O48qyJXJIWEYDyxmmho7P';

    function searchYelp(req, res) {
        var term = req.query.term;
        var location = req.query.location;
        yelpSearchQuery(term, location)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404).send(error);
            });
    }

    function yelpSearchQuery(term, location) {
        var deferred = q.defer();
        http.get(options, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                try {
                    body = JSON.parse(body);
                    deferred.resolve(body);
                } catch (e) {
                    deferred.reject({error: e});
                }
            });
        });
        return deferred.promise;
    }

    /*function searchYelp(req, res) {

        var req = http.request(options, function (res2) {
            var chunks = [];
            res2.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res2.on("end", function() {

                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });

        });
        req.write(qs.stringify({ grant_type: 'client_credentials',
            client_id: 'lrtzj3c8xQyCghsBBOB9kA',
            client_secret: 'Bf9ZR9QCzoJl1xCfwoLp8deVGO7AYo0iZGzumCaLBl5O48qyJXJIWEYDyxmmho7P' }));
        req.end();

        res.sendStatus(200);

    }*/

};
