(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createWidget = createWidget;


        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createWidget(widgetType){
            var widget={};
            widget.type=widgetType;
            WidgetService
                .createWidget(vm.pageId,widget)
                .success(function (widget) {
                    var widgetId = widget._id;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgetId);
                });
        }

    }
})();
