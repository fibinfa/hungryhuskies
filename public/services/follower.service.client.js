(function () {
    angular
        .module("HungryApp")
        .service("FollowerService",FollowerService);


    function FollowerService($http) {
        var api = {
            createFollower: createFollower,
            findIfFollower: findIfFollower,
            findAllFollower: findAllFollower,
            findAllFollowing: findAllFollowing,
            deleteFollower: deleteFollower

        };
        return api;

        function createFollower(followerUser, followingUser) {
            var followObj = {
                username: followerUser,
                follower: followingUser
            };


            return $http.post("/api/follow", followObj);
        }


        function findIfFollower(followerUser, followingUser) {

            return $http.get("/api/follow?username="+followerUser+"&follower="+followingUser);
        }


        function findAllFollower(username) {

            return $http.get("/api/follow?username="+username);
        }

        function findAllFollowing(username) {

            return $http.get("/api/follow?follower="+username);
        }

        function deleteFollower(followerUser, followingUser) {

            return $http.delete("/api/follow?username="+followerUser+"&follower="+followingUser);
        }


    }
})();