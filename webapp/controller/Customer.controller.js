sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("at.clouddna.student00.zhoui5.controller.Customer", {
            onInit: function () {
                
            },

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

            }

        });
    });