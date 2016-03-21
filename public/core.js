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
        
        $http.get('/customer')
        .success(function(data) {
          $scope.customers = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.deleteCustomer = function(id) {
    $http.delete('/customer/', {params: {_id: id}})
      .success(function(data) {
        $http.get('/customer')
        .success(function(data) {
          $scope.customers = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.open = function(customer){
    $uibModal.open({
      templateUrl: 'myModalContent.html',
      replace: true,
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $uibModalInstance, $log) {
        $scope.customer = customer;
        $scope.editCustomer = function() {
          $http.put('/customer/', {
            params: {
              name: {
                first: customer.name.first,
                last: customer.name.last
              },
              id: customer._id,
              skype: customer.skype,
              companyName: customer.companyName,
              phone: {
                work: customer.phone.work,
                mobile: customer.phone.mobile
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
        $scope.close = function () {
         $uibModalInstance.close();
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