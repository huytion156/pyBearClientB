angular.module('pyBear.restAPIClient', [])
.factory('RestAPIGateWay', function($http) {
	const 	DEFAULT_GATEWAY 	= "http://192.168.100.245:1235",
			DEFAULT_BEAR_ROOM	= "BearNo1",
			DEFAULT_TYPE		= "json";

	var		_gateWay 	= DEFAULT_GATEWAY,
			_roomID 	= DEFAULT_BEAR_ROOM,
			_type		= DEFAULT_TYPE;
	return {
		'formatURL': function(url, data) {
			//set default parameters: roomID and type
			url = _gateWay + url + '?roomID=' + _roomID + '&type=' + _type;

			if (data != undefined)
				for (var key in data)
					url += '&' + key + '=' + data[key];
							
			return url;
		},
		'get': function(url, data, successCB, errorCB, config) {
			url = this.formatURL(url, data);
			return $http.get(url, config).then(successCB, errorCB);
		},
		'post': function(url, data, successCB, errorCB, config) {
			url = this.formatURL(url);
			return $http.post(url, data, config).then(successCB, errorCB);
		},
		'put': function(url, data, successCB, errorCB, config) {
			url = this.formatURL(url);
			return $http.put(url, data, config).then(successCB, errorCB);
		},
		'delete': function(url, data, successCB, errorCB, config) {
			url = this.formatURL(url, data);
			return $http.delete(url, config).then(successCB, errorCB);
		},
	};
})
.factory('RestAPIClient_story', function(RestAPIGateWay) {
	return {
	    'setList': function() {
	   		return RestAPIGateWay.get('/story', {}, function(response) {
	   			var data = response.data.data;
	   			Debug("setList story check");
	   			Debug(response.data);
	   			Debug(data);
	   			return data;
	   		});
	    },
	    'play': function(story) {
	    	var url = story['default_url'];
	    	var sid = story['sid'];
	    	return RestAPIGateWay.post('/story/play', {
	    		'url': url,
	    		'sid': sid
	    	}, function (response) {
	    		Debug(response.data);
	    	});
	    }
	};
});
