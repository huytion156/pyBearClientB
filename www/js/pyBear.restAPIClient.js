angular.module('pyBear.restAPIClient', [])
.factory('RestAPIGateWay', function($http) {
	const 	DEFAULT_GATEWAY 	= "http://192.168.200.80/pyBearServer",
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
			$http.get(url, config).then(successCB, errorCB);
		},
		'post': function(url, data, successCB, errorCB, config) {
			$http.post(url, data, config).then(successCB, errorCB);
		},
		'put': function(url, data, successCB, errorCB, config) {
			$http.put(url, data, config).then(successCB, errorCB);
		},
		'delete': function(url, data, successCB, errorCB, config) {
			url = this.formatURL(url, data);
			$http.delete(url, config).then(successCB, errorCB);
		},
	};
})
.factory('RestAPIClient_story', function(RestAPIGateWay) {
	return {
	    'setList': function(variable) {
	   		RestAPIGateWay.get('/story', {}, function(response) {
	   			variable = response;
	   			Debug("setList story check");
	   			Debug(response);
	   		});
	    },
	};
});
