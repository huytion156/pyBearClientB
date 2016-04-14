angular.module('pyBear.restAPIClient', [])
.factory('RestAPIGateWay', function($http) {
	const 	DEFAULT_GATEWAY 	= "http://192.168.137.187:1235",
			DEFAULT_UID			= 1,
			DEFAULT_TYPE		= "json";

	var		_gateWay 	= DEFAULT_GATEWAY,
			_uid	 	= DEFAULT_UID,
			_type		= DEFAULT_TYPE;
	return {
		'setUID': function(uid) {
			_uid = uid;
			console.log(_uid);
			console.log(uid);
		},
		'formatURL': function(url, data) {
			//set default parameters: uid and type
			url = _gateWay + url + '?uid=' + _uid + '&type=' + _type;

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
	    		'sid': sid,
	    	}, function (response) {
	    		Debug(response.data);
	    	});
	    },
	    'updatePlaylist': function(uid, rawlist) {
	    	var playlist = [];
	    	var j = 0;
	    	for (i in rawlist) {
	    		if (rawlist[i].checked) {
	    			playlist[j++] = rawlist[i].sid;
	    		}
	    	}
	    	return RestAPIGateWay.post('/story/playlist/update', {
	    		'playlist': playlist
	    	}, function (response) {
	    		Debug(response.data);
	    	});
	    },
	    'setVolume': function(volume) {
	    	return RestAPIGateWay.post('/story/setVolume', {
	    		'volume': volume, 
	    	}, function (response) {
	    		Debug(response.data);
	    	});
	    }
	};
});
