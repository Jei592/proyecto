var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function ($scope, $filter) {
	$scope.triggerForm = false;
	$scope.editForm = false;
	$scope.addForm = false;
	$scope.order = 'name';

	$scope.users = [
		{ id: 1, Objeto: 'Mouse', FechaR: '', Usuario: 'manuel', Ubicacion: '' },
		{ id: 2, Objeto: 'CPU', FechaR: '', Usuario: 'maria', Ubicacion: '' },
	];



	$scope.orderBy = function (filter) {
		$scope.order = filter;
	};

	$scope.editUser = function (user) {
		var index = $scope.users.indexOf(user);
		$scope.triggerForm = true;
		$scope.editForm = true;
		$scope.addForm = false;
		$scope.emailExisted = false;
		$scope.editUserId = index;
		$scope.crudFormName = $scope.users[index].Objeto;
		$scope.crudFormCountry = $scope.users[index].FechaR;
		$scope.crudFormSalary = $scope.users[index].Ubicacion;
		$scope.crudFormEmail = $scope.users[index].Usuario;
	};

	setTimeout(function(){ 
		console.log("asdasdasd")
		document.getElementById("guardar").addEventListener("click", guardar);

		function guardar(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(xhttp.responseText)
				}
			};
			xhttp.open("GET", "/guardar?objeto="+document.getElementById("Objeto").value + "&fecha="+document.getElementById("FechaR").value + "&ubicacion="+document.getElementById("Ubicacion").value + "&usuario="+ document.getElementById("Usuario").value, false);
			xhttp.send();
		}
	}, 3000);

	$scope.saveEdit = function () {
		

		/*
		console.log( document.getElementById("Objeto").value )
		console.log( document.getElementById("FechaR").value )
		console.log( document.getElementById("Ubicacion").value )
		console.log( document.getElementById("Usuario").value )
		*/
	}

	$scope.deleteUser = function (user) {
		var index = $scope.users.indexOf(user);
		$scope.users.splice(index, 1);
	}

	$scope.addUser = function () {
		$scope.editUserId = 'new';
		$scope.triggerForm = true;
		$scope.editForm = false;
		$scope.addForm = true;
		$scope.emailExisted = false;
		$scope.userForm.$setUntouched();
		$scope.crudFormName = '';
		$scope.crudFormCountry = '';
		$scope.crudFormSalary = '';
		$scope.crudFormEmail = '';
	}
	$scope.checkEmail = function (userId) {

		if (userId === 'new' || $scope.crudFormEmail !== $scope.users[userId].email) {
			$scope.emailExisted = $scope.users.some(function (user) {
				return user.email === $scope.crudFormEmail;
			});
		}
	}
});

myApp.filter('totalSalary', function () {
	return function (data, key) {
		if (angular.isUndefined(data) && angular.isUndefined(key))
			return 0;
		var total = 0;
		angular.forEach(data, function (v, k) {
			total += parseInt(v[key]);
		});
		return total;
	}
});
//se llama la ubicacion
if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function (position) {
		document.getElementById("Ubicacion").value = "Latitud: " + position.coords.latitude + " Longitud: " + position.coords.longitude;
		console.log("Found your location nLat : " + position.coords.latitude + " nLang :" + position.coords.longitude);
		console.log("Latitud: " + position.coords.latitude + " Longitud: " + position.coords.longitude)
	});
} else {
	console.log("Geolocation not available!");
}

//Se llama la fache del dia de hoy
const fecha = new Date();
document.getElementById("FechaR").value = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
