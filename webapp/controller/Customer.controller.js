sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, History) {
        "use strict";

        return Controller.extend("at.clouddna.student00.zhoui5.controller.Customer", {

            onInit: function () {
                console.log("Customer - onInit");
                let oRouter = this.getOwnerComponent().getRouter();
                let oRoute = oRouter.getRoute("RouteCustomer");
                oRoute.attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(oEvent){
                console.log("Customer - onPatternMatched");
                let sPath = decodeURIComponent(oEvent.getParameters().arguments.path);

                this.getView().bindElement(sPath);

                /*let oModel = this.getView().getModel();

                oModel.read(sPath, {
                    success: (oRetVal) => {
                        debugger;
                    }
                });*/
            },

            onExit: function() {},
            onBeforeRendering: function(){},
            onAfterRendering: function() {},

            genderFormatter: function(sKey){
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();

                let sText = oResourceBundle.getText(sKey);

                return sText;
            },

            onSavePressed: function() {
                let oView = this.getView(),
                    oModel = oView.getModel(),
                    oData = oModel.getData();

                //let oInputCustomerId = oView.byId("customer_input_customerid");
                //let sCustomerId = oInputCustomerId.getValue();

                MessageBox.success(JSON.stringify(oData));

                console.log("Customer Data: " + JSON.stringify(oData));

                //alert("Hello world!");

            },

            onNavBack: function(){
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Main", {}, true);
                }
            }

        });
    });