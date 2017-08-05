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
    $scope.test = 'Green Hat Console';
    $scope.sip = '192.168.0.1';
    $scope.cip = $scope.sip;
    $scope.arr = [];
    $scope.input;
    $scope.pastCmd = [];
    $scope.futureCmd = [];

    // function parseDir(dir) {
    //     return dir
    // }
    // function parseCommand(cmd) {
    //     return cmd
    // }

    function hack(){
        $interval($scope.interval,300)
    }
    function clear() {
         $scope.arr = [];
    }
    function help() {
         $scope.arr.push('Availible Commands: '+Object.keys($scope.commands).join(' | '))
    }
    function pwd() {
         $scope.arr.push('/'+$scope.curDir);        
    }
    function getLS(arr, obj){
        if (arr.length == 1){
            return obj[arr[0]]
        } else {
            let obj2 = obj[arr[0]];
            let arr2 = arr.slice(1);
            console.log(arr2)
            console.log(obj2)
            return getLS(arr2, obj2)
        }
    }

    function ls() {
        let arr = $scope.curDir.split('/');
        let fs = $scope.fs;
        
        let x = getLS(arr, fs);
        $scope.arr.push(Object.keys(x).join(' | '));         
    }

    function cd(newDir) {
        let dir = getLS($scope.curDir.split('/'),$scope.fs)
        if (newDir[0] == '..' && $scope.curDir != 'root'){
            let fd = $scope.curDir.split('/');
            fd.pop()
            $scope.curDir = fd.join('/');
        } else if (dir.hasOwnProperty(newDir[0])){
            $scope.curDir +=('/'+  newDir[0]);
        } else if (!newDir[0]) {
            $scope.curDir = 'root'
        } else {
            $scope.arr.push("Invalid directory");
        }
    }
    function mkdir(newDir) {
        let dir = getLS($scope.curDir.split('/'),$scope.fs);
        dir[newDir[0]] = {}

    }
    function touch(newFile) {
        let dir = getLS($scope.curDir.split('/'),$scope.fs);
        dir[newFile[0]] = []
    }
    
    $scope.commands = {
        hack: hack,
        clear: clear,
        help: help,
        pwd: pwd,
        ls: ls,
        cd: cd,
        mkdir: mkdir,
        touch: touch
    }

    $scope.cmd = function () {
        let comm = $scope.input.split(' ')
        if ($scope.commands.hasOwnProperty(comm[0])){
            $scope.arr.push('./ '+$scope.input);
            $scope.commands[comm[0]](comm.slice(1));

        } else {
            $scope.arr.push('./'+$scope.input);
            $scope.arr.push('./'+$scope.input + ' is not a valid command.');            
        }
        $scope.input = '';
        scrollToBottom();        
    }
    $scope.curDir = 'root/documents'
    $scope.fs = {
        root: {
            documents: {
                pictures: {
                    '2016':{

                    },
                    '2017': {

                    },
                    funny: {

                    }
                }
            },
            user: {

            },
            network: {

            }
        } 
    }

    $scope.clear = function () {
         $scope.arr = [];
    }

    function scrollToBottom() {
        $location.hash("scrollHere");
        $anchorScroll()
    }
    // $scope.catchKP = function () {
    //     console.log($event)
    // }
    $scope.interval = function(){
        $scope.arr.push(`->Scanning ip address: ${$scope.cip}`);
        $scope.cip = incIP($scope.cip);
        scrollToBottom();
    }
});