angular.module('app').controller('mainCtrl', function($scope, $interval, $anchorScroll, $location){

    function incIP(ip){
        let nums= ip.split('.').map((e)=>+e).reverse();
        for (let i = 0; i< nums.length; i++){
            if (nums[i] == 255){
                nums[i] = 0;          
            } else if (nums[i] < 255){
                nums[i]++;
                break;
            }
        }
        return nums.reverse().join('.')

    }
    function hack(){
        $interval($scope.interval,1000)
    }
    function clear() {
         $scope.arr = [];
    }
    function help() {
         $scope.arr.concat(Object.keys($scope.commands))
    }
    
    $scope.commands = {
        hack: hack,
        clear: clear,
        help: help
    }
    $scope.test = 'Green Hat Console'
    $scope.sip = '192.168.0.1'
    $scope.cip = $scope.sip
    $scope.arr = []
    $scope.input;

    $scope.cmd = function () {
        let comm = $scope.input.trim()
        if ($scope.commands.hasOwnProperty(comm)){
            $scope.arr.push('$ '+comm);
            $scope.commands[$scope.input]();

        } else {
            $scope.arr.push($scope.input);
            $scope.arr.push($scope.input + ' is not a valid command.');            
        }
        $scope.input = '';
    }

    $scope.clear = function () {
         $scope.arr = [];
    }

    function scrollToBottom() {
        $location.hash("form");
        $anchorScroll()
    }
    $scope.interval = function(){
        $scope.arr.push(`->Scanning ip address: ${$scope.cip}`);
        $scope.cip = incIP($scope.cip);
        scrollToBottom();
    }
});