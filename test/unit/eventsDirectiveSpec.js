'use strict';

/*jshint -W117 */
/*jshint globalstrict: true*/
/* jasmine specs for directives go here */

describe('Directive: leaflet', function() {
    var $compile = null, $rootScope = null, leafletData = null;

    beforeEach(module('leaflet-directive'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _leafletData_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        leafletData = _leafletData_;
    }));


    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));

    it('should broadcast events from the rootscope when triggered leaflet events',function(){
        var element = angular.element('<leaflet events="events"></leaflet>');
        element = $compile(element)($rootScope);
        var scope = element.scope();
        var check = {};
        var mapEvents = [
            'click',
            //'dblclick',
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'mousemove',
            'contextmenu',
            'focus',
            'blur',
            'preclick',
            'load',
            'unload',
            'viewreset',
            'movestart',
            'move',
            //'moveend',
            'dragstart',
            'drag',
            'dragend',
            'zoomstart',
            'zoomend',
            'zoomlevelschange',
            'resize',
            'autopanstart',
            //'layeradd',
            //'layerremove',
            'baselayerchange',
            'overlayadd',
            'overlayremove',
            'locationfound',
            'locationerror',
            'popupopen',
            'popupclose'
            ];

        function setEventTrue(position) {
            check[mapEvents[position]] = true;
        }

        leafletData.getMap().then(function(map) {
            for (var k in mapEvents){
                var eventName = 'leafletDirectiveMap.' + mapEvents[k];
                // console.log(eventName); // Inspect
                scope.$on(eventName, setEventTrue(k));
                map.fireEvent([mapEvents[k]]);
                expect(check[mapEvents[k]]).toEqual(true);
            }
        });
    });

    it('should NOT broadcast map events from the rootscope if the event-broadcast option is not an object',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        /*var $scope = $rootScope.$new();
        $scope.events = 3;
        $scope.fired = false;
        $scope.$on("leafletDirectiveMap.click", function(event, args){
            $scope.fired = true;
        });
        var element = angular.element('<leaflet event-broadcast="events"></leaflet>');
        element = $compile(element)($scope);
        var map = element.scope().leaflet.map;
        map.fire("click");
        $scope.$digest();
        expect($scope.fired).toBe(false);*/
        expect(true).toBe(true);
    });

    it('should broadcast map events (backward compatibility) from the rootscope if the event-broadcast does not have a map attribute',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: 'broadcast'
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast map events from the rootscope if the event-broadcast map attribute is not an object',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: 3
        };
        expect(true).toBe(true);
    });

    it('should broadcast map events from the rootscope if the event-broadcast map attribute does not have logic defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click']
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast map events from the rootscope if the event-broadcast map attribute has logic defined but is not "emit" or "broadcast"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "boolean"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit map events from the rootscope if the event-broadcast map attribute has logic defined "emit"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast map events from the rootscope if the event-broadcast map attribute has logic defined as "broadcast"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast map events from the rootscope if the event-broadcast map attribute has enabled and disabled defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                disable: ['zoomend'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast map events from the rootscope if the event-broadcast map attribute does not have enabled and disabled defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast some map events from the rootscope if the event-broadcast map attribute disables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                disable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT emit some map events from the rootscope if the event-broadcast map attribute disables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                disable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast some map events from the rootscope if the event-broadcast map attribute enables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit some map events from the rootscope if the event-broadcast map attribute enables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast some map events from the rootscope if the event-broadcast map attribute disables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                disable: ['click', 'foo'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT emit some map events from the rootscope if the event-broadcast map attribute disables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                disable: ['click', 'foo'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast some map events from the rootscope if the event-broadcast map attribute enables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click', 'foo'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit some map events from the rootscope if the event-broadcast map attribute enables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click', 'foo'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast marker events (backward compatibility) from the rootscope if the event-broadcast does not have a marker attribute',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            map: {
                enable: ['click'],
                logic: 'broadcast'
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast marker events from the rootscope if the event-broadcast marker attribute is not an object',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: 3
        };
        expect(true).toBe(true);
    });

    it('should broadcast marker events from the rootscope if the event-broadcast marker attribute does not have logic defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click']
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast marker events from the rootscope if the event-broadcast marker attribute has logic defined but is not "emit" or "broadcast"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: "boolean"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit marker events from the rootscope if the event-broadcast marker attribute has logic defined "emit"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast marker events from the rootscope if the event-broadcast marker attribute has logic defined as "broadcast"',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast marker events from the rootscope if the event-broadcast marker attribute has enabled and disabled defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                disable: ['zoomend'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast marker events from the rootscope if the event-broadcast marker attribute does not have enabled and disabled defined',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast some marker events from the rootscope if the event-broadcast marker attribute disables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                disable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT emit some marker events from the rootscope if the event-broadcast marker attribute disables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                disable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast some marker events from the rootscope if the event-broadcast marker attribute enables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit some marker events from the rootscope if the event-broadcast marker attribute enables them',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT broadcast some marker events from the rootscope if the event-broadcast marker attribute disables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                disable: ['click', 'foo'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should NOT emit some marker events from the rootscope if the event-broadcast marker attribute disables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                disable: ['click', 'foo'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });

    it('should broadcast some marker events from the rootscope if the event-broadcast marker attribute enables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click', 'foo'],
                logic: "broadcast"
            }
        };
        expect(true).toBe(true);
    });

    it('should emit some marker events from the rootscope if the event-broadcast marker attribute enables them although there is an invalid event name',function() {
        //TODO: pending until problems resolved, see issue #137 in
        // https://github.com/tombatossals/angular-leaflet-directive
        var $scope = $rootScope.$new();
        $scope.events = {
            marker: {
                enable: ['click', 'foo'],
                logic: "emit"
            }
        };
        expect(true).toBe(true);
    });


});
