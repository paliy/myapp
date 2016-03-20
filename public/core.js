var myapp = angular.module('myapp', ['ui.bootstrap']).controller('mainController', function ($scope, $http, $uibModal) {


  $scope.formData = {};
  var init = function(){
    $scope.customers();
  };


  $scope.customers = function(){
    $http.get('/customer')
      .success(function(data) {
        $scope.customers = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.createCustomer = function() {
    $http.post('/customer', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.customer = data;
        $scope.customers();
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.deleteCustomer = function(id) {
    $http.delete('/customer/', {params: {_id: id}})
      .success(function(data) {
        $scope.customers();
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.open = function(u){
    $uibModal.open({
      templateUrl: 'myModalContent.html',
      replace: true,
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $uibModalInstance, $log) {
        $scope.customer = u;
        $scope.editCustomer = function() {
          $http.put('/customer/', {
            params: {
              name: {
                first: u.name.first,
                last: u.name.last
              },
              id: u._id,
              skype: u.skype,
              companyName: u.companyName,
              phone: {
                work: u.phone.work,
                mobile: u.phone.mobile
              }              
            }
          })
            .success(function(data) {
              console.log(data);
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        };
      },
      resolve: {
        customer: function () {
          return $scope.customer;
        }
      }
    })
  }

  init();

})