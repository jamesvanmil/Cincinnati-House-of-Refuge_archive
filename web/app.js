(function(){
  var app = angular.module('refuge', [ ]);

  app.controller('searchController', [ '$http', function($http){
    var search = this;
    search.results = [ ];
    search.facets = { };
    search.header = { };
    search.facetData = { };
    search.facetFields = { };
    search.facetIndex = [ ];

    // defaults gather all of the objects
    this.queryDefaults = {
      'q' : '*',
      'rows' : '100',
      'wt' : 'json',
      'json.nl' : 'map'
    };
    this.query = search.queryDefaults;

    // function to construct facet queries
    this.queryFacets = { };
    this.buildQueryFacets = function(facets) {
      facetKeys = Object.keys(facets);
      var facet_query_string = "";
      for (var i = 0, len = facetKeys.length; i < len; i++) {
        key = facetKeys[i];
        value = escape(facets[key].replace(/ /g, "+"));
        facet_query_string = facet_query_string + "fq=" + key + ":\"" + value + "\"&"
      }
      return facet_query_string
    }

    // construct the search URL
    this.buildSolrQuery = function(params, facets) {
      var baseUrl = "http://thesubdirectory.com:8983/solr/refuge/browse?";
      var paramArray = Object.keys(params);
      var query = "";
      for (var i = 0, len = paramArray.length; i < len; i++) {
        key = paramArray[i];
        value = params[key];
        query = query + key + "=" + value +"&";
      }
      return baseUrl + query + this.buildQueryFacets(facets);
    };

    // get new results and save the useful bits
    this.runSolrQuery = function() {
      $http.get(this.buildSolrQuery(this.query, this.queryFacets)).success(function(data){
        search.facetData = { };
        search.results = data.response.docs;
        search.facetFields = data.facet_counts.facet_fields
        search.facetIndex = Object.keys(search.facetFields);
      });
    };

    // default results - will load when initialized
    this.runSolrQuery(this.query);
  }]);
})();
