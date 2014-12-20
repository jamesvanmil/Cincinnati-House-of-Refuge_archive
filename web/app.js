(function(){
  var app = angular.module('refuge', [ ]);

  app.controller('searchController', [ '$http', function($http){
    var search = this;
    search.results = [ ];

    $http.get('http://thesubdirectory.com:8983/solr/refuge/browse?q=*%3A*&rows=1000&wt=json&indent=true').success(function(data){
      search.results = data;
    });
  }]);
})();
