/**
 * Created by fibin on 10-02-2017.
 */
(function () {
    angular
        .module("HungryApp")
        .factory('UserService',userService);
    function userService($http) {

        var api={
            "createUser":createUser,
            "findUserByCredentials":findUserByCredentials,
            "findUserByUsername":findUserByUsername,
            "findUserById":findUserById,
            "updateUser":updateUser,
            "deleteUser":deleteUser,
            "login": login,
            "checkLoggedIn": checkLoggedIn,
            "logout": logout,
            "findCurrentUser": findCurrentUser,
            "findAllUsers": findAllUsers
        };
        return api;

        function findAllUsers() {
            return $http.get('/api/getAllUsers');
        }

        function logout() {
            return $http.post("/api/logout");
        }
        
        function checkLoggedIn() {
            return $http.post('/api/checkLoggedIn');
        }

        function login(user) {
            return $http.post("/api/login",user);
        }

        function createUser(user) {
            return $http.post("/api/user",user);
        }
        function updateUser(newUser) {
            return $http.put("/api/user/", newUser);
        }
        
        function findUserByCredentials(username, password) {
           return  $http.get("/api/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return  $http.get("/api/user?username="+username);
        }

        function findCurrentUser() {
            return $http.get("/api/user/");
        }

        function findUserById(uid) {
           return $http.get("/api/user/"+uid);
        }

        function deleteUser(uid) {
            return $http.delete("/api/user/"+uid);
        }

    }
})();
