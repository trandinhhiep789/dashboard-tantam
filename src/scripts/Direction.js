/*
 urlFindPath:
 */

function Direction(opts)
{
    var map = null;

    var lang = "VI";//EN

    var fromLatlng = null;

    var toLatlng = null;

    //var resultDirection = null;
    //var _Routes = null;

    var listRouteOnMap = [];

    //route dang active => stroke "#6495ED"
    var routeActiveIndex = 0;

    //chi vi tri dau duong
    var markerFocus = null;

    //description at: http://api.vietbando.com/vi/Home/HelpServiceClasses#turn-instruction
    /*
     VehicleType
    (Hiện tại chỉ hỗ trợ Đi bộ (Foot = 0), Xe máy (Motorcycle = 2), Xe hơi (Motorcar = 3) và Xe tải (Hgv = 5)).
    Foot = 0: Đi bộ.
    Bicycle = 1: Xe đạp.
    Motorcycle = 2: Xe máy.
    Motorcar = 3: Xe hơi.
    Goods = 4: Xe thương mại hạng nhẹ (<= 3,5 tấn).
    Hgv = 5: Xe chở hàng nặng (> 3,5 tấn), như xe tải.
    Lhv = 6: Xe siêu tải (<= 44 tấn).
    Bdouble = 7: Xe tải đường bộ loại B.
    Roadtrain = 8: Xe tải đường bộ nói chung.
    Psv = 9: Xe dịch vụ công cộng (như xe buýt, xe khách...).
    Emergency = 10: Các loại xe khẩn cấp như xe cứu thương, xe cứu hỏa, xe cảnh sát...
     */

    const VEHICLE_TYPE = {
        Foot: 0,// Đi bộ.
        Bicycle: 1,// Xe đạp.
        Motorcycle: 2,// Xe máy.
        Motorcar: 3,// Xe hơi.
        Goods: 4,// Xe thương mại hạng nhẹ(<= 3,5 tấn).
        Hgv: 5,//: Xe chở hàng nặng(> 3, 5 tấn), như xe tải.
        Lhv: 6,//: Xe siêu tải(<= 44 tấn).
        Bdouble: 7,//: Xe tải đường bộ loại B.
        Roadtrain: 8,//: Xe tải đường bộ nói chung.
        Psv: 9,//: Xe dịch vụ công cộng(như xe buýt, xe khách...).
        Emergency: 10// Các loại xe khẩn cấp như xe cứu thương, xe cứu hỏa, xe cảnh sát...
    };

    var paramsRequest = {
        "Alternative": 2147483647,
        "Distance": true,
        "Duration": true,
        "Geometry": true,
        "Instructions": true,
        "Points": [],
        "RouteCriteria": 0,
        "Uturn": true,
        "VehicleType": VEHICLE_TYPE.Motorcar
    };

    this.setVehicleType = function (vehicleType)
    {
        paramsRequest.VehicleType = vehicleType || paramsRequest.VehicleType;
    };

    //description at: http://api.vietbando.com/vi/Home/HelpServiceClasses#turn-instruction

    /*
     NoTurn = 0: Không rẽ.
    GoStraight = 1: Đi thẳng.
    TurnSlightRight = 2: Rẽ lệch phải.
    TurnRight = 3: Rẽ phải.
    TurnSharpRight = 4: Rẽ vòng sang phải.
    UTurn = 5: Quay đầu tại.
    TurnSharpLeft = 6: Rẽ vòng sang trái.
    TurnLeft = 7: Rẽ trái.
    TurnSlightLeft = 8: Rẽ lệch trái.
    ReachViaLocation = 9: Đến (điểm trung gian trên lộ trình).
    HeadOn = 10: Đi vào đường (Bắt đầu tại).
    EnterRoundAbout = 11: Vào vòng xoay.
    LeaveRoundAbout = 12: Rời vòng xoay vào.
    ChangeLane = 13: Chuyển làn tại.
    StartAtEndOfStreet = 14: Bắt đầu ở cuối đường (từ đường cụt đi ra).
    ReachedYourDestination = 15: Đến nơi (Kết thúc).
    ChangeLaneRight = 16: Chuyển làn sang phải tại.
    ChangeLaneLeft = 17: Chuyển làn sang trái tại.

     */
    function getDirectionNavi(dir)
    {
        switch (+dir) {
            case 0:
                return lang === "VI" ? "Không rẽ" : "NoTurn";
            case 1:
                return lang === "VI" ? "Đi thẳng" : "GoStraight";
            case 2:
                return lang === "VI" ? "Rẽ lệch phải" : "TurnSlightRight";
            case 3:
                return lang === "VI" ? "Rẽ phải" : "TurnRight";
            case 4:
                return lang === "VI" ? "Rẽ vòng sang phải" : "TurnSharpRight";
            case 5:
                return lang === "VI" ? "Quay đầu tại" : "UTurn";
            case 6:
                return lang === "VI" ? "Rẽ vòng sang trái" : "TurnSharpLeft";
            case 7:
                return lang === "VI" ? "Rẽ trái" : "TurnLeft";
            case 8:
                return lang === "VI" ? "Rẽ lệch trái" : "TurnSlightLeft";
            case 9:
                return lang === "VI" ? "Đến điểm trung gian" : "ReachViaLocation"; //Đến (điểm trung gian trên lộ trình).;
            case 10:
                return lang === "VI" ? "Đi vào" : "HeadOn"; //Đi vào đường (Bắt đầu tại).
            case 11:
                return lang === "VI" ? "Vào vòng xoay" : "EnterRoundAbout";
            case 12:
                return lang === "VI" ? "Rời vòng xoay" : "LeaveRoundAbout"; //"Rời vòng xoay";
            case 13:
                return lang === "VI" ? "Chuyển làn" : "ChangeLane"; //"Bám vòng xoay";
            case 14:
                return lang === "VI" ? "Đi từ cuối đường" : "StartAtEndOfStreet"; //; Bắt đầu ở cuối đường (từ đường cụt đi ra).
            case 15:
                return lang === "VI" ? "Đến đích" : "ReachedYourDestination";// Đến nơi (Kết thúc).
            case 16:
                return lang === "VI" ? "Chuyển làn sang phải tại" : "ChangeLaneRight";
            case 17:
                return lang === "VI" ? "Chuyển làn sang trái tại" : "ChangeLaneLeft";
        }
        return "direction_turn_straight";
    }

    function getDirectionIcon(dir)
    {
        //console.log(dir);
        switch (+dir) {
            case 0:
                return "direction_continue"; //"Không rẽ";
            case 1:
                return "direction_continue_straight"; //"Đi thẳng";
            case 2:
                return "direction_turn_slight_right"; //"Hướng sang phải";
            case 3:
                return "direction_turn_right"; //"Rẽ phải";
            case 4:
                return "direction_turn_sharp_right"; //"Vòng sang phải";
            case 5:
                return "direction_uturn"; //"Quay đầu";
            case 6:
                return "direction_turn_sharp_left"; //"Vòng sang trái";
            case 7:
                return "direction_turn_left"; //"Rẽ trái";
            case 8:
                return "direction_turn_slight_left"; //"Hướng sang trái";
            case 9:
                return "direction_arrive_straight"; //"Đến điểm trung gian";
            case 10:
                return "direction_turn_straight"; //"Đi vào";
            case 11:
                return "direction_roundabout"; //"Vào vòng xoay";
            case 12:
                return "direction_depart_straight"; //"Rời vòng xoay";
            case 13:
                return "direction_rotary"; //"Bám vòng xoay";
            case 14:
                return "direction_turn_straight"; //"Đi từ cuối đường";
            case 15:
                return "direction_arrive"; // "Đến đích";
        }
        return "direction_turn_straight";
    }
    /*
     Cach su dung steps.Indices
     */
    function focusStep(params)
    {
        var index = parseInt(params.currentTarget.getAttribute("index"));
        var indexOnPath = listRouteOnMap[routeActiveIndex].steps.Indices[index];

        var latlng = listRouteOnMap[routeActiveIndex].path.getPath().getAt(indexOnPath);
        if (markerFocus) {
            markerFocus.setPosition(latlng);
        }
        else {
            const contentAnhchor = '<div style="position: absolute; left: 0px; top: 0px; width: 9px; height: 9px; border: 1px solid rgb(0, 0, 0); border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; opacity: 1; background-color: green;"></div>';
            markerFocus = new vbd.CustomMarker({ position: latlng, map: map, content: contentAnhchor, icon: new vbd.Icon({ size: new vbd.Size(14, 14), anchor: new vbd.Point(4, 4) }) });
        }

        map.panTo(latlng);
    }

    function buildSteps(route)
    {
        var _fragment = document.createDocumentFragment();
        route.steps.Names.map(function (nameStreet, index)
        {
            var txt = document.createTextNode(nameStreet);
            var li = vbd.DomUtil.create('li');
            li.setAttribute("index", index);
            vbd.event.addDomListener(li, 'click', focusStep);
            //var srcIcon = "images/directionIcons/" + getDirectionIcon(route.steps.Turns[index]) + ".svg";
            //var img = document.createElement("IMG");
            //img.src = srcIcon;
            //li.appendChild(img);

            var spaneDir = vbd.DomUtil.create('span');
            spaneDir.style.fontStyle = "oblique";
            spaneDir.style.color = "blue";
            spaneDir.style.width = "100%";
            spaneDir.innerHTML = getDirectionNavi(route.steps.Turns[index]);

            li.appendChild(spaneDir);
            li.appendChild(txt);
            _fragment.appendChild(li);

        });

        return _fragment;
    }

    function onSelectedRoute(index)
    {
        routeActiveIndex = index;
        listRouteOnMap.map(function (routeItem)
        {
            routeItem.path.setStrokeColor("#696969");
        });

        var route = listRouteOnMap[index];
        route.path.setStrokeColor("#6495ED");

        if (markerFocus) {
            markerFocus.setMap(null);
        }
        markerFocus = null;

        var stepContainer = opts.stepContainer;

        if (!stepContainer)
            return false;

        stepContainer.innerHTML = "";
        var steps = buildSteps(route);
        stepContainer.appendChild(steps);
    }

    //return path and steps
    function buildRoute(route)
    {
        var geometry = route.Geometry;
        var routeOnMap = new vbd.Polyline({
            path: geometry,
            strokeOpacity: .6,
            strokeWidth: 6,
            map: map,
            drawArrows: true
        });

        vbd.event.addListener(routeOnMap, 'click', function (param)
        {
            onSelectedRoute(param.Me.index);
        });

        return {
            path: routeOnMap,
            steps: route.Steps
        };
    }

    function onError()
    {

    }

    function clearRoutes()
    {
        listRouteOnMap.map(function (route)
        {
            route.path.setMap(null);
        });

        listRouteOnMap = [];

        if (markerFocus) {
            markerFocus.setMap(null);
        }
        markerFocus = null;

        var stepContainer = opts.stepContainer;

        if (stepContainer)
            stepContainer.innerHTML = "";
    }

    function onResponse(responseText)
    {
        clearRoutes();

        var resultDirection = (typeof responseText === 'string' || responseText instanceof String) ? JSON.parse(responseText) : responseText;

        if (!resultDirection.Value) {
            return;
        }

        var routes = resultDirection.Value.Routes;

        console.log('routes: ' + routes.length);

        listRouteOnMap = routes.map(function (routeItem, index)
        {
            var route = buildRoute(routeItem);
            route.path.index = index;

            return route;
        });

        onSelectedRoute(0);

    }

    function sendRequest(method, url, data, fnCallback)
    {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.open(method, url, true);
        xhr.setRequestHeader("content-type", "application/json;charset=utf-8");


        xhr.onerror = function ()
        {
            fnCallback(xhr.statusText);
        };

        xhr.onload = function ()
        {
            if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
                let dataResp;
                try {
                    dataResp = JSON.parse(xhr.response);
                } catch (err) {
                    return fnCallback(err);
                }
                fnCallback(null, dataResp);
            } else {
                fnCallback(xhr.statusText);
            }
        };
        xhr.send(data);
        return { cancel: () => xhr.abort() };
    }

    function findDirection()
    {
        if (!fromLatlng || !toLatlng) {
            return;
        }

        paramsRequest.Points = [{
            "Latitude": fromLatlng.getPosition().Latitude,
            "Longitude": fromLatlng.getPosition().Longitude
        },
        {
            "Latitude": toLatlng.getPosition().Latitude,
            "Longitude": toLatlng.getPosition().Longitude
        }];

        var data = JSON.stringify(paramsRequest);
        sendRequest("POST", "api/Vietbando", data, function (err, sucess)
        {
            if (err === null) {
                onResponse(sucess);
            }
        });
    }

    this.findDirection = findDirection;

    this.fromHere = function (latlng)
    {
        if (fromLatlng !== null) {

            fromLatlng.setPosition(latlng);
        }
        else {
            fromLatlng = new vbd.CustomMarker({ position: latlng, content: '<div class="customMarker">A</div>', map: map });
        }
        var data = JSON.stringify({
            "Latitude": latlng.Latitude,
            "Longitude": latlng.Longitude
        });

        sendRequest("POST", "api/Geocode", data, function (err, sucess)
        {
            if (err === null) {
                var poi = [];
                if (sucess.IsSuccess) {
                    var poiObj = sucess.Value;
                    if (poiObj.Number) {
                        poi.push(poiObj.Number);
                    }
                    if (poiObj.Street) {
                        poi.push(poiObj.Street);
                    }
                    if (poiObj.Ward) {
                        poi.push(poiObj.Ward);
                    }
                    if (poiObj.District) {
                        poi.push(poiObj.District);
                    }

                    document.getElementById('myFrom').value = poi.join();
                }
            }

            if (toLatlng) {
                findDirection();
            }

        });


    };

    this.toHere = function (latlng)
    {
        if (toLatlng !== null) {

            toLatlng.setPosition(latlng);
        }
        else {
            toLatlng = new vbd.CustomMarker({ position: latlng, content: '<div class="customMarker">B</div>', map: map });
        }
        var data = JSON.stringify({
            "Latitude": latlng.Latitude,
            "Longitude": latlng.Longitude
        });

        sendRequest("POST", "api/Geocode", data, function (err, sucess)
        {
            if (err === null) {
                var poi = [];
                if (sucess.IsSuccess) {
                    var poiObj = sucess.Value;
                    if (poiObj.Number) {
                        poi.push(poiObj.Number);
                    }
                    if (poiObj.Street) {
                        poi.push(poiObj.Street);
                    }
                    if (poiObj.Ward) {
                        poi.push(poiObj.Ward);
                    }
                    if (poiObj.District) {
                        poi.push(poiObj.District);
                    }

                    document.getElementById('myTo').value = poi.join();
                }
            }

            if (fromLatlng) {
                findDirection();
            }
        });


    };

    this.addMap = function (pMap)
    {
        map = pMap;
    };
}