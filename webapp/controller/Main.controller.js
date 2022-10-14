sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("at.clouddna.training00.zhoui5.controller.Main", {

            onInit: function(){
                
            },

            onDeleteButtonPressed: function(oEvent){
                let oButton = oEvent.getSource();
                let oBindingContext = oButton.getBindingContext();
                let sPath = oBindingContext.getPath();
                this._delete(sPath);
            },

            onDeleteModePressed: function(oEvent){
                let oListItem = oEvent.getParameters().listItem;
                let oBindingContext = oListItem.getBindingContext();
                let sPath = oBindingContext.getPath();
                this._delete(sPath);
            },

            _delete: function(sPath){
                let oModel = this.getView().getModel();

                MessageBox.confirm("Sind Sie sicher, dass Sie diesen Kunden löschen wollen?", {
                    title: "Löschvorgang",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: (sAction) => {
                        if(MessageBox.Action.YES === sAction){
                            oModel.remove(sPath, {
                                success: () => {
                                    MessageToast.show("Erfolgreich gelöscht");
                                },
                                error: (oError) => {
                                    MessageToast.show("Ein unbekannter Fehler ist aufgetreten!");
                                }
                            });
                        }
                    }
                });
            },

            onListItemPressed: function(oEvent){
                // 1. Welcher Kunde wurde ausgewählt:
                let sPath = oEvent.getSource().getBindingContext().getPath();

                // 2. Detailseite navigieren:
                let oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("RouteCustomer", {
                    path: encodeURIComponent(sPath)
                });
            }
            
        });
    });