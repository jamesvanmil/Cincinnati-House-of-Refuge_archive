(function(){
  var app = angular.module('refuge', [ ]);

  app.controller('searchController', [ '$http', function($http){
    var search = this;
    search.results = [ ];

    // defaults gather all of the objects
    this.queryDefaults = {
      q: '*',
      rows: '100',
      wt: 'json',
    };

    this.query = search.queryDefaults;
    

    // construct the search URL
    function buildSolrQuery(params) {
      var baseUrl = "http://thesubdirectory.com:8983/solr/refuge/browse?";
      var paramArray = Object.keys(params);
      var query = "";
      for (var i = 0, len = paramArray.length; i < len; i++) {
        key = paramArray[i];
        value = params[key];
        query = query + key + "=" + value +"&";
      }
      return baseUrl + query;
    };

    // get new results
    this.updateQuery = function() {
      $http.get(buildSolrQuery(this.query)).success(function(data){
        search.results = data;
      });
    };

    // default results - will load when initialized
    $http.get(buildSolrQuery(this.query)).success(function(data){
      search.results = data;
    });
  }]);
})();
