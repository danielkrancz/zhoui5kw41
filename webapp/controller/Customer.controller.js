sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, History, MessageToast) {
        "use strict";

        return Controller.extend("at.clouddna.student00.zhoui5.controller.Customer", {

            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();

                // PatternMached, wenn Kunden ausgewählt + Bearbeiten:
                let oRoute = oRouter.getRoute("RouteCustomer");
                oRoute.attachPatternMatched(this._onPatternMatched, this);

                //PatternMatched, wenn Kunde neu:
                oRoute = oRouter.getRoute("CreateCustomer");
                oRoute.attachPatternMatched(this._onCreatePatternMatched, this);
            },

            _onPatternMatched: function(oEvent){
                let sPath = decodeURIComponent(oEvent.getParameters().arguments.path);

                this.getView().bindElement(sPath);

                /*let oModel = this.getView().getModel();

                oModel.read(sPath, {
                    success: (oRetVal) => {
                        debugger;
                    }
                });*/
            },

            _onCreatePatternMatched: function(){
                let sPath = this.getView().getModel().createEntry("/CustomerSet").getPath();
                this.getView().bindElement(sPath);
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
                    oModel = oView.getModel();
                    //oData = oModel.getData();

                debugger;

                oModel.submitChanges({
                    success: () => {
                        MessageBox.success("Erfolgreich angelegt/aktualisiert");
                    },
                    error: (oError) => {
                        MessageBox.error("Ein unbekannter Fehler ist aufgetreten!");
                    }
                });

                //let oInputCustomerId = oView.byId("customer_input_customerid");
                //let sCustomerId = oInputCustomerId.getValue();

                //console.log("Customer Data: " + JSON.stringify(oData));

                //alert("Hello world!");

            },

            onCancelPressed: function(){
                this.getView().getModel().resetChanges().then(() => {
                    MessageToast.show("Änderungen wurden erfolgreich zurückgesetzt!");
                });
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
            },

            onReloadData: function(){
                this.getView().getModel().refresh();
            }

        });
    });