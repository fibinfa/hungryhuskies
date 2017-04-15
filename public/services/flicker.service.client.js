(function(){
    angular
        .module("HungryApp")
        .factory("FlickerService",FlickerService);

    var key = "0664561187c84cb27d6bd2d76654377e";
    var secret = "edbebba2da3ea6b1";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&per_page=9";

    function FlickerService($http){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        function searchPhotos(searchText){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();