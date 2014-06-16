'use strict';

paymeLaterApp.controller('DebtsController', ['$http','$location','$scope', '$modal', 'resolvedPayment', 'Debt',
    function ($http,$location,$scope,$modal, resolvedPayment, Debt, Card ) {

        $scope.payments = resolvedPayment;

        $scope.payWithPayPal = function (id) {
        	$scope.paypal = undefined;
        	       	
        	$('#paypalConfirmationModal').modal('show');
        	
        	$http.get('app/rest/debts/payPal/' + id).then(function(res) {
                $scope.paypal = res.data;
            });
        	
        };
        
        $scope.payWithCreditCard = function (id) {
        	$scope.ceca = undefined;
        	       	
        	$('#cecaConfirmationModal').modal('show');
        	
        	$http.get('/app/rest/debts/card/' + id).then(function(res) {
                $scope.ceca = res.data;
            });
        };
}]);



