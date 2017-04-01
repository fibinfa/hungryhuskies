(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", WidgetEditController);

    function WidgetEditController($routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        // vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }
        init();

        // function getEditorTemplateUrl(type) {
        //     return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        // }

        function updateWidget(newWidget) {
            if (newWidget != undefined && newWidget.name != null) {

            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .success(function (widget) {
                    if (widget == null) {
                        vm.error = "Unable to update the widget";
                    }
                    else {
                        vm.message = "Widget succesfully updated";
                    }
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                });
        }

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }
})();
