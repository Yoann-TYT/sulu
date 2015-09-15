define(["services/sulumedia/media-manager","services/sulumedia/user-settings-manager","services/sulumedia/overlay-manager"],function(a,b,c){"use strict";var d={instanceName:"collection"},e={dropzoneSelector:".dropzone-container",toolbarSelector:".list-toolbar-container",datagridSelector:".datagrid-container"};return{layout:{navigation:{collapsed:!0},content:{width:"max"}},templates:["/admin/media/template/collection/files"],initialize:function(){if(this.options=this.sandbox.util.extend(!0,{},d,this.options),this.bindDatagridEvents(),this.bindDropzoneEvents(),this.bindOverlayEvents(),this.bindManagerEvents(),this.bindListToolbarEvents(),this.render(),this.sandbox.sulu.viewStates["media-file-edit-id"]){var a=this.sandbox.sulu.viewStates["media-file-edit-id"];c.startEditMediaOverlay.call(this,a,b.getMediaLocale()),delete this.sandbox.sulu.viewStates["media-file-edit-id"]}},bindDatagridEvents:function(){this.sandbox.on("husky.datagrid.download-clicked",function(b){a.loadOrNew(b).then(function(a){this.sandbox.dom.window.location.href=a.versions[a.version].url}.bind(this))}.bind(this)),this.sandbox.on("husky.datagrid.number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"media-move",!1),this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"editSelected",!1),this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"delete",!1)}.bind(this))},bindDropzoneEvents:function(){this.sandbox.on("husky.dropzone."+this.options.instanceName+".success",function(a,b){this.sandbox.emit("sulu.labels.success.show","labels.success.media-upload-desc","labels.success"),this.sandbox.emit("husky.datagrid.records.add",[b])},this)},bindManagerEvents:function(){this.sandbox.on("sulu.medias.media.deleted",function(a){this.sandbox.emit("husky.datagrid.record.remove",a)}.bind(this)),this.sandbox.on("sulu.medias.media.moved",function(a){this.sandbox.emit("husky.datagrid.record.remove",a),this.sandbox.emit("husky.data-navigation.collections.reload")}.bind(this)),this.sandbox.on("sulu.medias.media.saved",function(a,c){c.locale&&c.locale!==b.getMediaLocale()||this.sandbox.emit("husky.datagrid.records.change",c)}.bind(this))},bindOverlayEvents:function(){this.sandbox.on("sulu.collection-select.move-media.selected",this.moveMedia.bind(this)),this.sandbox.on("sulu.collection-add.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-edit.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-collection.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-media.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.media-edit.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.permission-settings.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-add.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-edit.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-collection.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-media.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.media-edit.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.permission-settings.closed",this.enableDropzone.bind(this))},bindListToolbarEvents:function(){this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".show-popup")}.bind(this)),this.sandbox.on("sulu.list-toolbar.delete",function(){this.deleteMedia()}.bind(this)),this.sandbox.on("sulu.list-toolbar.edit",function(){this.editMedia()}.bind(this)),this.sandbox.on("sulu.list-toolbar.media-move",function(){c.startMoveMediaOverlay.call(this,this.options.id,b.getMediaLocale())}.bind(this)),this.sandbox.on("sulu.toolbar.change.table",function(){b.setMediaListView("table"),this.sandbox.emit("husky.datagrid.view.change","table")}.bind(this)),this.sandbox.on("sulu.toolbar.change.masonry",function(){b.setMediaListView("datagrid/decorators/masonry-view"),this.sandbox.emit("husky.datagrid.view.change","datagrid/decorators/masonry-view")}.bind(this))},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/media/template/collection/files")),this.startDropzone(),this.startDatagrid()},startDatagrid:function(){this.sandbox.sulu.initListToolbarAndList.call(this,"media","/admin/api/media/fields",{el:this.$find(e.toolbarSelector),instanceName:this.options.instanceName,template:this.sandbox.sulu.buttons.get({add:{options:{"class":null,callback:function(){this.sandbox.emit("sulu.list-toolbar.add")}.bind(this)}},editSelected:{options:{callback:function(){this.sandbox.emit("sulu.list-toolbar.edit")}.bind(this)}},deleteSelected:{options:{callback:function(){this.sandbox.emit("sulu.list-toolbar.delete")}.bind(this)}},settings:{options:{dropdownItems:[{id:"media-move",title:this.sandbox.translate("sulu.media.move"),callback:function(){this.sandbox.emit("sulu.list-toolbar.media-move")}.bind(this)},{type:"columnOptions"}]}},mediaDecoratorDropdown:{}})},{el:this.$find(e.datagridSelector),url:"/admin/api/media?orderBy=media.changed&orderSort=DESC&locale="+b.getMediaLocale()+"&collection="+this.options.id,view:b.getMediaListView(),resultKey:"media",sortable:!1,actionCallback:function(a){this.sandbox.emit("husky.datagrid.select.item",a),this.editMedia()}.bind(this),viewOptions:{table:{actionIconColumn:"name"}}})},startDropzone:function(){this.sandbox.start([{name:"dropzone@husky",options:{el:this.$find(e.dropzoneSelector),url:"/admin/api/media?collection="+this.options.id,method:"POST",paramName:"fileVersion",instanceName:this.options.instanceName}}])},moveMedia:function(b){this.sandbox.emit("husky.datagrid.items.get-selected",function(c){a.move(c,b.id)}.bind(this))},editMedia:function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){c.startEditMediaOverlay.call(this,a,b.getMediaLocale())}.bind(this))},deleteMedia:function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(b){this.sandbox.sulu.showDeleteDialog(function(c){c&&a["delete"](b)}.bind(this))}.bind(this))},disableDropzone:function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".disable")},enableDropzone:function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".enable")}}});