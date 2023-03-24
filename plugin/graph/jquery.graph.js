/********************************************
**	グラフを描画する為のプラグイン
**	
**	options = {
**			items:{
**				ask:{
**					label:'購入価格', 
**					values:{
**						4:0, 
**						5:1, 
**						6:2, 
**						10:6, 
**						11:7, 
**						12:8, 
**						13:9, 
**						14:10 
**					}, 
**					color:'#F00', 
**					lineStyle:[2, 2], 
**					weight:1, 
**					strong:{
**						6:{
**							end:11, 
**							color:'#0F0', 
**							weight:5, 
**							lineStyle:[2, 2] 
**						} 
**					}, 
**					eventTriggerClassName:'pl_graph_event_trigger_ask', 
**					event:[
**						{
**							label:6, 
**							args:[], 
**							callback:{
**								click:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseover:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseout:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								} 
**							}
**						}, 
**						{
**							label:13, 
**							args:[], 
**							callback:{
**								click:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseover:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseout:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								} 
**							}
**						}
**					] 
**				}, 
**				bid:{
**					label:'売却価格', 
**					values:{
**						4:1, 
**						5:2, 
**						6:3, 
**						10:7, 
**						11:8, 
**						12:9, 
**						13:10, 
**						14:11 
**					}, 
**					color:'#00F', 
**					lineStyle:[2, 2], 
**					weight:1, 
**					eventTriggerClassName:'pl_graph_event_trigger_bid', 
**					event:[
**						{
**							label:7, 
**							args:[], 
**							callback:{
**								click:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseover:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseout:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								} 
**							}
**						}, 
**						{
**							label:8, 
**							args:[], 
**							callback:{
**								click:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseover:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								}, 
**								mouseout:function(e, pos, keyItems, keyVerticalLabel, value){
**									console.log([pos, keyItems, keyVerticalLabel, value]);
**								} 
**							}
**						}
**					] 
**				} 
**			}, 
**			marks:{
**				long:{
**					value:7, 
**					color:'#FF0', 
**					backgroundColor:'#CC0', 
**					weight:3, 
**					borderColor:'#CC0', 
**					style:[5, 5], 
**					label:'買う実行' 
**				}, 
**				short:{
**					value:20, 
**					color:'#FFF', 
**					backgroundColor:'#C00', 
**					weight:1, 
**					borderColor:'#C00', 
**					style:[5, 5], 
**					label:'売る実行' 
**				} 
**			}, 
**			verticalLine:{
**				6:{
**					color:'#FFF', 
**					backgroundColor:'#C00', 
**					weight:1, 
**					borderColor:'#C00', 
**					style:[5, 5], 
**					label:'分割線1' 
**				}, 
**				10:{
**					color:'#FF0', 
**					backgroundColor:'#CC0', 
**					weight:3, 
**					borderColor:'#CC0', 
**					style:[5, 5], 
**					label:'分割線2' 
**				} 
**			}, 
**			//▼itemの配列番号と合わせる
**			verticalLabel:{
**				4:'a4', 
**				5:'a5', 
**				6:'a6', 
**				10:'a10', 
**				11:'a11', 
**				12:'a12', 
**				13:'a13', 
**				14:'a14' 
**			}, 
**			callbackWheelZoomStart:function(vector){
**				eleGraph1.trigger(
**					'graph.zoom', 
**					vector 
**				);
**			}, 
**			callbackWheelZoomEnd:(vector) => {}, 
**			callbackMousemoveShiftStart:function(vector){
**				eleGraph1.trigger(
**					'graph.shift', 
**					vector 
**				);
**			}, 
**			callbackMousemoveShiftEnd:(vector) => {}, 
**			callbackMousemoveDefault:function(x, y){
**				eleGraph1.trigger(
**					'graph.grid', 
**					x, 
**					y 
**				);
**			}, 
**			callbackMouseoutDefault:function(){
**				eleGraph1.trigger(
**					'graph.clear', 
**					[[2]] 
**				);
**			}, 
**			callbackMousedown:function(){
**				eleGraph1.trigger(
**					'graph.clear', 
**					[[2]] 
**				);
**			} 
**		}
*******************************************/

(function($){
	const 
	//設定初期値用変数
	defaults = {
		noSupportMsg:'グラフを表示するには、canvasタグをサポートしたブラウザが必要です。', 
		windowResizeTime:200, 
		fontFamily:'"ＭＳ ゴシック"', 
		fontSize:14, 
		defaultColor:'#000', 
		defaultWeight:1, 
		defaultStrongColor:'#F00', 
		defaultStrongWeight:3, 
		canvasRatio:1.2, 
		maxValue:false, 
		minValue:false, 
		items:{}, 
		itemsHide:[], 
		itemsHideFlagClose:false, 
		itemsNaviDisplay:true, 
		itemNaviColorText:'■', 
		marks:{}, 
		marksHide:[], 
		marksHideFlagClose:false, 
		marksNaviDisplay:true, 
		marksNaviColorText:'■', 
		verticalLine:{}, 
		verticalLineDisplay:true, 
		verticalLineHide:[], 
		verticalLineHideFlagClose:false, 
		verticalLineNaviColorText:'■', 
		graphEventTriggerClassName:'pl_graph_event_trigger', 
		verticalLabelDisplay:true, 
		verticalLabel:{}, 
		verticalLabelMargin:20, 
		verticalLabelColor:'#333', 
		verticalLabelScaleHeight:5, 
		sideNumberDisplay:true, 
		sideNumberUnit:'', 
		sideNumberImpressions:8, 
		sideNumberColor:'#333', 
		sideNumberIndent:10, 
		sideNumberScaleWidth:5, 
		sideNumberRulerColor:'#CCC', 
		sideNumberRulerStyle:[2, 2], 
		sideNumberRulerWeight:1, 
		cursorRulerBorderColor:'#666', 
		cursorRulerStyle:[5, 5], 
		cursorRulerColor:'#FFF', 
		cursorRulerBackgroundColor:'#666', 
		cursorRulerPadding:20, 
		cursorRulerVerticalLabelPositionRange:10, 
		displayItemsShowCount:2, 
		displayItemsZoomIncrementRatio:0.1, 
		displayItemsShiftCount:0, 
		displayItemsShiftMovementWidthCount:20, 
		callbackWheelZoomStart:(vector) => {}, 
		callbackWheelZoomEnd:(vector) => {}, 
		callbackMousemoveShiftStart:(vector) => {}, 
		callbackMousemoveShiftEnd:(vector) => {}, 
		callbackTouchstart:() => {}, 
		callbackTouchmoveStart:(vector) => {}, 
		callbackTouchmoveEnd:(vector) => {}, 
		callbackZoomMinItem:() => {}, 
		callbackZoomMaxItem:() => {}, 
		callbackShiftFirstItem:() => {}, 
		callbackShiftLastItem:() => {}, 
		callbackMousemoveDefault:(x, y) => {}, 
		callbackMouseoutDefault:() => {}, 
		callbackMousedown:() => {} 
	}, 
	//セレクタ指定用変数
	selectorRule = {
		id:'#', 
		class:'.' 
	}, 
	//全対象セレクタ用変数
	varGlobal = {
		displayItemsShowMinCount:2, 
		fontRatio:0.54, 
		defaultLineDash:[100, 0] 
	};
	$.fn.graph = function(options){
		let 
		configs = {}, 
		el = this, 
		lenEl = el.length;
		if(lenEl === 0)
		return this;
		if(lenEl > 1){
			el.each(function(){
				$(this).graph(options);
			});
			return this;
		}
		let 
		//各対象セレクタ用変数
		varLocal = {
			windowResizeTimer:0, 
			graphWidth:0, 
			graphWidthRatio:0, 
			graphHeight:0, 
			graphHeightRatio:0, 
			graphInnerHeight:0, 
			graphMarginTop:0, 
			graphMarginBottom:0, 
			itemsHide:[], 
			marksHide:[], 
			verticalLineHide:[], 
			itemsLimitValue:{
				min:Infinity, 
				max:Number.NEGATIVE_INFINITY, 
				difference:0 
			}, 
			verticalLabelWidthRatio:0, 
			verticalLabelHeightRatio:0, 
			verticalLabel:{}, 
			verticalLabelPosition:{}, 
			verticalLabelMaxOuterWidth:0, 
			verticalLabelCount:0, 
			sideNumberWidthRatio:0, 
			sideNumberHeightRatio:0, 
			verticalLineWidthRatio:0, 
			verticalLineHeightRatio:0, 
			displayItemsShiftCount:0, 
			displayItemsShowCount:0 
		}, 
		//初期実行用関数
		funcInit = () => {
			configs = $.extend(
				{}, 
				defaults, 
				options 
			);
			funcPutElementsParent();
			funcPutVarLocalInit();
			funcPutVarLocal();
			funcPutSideNumber();
			funcPutVerticalLabel();
			funcPutGraph();
			funcPutMark();
			funcPutVerticalLine();
			funcAddEventListener0();
			funcCustomEvents();
			funcDestructor();
		}, 
		//不要メモリー開放用関数
		funcDestructor = () => {
			lenEl = 
			funcInit = 
			funcPutElementsParent = 
			funcAddEventListener0 = 
			funcCustomEvents = 
			funcDestructor = void 0;
		}, 
		//グラフプラグイン削除用関数
		funcDestroy = () => {
			$(window).off('resize.graph');
			el
			.empty()
			.off();
		}, 
		//カスタムイベント追加用関数
		funcCustomEvents = () => {
			el.on({
				'graph.addItems':(
					e, 
					args 
				) => {
					const 
					currentLabel = funcGetCurrentLabel();
					funcPutConfigsAddItems(
						args, 
						currentLabel 
					);
					funcResetGraph();
				}, 
				'graph.reset':(
					e, 
					args 
				) => {
					configs = $.extend(
						{}, 
						configs, 
						args.configs 
					);
					if(args.flagVarLocalInit)
					funcPutVarLocalInit();
					funcResetGraph();
				}, 
				'graph.itemHide':(
					e, 
					item 
				) => {
					funcItemHide(item);
				}, 
				'graph.itemShow':(
					e, 
					item 
				) => {
					funcItemShow(item);
				}, 
				'graph.itemToggle':(
					e, 
					item 
				) => {
					funcItemToggle(item);
				}, 
				'graph.markHide':(
					e, 
					mark 
				) => {
					funcMarkHide(mark);
				}, 
				'graph.markShow':(
					e, 
					mark 
				) => {
					funcMarkShow(mark);
				}, 
				'graph.markToggle':(
					e, 
					mark 
				) => {
					funcMarkToggle(mark);
				}, 
				'graph.verticalLineHide':(
					e, 
					verticalLine 
				) => {
					funcVerticalLineHide(verticalLine);
				}, 
				'graph.verticalLineShow':(
					e, 
					verticalLine 
				) => {
					funcVerticalLineShow(verticalLine);
				}, 
				'graph.verticalLineToggle':(
					e, 
					verticalLine 
				) => {
					funcVerticalLineToggle(verticalLine);
				}, 
				'graph.zoom':(
					e, 
					vector 
				) => {
					funcZoomGraph(vector);
				}, 
				'graph.shift':(
					e, 
					vector 
				) => {
					const 
					shiftSliceCount = configs.displayItemsShiftMovementWidthCount > varLocal.displayItemsShowCount?varLocal.displayItemsShowCount:configs.displayItemsShiftMovementWidthCount, 
					shiftCount = Math.floor(varLocal.displayItemsShowCount / shiftSliceCount);
					funcShiftGraph(
						vector, 
						shiftCount 
					);
				}, 
				'graph.grid':(
					e, 
					x, 
					y 
				) => {
					funcPutGridLine(
						x, 
						y 
					);
				}, 
				'graph.clear':(
					e, 
					arrLayer 
				) => {
					funcClearCanvas(arrLayer);
				}, 
				'graph.destroy':(e) => {
					funcDestroy();
				} 
			});
		}, 
		//カンマを使用した数値フォーマット変換用関数
		funcNumberFormat = (number) => {
			number = number.toString();
			const 
			arrNumber = number.split('.');
			return arrNumber[0].replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,') + (typeof arrNumber[1] === 'string'?'.' + arrNumber[1]:'');
		}, 
		//カーソルの位置からラベル取得用関数
		funcVerticalLabelPositionObjectKey = (
			verticalLabel, 
			cursorPosX 
		) => {
			for(var key in verticalLabel){
				if(
					verticalLabel[key] >= cursorPosX - configs.cursorRulerVerticalLabelPositionRange && 
					verticalLabel[key] < cursorPosX + configs.cursorRulerVerticalLabelPositionRange 
				)
				return key;
			}
			return false;
		}, 
		//グラフの値の最小値と最大値取得用関数
		funcGetItemsLimitValue = () => {
			let 
			itemsLimitValue = {
				min:Infinity, 
				max:Number.NEGATIVE_INFINITY, 
				difference:0 
			};
			for(var keyItems in configs.items){
				if(
					varLocal.itemsHideFlagClose && 
					$.inArray(keyItems, varLocal.itemsHide) !== -1 
				)
				continue;
				for(var keyVerticalLabel in varLocal.verticalLabel){
					if(
						typeof configs.items[keyItems].values === 'undefined' || 
						typeof configs.items[keyItems].values[keyVerticalLabel] === 'undefined' 
					)
					continue;
					const 
					itemValue = parseFloat(configs.items[keyItems].values[keyVerticalLabel]);
					if(itemsLimitValue.min > itemValue)
					itemsLimitValue.min = itemValue;
					if(itemsLimitValue.max < itemValue)
					itemsLimitValue.max = itemValue;
				}
			}
			for(var keyMarks in configs.marks){
				if(
					varLocal.marksHideFlagClose && 
					$.inArray(keyMarks, varLocal.marksHide) !== -1 
				)
				continue;
				const 
				markValue = parseFloat(configs.marks[keyMarks].value);
				if(itemsLimitValue.min > markValue)
				itemsLimitValue.min = markValue;
				if(itemsLimitValue.max < markValue)
				itemsLimitValue.max = markValue;
			}
			if(configs.minValue !== false)
			itemsLimitValue.min = configs.minValue;
			if(configs.maxValue !== false)
			itemsLimitValue.max = configs.maxValue;
			if(itemsLimitValue.min === itemsLimitValue.max)
			itemsLimitValue.max++;
			itemsLimitValue.difference = itemsLimitValue.max - itemsLimitValue.min;
			return itemsLimitValue;
		}, 
		//文字列バイト数取得用関数
		funcGetStringByte = (string) => {
			let 
			len = 0;
			for(var i = 0, l = string.length;i < l;++i)
			len += string[i].match(/[ -~]/)?1:2;
			return len;
		}, 
		//文字の幅取得用関数
		funcGetStrOuterWidth = (
			verticalLabelByte, 
			margin 
		) => {
			return (verticalLabelByte * configs.fontSize * varGlobal.fontRatio) + (margin * 2);
		}, 
		funcGetVerticalLabelMaxOuterWidth = () => {
			let 
			verticalLabelMaxByte = 0;
			for(var keyVerticalLabel in varLocal.verticalLabel){
				let 
				verticalLabelByte = funcGetStringByte(varLocal.verticalLabel[keyVerticalLabel]);
				if(verticalLabelMaxByte < verticalLabelByte)
				verticalLabelMaxByte = verticalLabelByte;
			}
			return funcGetStrOuterWidth(verticalLabelMaxByte, configs.verticalLabelMargin);
		}, 
		funcGetVerticalLabelCount = () => {
			return Math.floor(varLocal.graphWidth / varLocal.verticalLabelMaxOuterWidth);
		}, 
		//object型のデータ分割用関数
		funcSliceObject = (
			object, 
			start, 
			end 
		) => {
			let 
			newObject = {}, 
			arrValuesObject = Object.values(object).slice(start, end), 
			arrKeysObject = Object.keys(object).slice(start, end);
			for(var i = 0, l = arrValuesObject.length;i < l;++i)
			newObject[arrKeysObject[i]] = arrValuesObject[i];
			return newObject;
		}, 
		funcGetSliceVerticalLabel = () => {
			const 
			lenVerticalLabel = Object.values(configs.verticalLabel).length, 
			objectEnd = lenVerticalLabel - varLocal.displayItemsShiftCount, 
			objectStart = objectEnd - varLocal.displayItemsShowCount;
			return funcSliceObject(
				configs.verticalLabel, 
				objectStart, 
				objectEnd 
			);
		}, 
		//マウスホイール実行取得用関数
		funcGetWheelDelta = (e) => {
			return e.originalEvent.deltaY?-(e.originalEvent.deltaY):e.originalEvent.wheelDelta?e.originalEvent.wheelDelta:-(e.originalEvent.detail);
		}, 
		//イベントリスナー追加用関数0
		funcAddEventListener0 = () => {
			const 
			win = $(window), 
			elePlGraphLayer2 = $('> .pl_graph_parent:eq(0) > canvas:nth-of-type(2)', el), 
			eventPlGraphLayer2 = {
				mousemove:{
					default:(e) => {
						configs.callbackMousemoveDefault(
							e.offsetX, 
							e.offsetY 
						);
						funcPutGridLine(
							e.offsetX, 
							e.offsetY 
						);
					} 
				}, 
				mouseout:{
					default:(e) => {
						configs.callbackMouseoutDefault();
						funcClearCanvas([2]);
					} 
				}, 
				mouseup:{
					shift:() => {
						elePlGraphLayer2
						.off('mousemove.shift mouseup.shift mouseout.shift')
						.on({
							'mousemove.default':eventPlGraphLayer2.mousemove.default, 
							'mouseout.default':eventPlGraphLayer2.mouseout.default 
						});
					} 
				} 
			};
			elePlGraphLayer2
			.on({
				'mousemove.default':eventPlGraphLayer2.mousemove.default, 
				'mouseout.default':eventPlGraphLayer2.mouseout.default, 
				'wheel':(e) => {
					e.preventDefault();
					const 
					vector = funcGetWheelDelta(e) < 0?'down':'up';
					configs.callbackWheelZoomStart(vector);
					funcZoomGraph(vector);
					configs.callbackWheelZoomEnd(vector);
				}, 
				'gesturemove':(e) => {
					e.preventDefault();
					const 
					vector = e.scale < 1?'down':'up';
					configs.callbackWheelZoomStart(vector);
					funcZoomGraph(vector);
					configs.callbackWheelZoomEnd(vector);
				}, 
				'mousedown':(e) => {
					configs.callbackMousedown();
					let 
					cursorPosInitX = e.clientX, 
					shiftSliceCount = configs.displayItemsShiftMovementWidthCount > varLocal.displayItemsShowCount?varLocal.displayItemsShowCount:configs.displayItemsShiftMovementWidthCount, 
					movementWidth = varLocal.graphWidth / shiftSliceCount, 
					verticalLabelSizeNext = movementWidth, 
					verticalLabelSizePrev = verticalLabelSizeNext * -1, 
					shiftCount = Math.floor(varLocal.displayItemsShowCount / shiftSliceCount);
					funcClearCanvas([2]);
					elePlGraphLayer2
					.off('mousemove.default mouseout.default')
					.on({
						'mousemove.shift':(e) => {
							const 
							cursorPositionDifferenceX = e.clientX - cursorPosInitX;
							if(cursorPositionDifferenceX <= verticalLabelSizePrev){
								const 
								vector = 'down';
								configs.callbackMousemoveShiftStart(vector);
								funcShiftGraph(
									vector, 
									shiftCount 
								);
								configs.callbackMousemoveShiftEnd(vector);
								cursorPosInitX = e.clientX;
							}else 
							if(cursorPositionDifferenceX >= verticalLabelSizeNext){
								const 
								vector = 'up';
								configs.callbackMousemoveShiftStart(vector);
								funcShiftGraph(
									vector, 
									shiftCount 
								);
								configs.callbackMousemoveShiftEnd(vector);
								cursorPosInitX = e.clientX;
							}
						}, 
						'mouseup.shift':eventPlGraphLayer2.mouseup.shift, 
						'mouseout.shift':eventPlGraphLayer2.mouseup.shift 
					});
				}, 
				'touchstart':(e) => {
					e.preventDefault();
					configs.callbackTouchstart();
					let 
					cursorPosInitX = e.originalEvent.changedTouches[0].screenX, 
					shiftSliceCount = configs.displayItemsShiftMovementWidthCount > varLocal.displayItemsShowCount?varLocal.displayItemsShowCount:configs.displayItemsShiftMovementWidthCount, 
					movementWidth = varLocal.graphWidth / shiftSliceCount, 
					verticalLabelSizeNext = movementWidth, 
					verticalLabelSizePrev = verticalLabelSizeNext * -1, 
					shiftCount = Math.floor(varLocal.displayItemsShowCount / shiftSliceCount);
					funcClearCanvas([2]);
					elePlGraphLayer2
					.on({
						'touchmove':(e) => {
							e.preventDefault();
							const 
							cursorPositionDifferenceX = e.originalEvent.changedTouches[0].screenX - cursorPosInitX;
							if(cursorPositionDifferenceX <= verticalLabelSizePrev){
								const 
								vector = 'down';
								configs.callbackTouchmoveStart(vector);
								funcShiftGraph(
									vector, 
									shiftCount 
								);
								configs.callbackTouchmoveEnd(vector);
								cursorPosInitX = e.originalEvent.changedTouches[0].screenX;
							}else 
							if(cursorPositionDifferenceX >= verticalLabelSizeNext){
								const 
								vector = 'up';
								configs.callbackTouchmoveStart(vector);
								funcShiftGraph(
									vector, 
									shiftCount 
								);
								configs.callbackTouchmoveEnd(vector);
								cursorPosInitX = e.originalEvent.changedTouches[0].screenX;
							}
						} 
					});
				} 
			});
			win.on({
				'resize.graph':() => {
					if(varLocal.windowResizeTimer > 0)
					clearTimeout(varLocal.windowResizeTimer);
					varLocal.windowResizeTimer = setTimeout(
						() => {
							funcResizeElementsCanvas();
							funcResetGraph();
						}, 
						configs.windowResizeTime 
					);
				} 
			});
		}, 
		//イベントリスナー追加用関数1
		funcAddEventListener1 = () => {
			const 
			elePlGraphItemNaviTrigger = $('.pl_graph_item_navi_trigger', el);
			elePlGraphItemNaviTrigger
			.on({
				'click':function(){
					const 
					dataItem = $(this).attr('data-item');
					funcItemToggle(dataItem);
				} 
			});
		}, 
		//イベントリスナー追加用関数2
		funcAddEventListener2 = () => {
			const 
			elePlGraphMarkNaviTrigger = $('.pl_graph_mark_navi_trigger', el);
			elePlGraphMarkNaviTrigger
			.on({
				'click':function(){
					const 
					dataMark = $(this).attr('data-mark');
					funcMarkToggle(dataMark);
				} 
			});
		}, 
		//イベントリスナー追加用関数3
		funcAddEventListener3 = () => {
			const 
			elePlGraphVerticalLineNaviTrigger = $('.pl_graph_vertical_line_navi_trigger', el);
			elePlGraphVerticalLineNaviTrigger
			.on({
				'click':function(){
					const 
					dataVerticalLine = $(this).attr('data-vertical-line');
					funcVerticalLineToggle(dataVerticalLine);
				} 
			});
		}, 
		//グラフ線非表示用関数
		funcItemHide = (item) => {
			const 
			keyItem = $.inArray(
				item, 
				varLocal.itemsHide 
			);
			if(
				keyItem !== -1 || 
				typeof configs.items[item] === 'undefined' 
			)
			return false;
			varLocal.itemsHide.push(item);
			funcResetGraph();
		}, 
		//グラフ線表示用関数
		funcItemShow = (item) => {
			const 
			keyItem = $.inArray(
				item, 
				varLocal.itemsHide 
			);
			if(keyItem === -1)
			return false;
			varLocal.itemsHide.splice(
				keyItem, 
				1 
			);
			funcResetGraph();
		}, 
		//グラフ線表示非表示切り替え用関数
		funcItemToggle = (item) => {
			const 
			keyItem = $.inArray(
				item, 
				varLocal.itemsHide 
			);
			if(keyItem === -1){
				varLocal.itemsHide.push(item);
			}else{
				varLocal.itemsHide.splice(
					keyItem, 
					1 
				);
			}
			funcResetGraph();
		}, 
		//マーク線非表示用関数
		funcMarkHide = (mark) => {
			const 
			keyMark = $.inArray(
				mark, 
				varLocal.marksHide 
			);
			if(
				keyMark !== -1 || 
				typeof configs.marks[mark] === 'undefined' 
			)
			return false;
			varLocal.marksHide.push(mark);
			funcResetGraph();
		}, 
		//マーク線表示用関数
		funcMarkShow = (mark) => {
			const 
			keyMark = $.inArray(
				mark, 
				varLocal.marksHide 
			);
			if(keyMark === -1)
			return false;
			varLocal.marksHide.splice(
				keyMark, 
				1 
			);
			funcResetGraph();
		}, 
		//マーク線表示非表示切り替え用関数
		funcMarkToggle = (mark) => {
			const 
			keyMark = $.inArray(
				mark, 
				varLocal.marksHide 
			);
			if(keyMark === -1){
				varLocal.marksHide.push(mark);
			}else{
				varLocal.marksHide.splice(
					keyMark, 
					1 
				);
			}
			funcResetGraph();
		}, 
		//縦線非表示用関数
		funcVerticalLineHide = (verticalLine) => {
			const 
			keyVerticalLine = $.inArray(
				verticalLine, 
				varLocal.verticalLineHide 
			);
			if(
				keyVerticalLine !== -1 || 
				typeof configs.verticalLines[verticalLine] === 'undefined' 
			)
			return false;
			varLocal.verticalLineHide.push(verticalLine);
			funcResetGraph();
		}, 
		//縦線表示用関数
		funcVerticalLineShow = (verticalLine) => {
			const 
			keyVerticalLine = $.inArray(
				verticalLine, 
				varLocal.verticalLineHide 
			);
			if(keyVerticalLine === -1)
			return false;
			varLocal.verticalLineHide.splice(
				keyVerticalLine, 
				1 
			);
			funcResetGraph();
		}, 
		//縦線表示非表示切り替え用関数
		funcVerticalLineToggle = (verticalLine) => {
			const 
			keyVerticalLine = $.inArray(
				verticalLine, 
				varLocal.verticalLineHide 
			);
			if(keyVerticalLine === -1){
				varLocal.verticalLineHide.push(verticalLine);
			}else{
				varLocal.verticalLineHide.splice(
					keyVerticalLine, 
					1 
				);
			}
			funcResetGraph();
		}, 
		//グラフ拡大縮小用関数
		funcZoomGraph = (vector) => {
			const 
			lenVerticalLabel = Object.values(configs.verticalLabel).length, 
			displayItemsShowLimit = lenVerticalLabel - varLocal.displayItemsShiftCount, 
			zoomIncrement = Math.floor(varLocal.displayItemsShowCount * configs.displayItemsZoomIncrementRatio), 
			newDisplayItemsShowCount = varLocal.displayItemsShowCount + ((vector === 'up'?-1:1) * (zoomIncrement < 1?1:zoomIncrement));
			if(newDisplayItemsShowCount < varGlobal.displayItemsShowMinCount){
				varLocal.displayItemsShowCount = varGlobal.displayItemsShowMinCount;
				funcResetGraph();
				configs.callbackZoomMinItem();
				return false;
			}
			if(newDisplayItemsShowCount > displayItemsShowLimit){
				varLocal.displayItemsShowCount = displayItemsShowLimit;
				funcResetGraph();
				configs.callbackZoomMaxItem();
				return false;
			}
			varLocal.displayItemsShowCount = newDisplayItemsShowCount;
			funcResetGraph();
		}, 
		//グラフ横移動用関数
		funcShiftGraph = (
			vector, 
			shiftCount 
		) => {
			const 
			lenVerticalLabel = Object.values(configs.verticalLabel).length, 
			displayItemsShiftLimit = lenVerticalLabel - varLocal.displayItemsShowCount, 
			newDisplayItemsShiftCount = varLocal.displayItemsShiftCount + (shiftCount * (vector === 'up'?1:-1));
			if(newDisplayItemsShiftCount > displayItemsShiftLimit){
				varLocal.displayItemsShiftCount = displayItemsShiftLimit;
				funcResetGraph();
				configs.callbackShiftFirstItem();
				return false;
			}
			if(newDisplayItemsShiftCount < 0){
				varLocal.displayItemsShiftCount = 0;
				funcResetGraph();
				configs.callbackShiftLastItem();
				return false;
			}
			varLocal.displayItemsShiftCount = newDisplayItemsShiftCount;
			funcResetGraph();
		}, 
		//グラフリセット用関数
		funcResetGraph = () => {
			funcPutVarLocal();
			funcClearCanvas();
			funcClearEvent();
			funcPutSideNumber();
			funcPutVerticalLabel();
			funcPutGraph();
			funcPutMark();
			funcPutVerticalLine();
			funcPutElementsItemNavi();
			funcPutElementsMarkNavi();
			funcPutElementsVerticalLineNavi();
		}, 
		//グラフ線のナビ設置用関数
		funcPutElementsItemNavi = () => {
			if(configs.itemsNaviDisplay === false)
			return false;
			const 
			elePlGraphItemNaviList = $('.pl_graph_item_navi_list', el).eq(0);
			elePlGraphItemNaviList.empty();
			for(var keyItems in configs.items){
				let 
				itemColor = typeof configs.items[keyItems].color === 'undefined'?configs.defaultColor:configs.items[keyItems].color;
				elePlGraphItemNaviList.append('\
					<li>\
						<span class="pl_graph_item_navi_trigger" data-item="' + keyItems + '">\
							<span class="pl_graph_item_navi_item_color" style="color:' + itemColor + ';">\
								' + configs.itemNaviColorText + '\
							</span>\
							<label class="pl_graph_item_navi_label">\
								' + configs.items[keyItems].label + '\
							</label>\
						</span>\
					</li>\
				');
			}
			funcAddEventListener1();
		}, 
		//マーク線のナビ設置用関数
		funcPutElementsMarkNavi = () => {
			if(configs.marksNaviDisplay === false)
			return false;
			const 
			elePlGraphMarkNaviList = $('.pl_graph_mark_navi_list', el).eq(0);
			elePlGraphMarkNaviList.empty();
			for(var keyMarks in configs.marks){
				let 
				markColor = typeof configs.marks[keyMarks].borderColor === 'undefined'?configs.defaultColor:configs.marks[keyMarks].borderColor;
				elePlGraphMarkNaviList.append('\
					<li>\
						<span class="pl_graph_mark_navi_trigger" data-mark="' + keyMarks + '">\
							<span class="pl_graph_mark_navi_item_color" style="color:' + markColor + ';">\
								' + configs.marksNaviColorText + '\
							</span>\
							<label class="pl_graph_mark_navi_label">\
								' + configs.marks[keyMarks].label + '\
							</label>\
						</span>\
					</li>\
				');
			}
			funcAddEventListener2();
		}, 
		//縦線のナビ設置用関数
		funcPutElementsVerticalLineNavi = () => {
			if(configs.verticalLineDisplay === false)
			return false;
			const 
			elePlGraphVerticalLineNaviList = $('.pl_graph_vertical_line_navi_list', el).eq(0);
			elePlGraphVerticalLineNaviList.empty();
			for(var keyVerticalLine in configs.verticalLine){
				let 
				verticalLineColor = typeof configs.verticalLine[keyVerticalLine].borderColor === 'undefined'?configs.defaultColor:configs.verticalLine[keyVerticalLine].borderColor;
				elePlGraphVerticalLineNaviList.append('\
					<li>\
						<span class="pl_graph_vertical_line_navi_trigger" data-vertical-line="' + keyVerticalLine + '">\
							<span class="pl_graph_vertical_line_navi_item_color" style="color:' + verticalLineColor + ';">\
								' + configs.verticalLineNaviColorText + '\
							</span>\
							<label class="pl_graph_vertical_line_navi_label">\
								' + configs.verticalLine[keyVerticalLine].label + '\
							</label>\
						</span>\
					</li>\
				');
			}
			funcAddEventListener3();
		}, 
		//グラフの描写に必要な要素設置用関数
		funcPutElementsParent = () => {
			el.empty();
			if(configs.verticalLineDisplay)
			el.append('<div class="pl_graph_vertical_line_parent" />');
			el.append('<div class="pl_graph_parent" />');
			if(configs.sideNumberDisplay)
			el.append('<div class="pl_graph_side_number_parent" />');
			if(configs.verticalLabelDisplay)
			el.append('<div class="pl_graph_vertical_label_parent" />');
			if(configs.itemsNaviDisplay)
			el.append('\
				<div class="pl_graph_item_navi_parent">\
					<ul class="pl_graph_item_navi_list"></ul>\
				</div>\
			');
			if(configs.marksNaviDisplay)
			el.append('\
				<div class="pl_graph_mark_navi_parent">\
					<ul class="pl_graph_mark_navi_list"></ul>\
				</div>\
			');
			if(configs.verticalLineDisplay)
			el.append('\
				<div class="pl_graph_vertical_line_navi_parent">\
					<ul class="pl_graph_vertical_line_navi_list"></ul>\
				</div>\
			');
			const 
			elePlGraphParent = $('> .pl_graph_parent', el).eq(0), 
			graphWidth = elePlGraphParent.width(), 
			graphWidthRatio = graphWidth * configs.canvasRatio, 
			graphHeight = elePlGraphParent.height(), 
			graphHeightRatio = graphHeight * configs.canvasRatio;
			elePlGraphParent
			.empty()
			.append('\
				<canvas width="' + graphWidthRatio + '" height="' + graphHeightRatio + '" style="width:' + graphWidth + 'px; height:' + graphHeight + 'px;">\
					' + configs.noSupportMsg + '\
				</canvas>\
				<canvas width="' + graphWidthRatio + '" height="' + graphHeightRatio + '" style="width:' + graphWidth + 'px; height:' + graphHeight + 'px;"></canvas>\
			');
			if(configs.verticalLineDisplay){
				const 
				elePlGraphVerticalLineParent = $('> .pl_graph_vertical_line_parent', el).eq(0), 
				verticalLabelWidth = elePlGraphVerticalLineParent.width(), 
				verticalLabelWidthRatio = verticalLabelWidth * configs.canvasRatio, 
				verticalLabelHeight = elePlGraphVerticalLineParent.height(), 
				verticalLabelHeightRatio = verticalLabelHeight * configs.canvasRatio;
				elePlGraphVerticalLineParent
				.empty()
				.append('<canvas width="' + verticalLabelWidthRatio + '" height="' + verticalLabelHeightRatio + '" style="width:' + verticalLabelWidth + 'px; height:' + verticalLabelHeight + 'px;"></canvas>');
			}
			if(configs.sideNumberDisplay){
				const 
				elePlGraphSideNumberParent = $('> .pl_graph_side_number_parent', el).eq(0), 
				sideNumberWidth = elePlGraphSideNumberParent.width(), 
				sideNumberWidthRatio = sideNumberWidth * configs.canvasRatio, 
				sideNumberHeight = elePlGraphSideNumberParent.height(), 
				sideNumberHeightRatio = sideNumberHeight * configs.canvasRatio;
				elePlGraphSideNumberParent
				.empty()
				.append('\
					<canvas width="' + sideNumberWidthRatio + '" height="' + sideNumberHeightRatio + '" style="width:' + sideNumberWidth + 'px; height:' + sideNumberHeight + 'px;"></canvas>\
					<canvas width="' + sideNumberWidthRatio + '" height="' + sideNumberHeightRatio + '" style="width:' + sideNumberWidth + 'px; height:' + sideNumberHeight + 'px;"></canvas>\
				');
			}
			if(configs.verticalLabelDisplay){
				const 
				elePlGraphVerticalLabelParent = $('> .pl_graph_vertical_label_parent', el).eq(0), 
				verticalLabelWidth = elePlGraphVerticalLabelParent.width(), 
				verticalLabelWidthRatio = verticalLabelWidth * configs.canvasRatio, 
				verticalLabelHeight = elePlGraphVerticalLabelParent.height(), 
				verticalLabelHeightRatio = verticalLabelHeight * configs.canvasRatio;
				elePlGraphVerticalLabelParent
				.empty()
				.append('\
					<canvas width="' + verticalLabelWidthRatio + '" height="' + verticalLabelHeightRatio + '" style="width:' + verticalLabelWidth + 'px; height:' + verticalLabelHeight + 'px;"></canvas>\
					<canvas width="' + verticalLabelWidthRatio + '" height="' + verticalLabelHeightRatio + '" style="width:' + verticalLabelWidth + 'px; height:' + verticalLabelHeight + 'px;"></canvas>\
				');
			}
			funcPutElementsItemNavi();
			funcPutElementsMarkNavi();
			funcPutElementsVerticalLineNavi();
		}, 
		//canvasタグのリサイズ用関数
		funcResizeElementsCanvas = () => {
			const 
			elePlGraphParent = $('> .pl_graph_parent', el).eq(0), 
			elePlGraphCanvas = $('> canvas', elePlGraphParent), 
			graphWidth = elePlGraphParent.width(), 
			graphHeight = elePlGraphParent.height();
			elePlGraphCanvas
			.attr('width', graphWidth * configs.canvasRatio)
			.attr('height', graphHeight * configs.canvasRatio)
			.css({
				'width':graphWidth, 
				'height':graphHeight 
			});
			if(configs.verticalLineDisplay){
				const 
				elePlGraphVerticalLineParent = $('> .pl_graph_vertical_line_parent', el).eq(0), 
				elePlGraphVerticalLineCanvas = $('> canvas', elePlGraphVerticalLineParent), 
				verticalLineWidth = elePlGraphVerticalLineParent.width(), 
				verticalLineWidthRatio = verticalLineWidth * configs.canvasRatio, 
				verticalLineHeight = elePlGraphVerticalLineParent.height(), 
				verticalLineHeightRatio = verticalLineHeight * configs.canvasRatio;
				elePlGraphVerticalLineCanvas
				.attr('width', verticalLineWidthRatio)
				.attr('height', verticalLineHeightRatio)
				.css({
					'width':verticalLineWidth, 
					'height':verticalLineHeight 
				});
			}
			if(configs.sideNumberDisplay){
				const 
				elePlGraphSideNumberParent = $('> .pl_graph_side_number_parent', el).eq(0), 
				elePlGraphSideNumberCanvas = $('> canvas', elePlGraphSideNumberParent), 
				sideNumberWidth = elePlGraphSideNumberParent.width(), 
				sideNumberWidthRatio = sideNumberWidth * configs.canvasRatio, 
				sideNumberHeight = elePlGraphSideNumberParent.height(), 
				sideNumberHeightRatio = sideNumberHeight * configs.canvasRatio;
				elePlGraphSideNumberCanvas
				.attr('width', sideNumberWidthRatio)
				.attr('height', sideNumberHeightRatio)
				.css({
					'width':sideNumberWidth, 
					'height':sideNumberHeight 
				});
			}
			if(configs.verticalLabelDisplay){
				const 
				elePlGraphVerticalLabelParent = $('> .pl_graph_vertical_label_parent', el).eq(0), 
				elePlGraphVerticalLabelCanvas = $('> canvas', elePlGraphVerticalLabelParent), 
				verticalLabelWidth = elePlGraphVerticalLabelParent.width(), 
				verticalLabelWidthRatio = verticalLabelWidth * configs.canvasRatio, 
				verticalLabelHeight = elePlGraphVerticalLabelParent.height(), 
				verticalLabelHeightRatio = verticalLabelHeight * configs.canvasRatio;
				elePlGraphVerticalLabelCanvas
				.attr('width', verticalLabelWidthRatio)
				.attr('height', verticalLabelHeightRatio)
				.css({
					'width':verticalLabelWidth, 
					'height':verticalLabelHeight 
				});
			}
		}, 
		//現在表示されているラベル表示用関数
		funcGetCurrentLabel = () => {
			const 
			arrKeysVerticalLabel = Object.keys(varLocal.verticalLabel), 
			lenKeysVerticalLabel = arrKeysVerticalLabel.length, 
			currentIndex = (lenKeysVerticalLabel - 1) - varLocal.displayItemsShiftCount;
			return arrKeysVerticalLabel[currentIndex];
		}, 
		funcPutConfigsAddItems = (
			configsItems, 
			currentLabel 
		) => {
			configs.items = $.extend(
				{}, 
				configs.items, 
				configsItems.items 
			);
			configs.verticalLabel = $.extend(
				{}, 
				configs.verticalLabel, 
				configsItems.verticalLabel 
			);
			if(typeof configsItems.marks !== 'undefined')
			configs.marks = $.extend(
				{}, 
				configs.marks, 
				configsItems.marks 
			);
			const 
			arrKeysVerticalLabel = Object.keys(configs.verticalLabel), 
			lenKeysVerticalLabel = arrKeysVerticalLabel.length, 
			newDisplayItemsShiftCount = arrKeysVerticalLabel.lastIndexOf(currentLabel);
			if(varLocal.displayItemsShiftCount === 0){
				//next
				configs.displayItemsShiftCount = 
				varLocal.displayItemsShiftCount = (lenKeysVerticalLabel - 1) - (newDisplayItemsShiftCount === -1?0:newDisplayItemsShiftCount);
			}else{
				//prev
				configs.displayItemsShiftCount = newDisplayItemsShiftCount === -1?0:newDisplayItemsShiftCount;
			}
		}, 
		funcPutVarLocalInit = () => {
			varLocal.itemsHide = $.extend(
				[], 
				configs.itemsHide, 
				[] 
			);
			varLocal.marksHide = $.extend(
				[], 
				configs.marksHide, 
				[] 
			);
			varLocal.verticalLineHide = $.extend(
				[], 
				configs.verticalLineHide, 
				[] 
			);
			const 
			lenVerticalLabel = Object.values(configs.verticalLabel).length;
			if(0 >= lenVerticalLabel - configs.displayItemsShowCount - configs.displayItemsShiftCount){
				varLocal.displayItemsShiftCount = 0;
				varLocal.displayItemsShowCount = 0 > lenVerticalLabel - configs.displayItemsShowCount?lenVerticalLabel:configs.displayItemsShowCount;
			}else{
				varLocal.displayItemsShiftCount = configs.displayItemsShiftCount;
				varLocal.displayItemsShowCount = configs.displayItemsShowCount;
			}
		}, 
		funcPutVarLocal = () => {
			const 
			elePlGraph = $('> .pl_graph_parent:eq(0) > canvas', el).eq(0), 
			elePlGraphVerticalLabel = $('> .pl_graph_vertical_label_parent:eq(0) > canvas', el).eq(0), 
			elePlGraphSideNumber = $('> .pl_graph_side_number_parent:eq(0) > canvas', el).eq(0), 
			elePlGraphVerticalLine = $('> .pl_graph_vertical_line_parent:eq(0) > canvas', el).eq(0);
			//グラフ上部余白
			varLocal.graphMarginTop = configs.fontSize;
			//グラフ下部余白
			varLocal.graphMarginBottom = configs.fontSize;
			//グラフの横幅
			varLocal.graphWidth = elePlGraph.width();
			//グラフの横幅比率修正
			varLocal.graphWidthRatio = varLocal.graphWidth * configs.canvasRatio;
			//グラフの縦幅
			varLocal.graphHeight = elePlGraph.height();
			//グラフの縦幅比率修正
			varLocal.graphHeightRatio = varLocal.graphHeight * configs.canvasRatio;
			//グラフの縦幅余白無し
			varLocal.graphInnerHeight = varLocal.graphHeight - varLocal.graphMarginTop - varLocal.graphMarginBottom;
			//ラベルの横幅比率修正
			varLocal.verticalLabelWidthRatio = elePlGraphVerticalLabel.width() * configs.canvasRatio;
			//ラベルの縦幅比率修正
			varLocal.verticalLabelHeightRatio = elePlGraphVerticalLabel.height() * configs.canvasRatio;
			//ラベル
			varLocal.verticalLabel = funcGetSliceVerticalLabel();
			//ラベルの最大横幅
			varLocal.verticalLabelMaxOuterWidth = funcGetVerticalLabelMaxOuterWidth();
			//ラベルの表示数
			varLocal.verticalLabelCount = funcGetVerticalLabelCount();
			//サイド数値の横幅比率修正
			varLocal.sideNumberWidthRatio = elePlGraphSideNumber.width() * configs.canvasRatio;
			//サイド数値の縦幅比率修正
			varLocal.sideNumberHeightRatio = elePlGraphSideNumber.height() * configs.canvasRatio;
			//縦線の横幅比率修正
			varLocal.verticalLineWidthRatio = elePlGraphVerticalLine.width() * configs.canvasRatio;
			//縦線の縦幅比率修正
			varLocal.verticalLineHeightRatio = elePlGraphVerticalLine.height() * configs.canvasRatio;
			//アイテムの最小値・最大値
			varLocal.itemsLimitValue = funcGetItemsLimitValue();
		}, 
		//横側グラフ数値表記用関数
		funcPutSideNumber = () => {
			if(configs.sideNumberDisplay === false)
			return false;
			const 
			elePlGraphSideNumber = $('> .pl_graph_side_number_parent:eq(0) > canvas', el), 
			elePlGraph = $('> .pl_graph_parent:eq(0) > canvas', el);
			if(
				!elePlGraphSideNumber.get(0).getContext || 
				!elePlGraph.get(0).getContext 
			)
			return false;
			let 
			canvasSideNumber = elePlGraphSideNumber.get(0).getContext('2d'), 
			canvasGraph = elePlGraph.get(0).getContext('2d'), 
			sideNumberSize = varLocal.graphInnerHeight / configs.sideNumberImpressions, 
			i = 0, 
			sideNumberIncremental = varLocal.itemsLimitValue.difference / configs.sideNumberImpressions, 
			sideNumber = varLocal.itemsLimitValue.min;
			
			canvasSideNumber.font = configs.fontSize + 'px ' + configs.fontFamily;
			canvasSideNumber.fillStyle = configs.sideNumberColor;
			canvasSideNumber.strokeStyle = configs.sideNumberColor;
			canvasGraph.fillStyle = configs.sideNumberRulerColor;
			canvasGraph.strokeStyle = configs.sideNumberRulerColor;
			canvasGraph.lineWidth = configs.sideNumberRulerWeight;
			if(canvasGraph.setLineDash !== undefined){
				canvasGraph.setLineDash(configs.sideNumberRulerStyle);
			}else
			if(canvasGraph.mozDash !== undefined){
				canvasGraph.mozDash = configs.sideNumberRulerStyle;
			}
			while(sideNumber <= varLocal.itemsLimitValue.max){
				let 
				positionYSideNumber = ((varLocal.graphHeight - varLocal.graphMarginBottom) - i * sideNumberSize) * configs.canvasRatio;
				//数値表記
				canvasSideNumber.fillText(
					funcNumberFormat(sideNumber) + configs.sideNumberUnit, 
					configs.sideNumberIndent, 
					positionYSideNumber 
				);
				//数値位置
				canvasSideNumber.beginPath();
				canvasSideNumber.moveTo(0, positionYSideNumber);
				canvasSideNumber.lineTo(configs.sideNumberScaleWidth, positionYSideNumber);
				canvasSideNumber.stroke();
				
				//定規
				canvasGraph.beginPath();
				canvasGraph.moveTo(0, positionYSideNumber);
				canvasGraph.lineTo(varLocal.graphWidthRatio, positionYSideNumber);
				canvasGraph.stroke();
				
				sideNumber += sideNumberIncremental;
				++i;
			}
			if(canvasGraph.setLineDash !== undefined){
				canvasGraph.setLineDash(varGlobal.defaultLineDash);
			}else
			if(canvasGraph.mozDash !== undefined){
				canvasGraph.mozDash = varGlobal.defaultLineDash;
			}
		}, 
		//ラベル表記用関数
		funcPutVerticalLabel = () => {
			let 
			elePlGraphVerticalLabel = $('> .pl_graph_vertical_label_parent:eq(0) > canvas', el), 
			lenVerticalLabel = Object.values(varLocal.verticalLabel).length, 
			verticalLabelSize = varLocal.graphWidth / lenVerticalLabel, 
			canvasVerticalLabel = elePlGraphVerticalLabel.get(0).getContext('2d'), 
			positionYVerticalLabel = (elePlGraphVerticalLabel.eq(0).height() / 2) + (configs.fontSize / 2), 
			i = 0, 
			skip = varLocal.verticalLabelCount === 0?0:Math.floor(lenVerticalLabel / varLocal.verticalLabelCount);
			
			if(
				configs.verticalLabelDisplay && 
				elePlGraphVerticalLabel.get(0).getContext 
			){
				canvasVerticalLabel.font = configs.fontSize + 'px ' + configs.fontFamily;
				canvasVerticalLabel.fillStyle = configs.verticalLabelColor;
				canvasVerticalLabel.strokeStyle = configs.verticalLabelColor;
			}
			//横軸の要素毎の位置初期化
			varLocal.verticalLabelPosition = {};
			for(var keyVerticalLabel in varLocal.verticalLabel){
				let 
				positionXVerticalLabel = i * verticalLabelSize * configs.canvasRatio;
				if(
					configs.verticalLabelDisplay && 
					elePlGraphVerticalLabel.get(0).getContext && 
					i !== 0 && (
						i % skip === 0 || 
						skip === 0 
					) 
				){
					//ラベル表記
					canvasVerticalLabel.fillText(
						varLocal.verticalLabel[keyVerticalLabel], 
						positionXVerticalLabel - (funcGetStrOuterWidth(funcGetStringByte(varLocal.verticalLabel[keyVerticalLabel]), configs.verticalLabelMargin) / 2) + configs.verticalLabelMargin, 
						positionYVerticalLabel 
					);
					//ラベル位置
					canvasVerticalLabel.beginPath();
					canvasVerticalLabel.moveTo(positionXVerticalLabel, 0);
					canvasVerticalLabel.lineTo(positionXVerticalLabel, configs.verticalLabelScaleHeight);
					canvasVerticalLabel.stroke();
				}
				//横軸の要素毎の位置保持
				varLocal.verticalLabelPosition[keyVerticalLabel] = positionXVerticalLabel;
				++i;
			}
		}, 
		//定規表記用関数
		funcPutGridLine = (
			cursorPosX, 
			cursorPosY 
		) => {
			const 
			elePlGraphLayer2 = $('> .pl_graph_parent:eq(0) > canvas:nth-of-type(2)', el), 
			elePlSideNumberLayer2 = $('> .pl_graph_side_number_parent:eq(0) > canvas:nth-of-type(2)', el), 
			elePlVerticalLabelLayer2 = $('> .pl_graph_vertical_label_parent:eq(0) > canvas:nth-of-type(2)', el);
			
			//グラフ
			if(elePlGraphLayer2.get(0).getContext){
				const 
				canvasGraphLayer2 = elePlGraphLayer2.get(0).getContext('2d');
				
				canvasGraphLayer2.clearRect(0, 0, varLocal.graphWidthRatio, varLocal.graphHeightRatio);
				if(canvasGraphLayer2.setLineDash !== undefined){
					canvasGraphLayer2.setLineDash(configs.cursorRulerStyle);
				}else
				if(canvasGraphLayer2.mozDash !== undefined){
					canvasGraphLayer2.mozDash = configs.cursorRulerStyle;
				}
				canvasGraphLayer2.strokeStyle = configs.cursorRulerBorderColor;
				//縦線
				cursorPosX *= configs.canvasRatio;
				canvasGraphLayer2.beginPath();
				canvasGraphLayer2.moveTo(cursorPosX, 0);
				canvasGraphLayer2.lineTo(cursorPosX, varLocal.graphHeightRatio);
				canvasGraphLayer2.stroke();
				//横線
				cursorPosY *= configs.canvasRatio;
				canvasGraphLayer2.beginPath();
				canvasGraphLayer2.moveTo(0, cursorPosY);
				canvasGraphLayer2.lineTo(varLocal.graphWidthRatio, cursorPosY);
				canvasGraphLayer2.stroke();
				if(canvasGraphLayer2.setLineDash !== undefined){
					canvasGraphLayer2.setLineDash(varGlobal.defaultLineDash);
				}else
				if(canvasGraphLayer2.mozDash !== undefined){
					canvasGraphLayer2.mozDash = varGlobal.defaultLineDash;
				}
			}
			
			//サイド数値
			if(
				configs.sideNumberDisplay && 
				elePlSideNumberLayer2.get(0).getContext 
			){
				const 
				canvasSideNumberLayer2 = elePlSideNumberLayer2.get(0).getContext('2d'), 
				graphHeightRatio = varLocal.itemsLimitValue.difference / (varLocal.graphInnerHeight * configs.canvasRatio), 
				sideNumber = (((graphHeightRatio * cursorPosY) - varLocal.itemsLimitValue.max) - (graphHeightRatio * varLocal.graphMarginTop * configs.canvasRatio)) * -1, 
				rectWidth = funcGetStrOuterWidth(funcGetStringByte(funcNumberFormat(sideNumber)), configs.cursorRulerPadding), 
				rectHeight = configs.fontSize * 2;
				
				canvasSideNumberLayer2.clearRect(0, 0, varLocal.sideNumberWidthRatio, varLocal.sideNumberHeightRatio);
				//背景四角
		    	canvasSideNumberLayer2.beginPath();
				canvasSideNumberLayer2.fillStyle = configs.cursorRulerBackgroundColor;
				canvasSideNumberLayer2.strokeStyle = configs.cursorRulerBackgroundColor;
				canvasSideNumberLayer2.rect(
					0, 
					cursorPosY - rectHeight / 2, 
					rectWidth, 
					rectHeight 
				);
				canvasSideNumberLayer2.fill();
				//数値
				canvasSideNumberLayer2.font = configs.fontSize + 'px ' + configs.fontFamily;
				canvasSideNumberLayer2.fillStyle = configs.cursorRulerColor;
				//数値表記
				canvasSideNumberLayer2.fillText(
					funcNumberFormat(sideNumber) + configs.sideNumberUnit, 
					configs.sideNumberIndent, 
					cursorPosY + ((configs.fontSize * configs.canvasRatio) / 4) 
				);
				canvasSideNumberLayer2.stroke();
			}
			
			//ラベル
			if(
				configs.verticalLabelDisplay && 
				elePlVerticalLabelLayer2.get(0).getContext 
			){
				const 
				canvasVerticalLabelLayer2 = elePlVerticalLabelLayer2.get(0).getContext('2d'), 
				verticalLabelPositionKey = funcVerticalLabelPositionObjectKey(varLocal.verticalLabelPosition, cursorPosX);
				
				canvasVerticalLabelLayer2.clearRect(0, 0, varLocal.verticalLabelWidthRatio, varLocal.verticalLabelHeightRatio);
				if(
					verticalLabelPositionKey !== false && 
					typeof varLocal.verticalLabel[verticalLabelPositionKey] !== 'undefined' 
				){
					const 
					rectWidth = funcGetStrOuterWidth(funcGetStringByte(varLocal.verticalLabel[verticalLabelPositionKey]), configs.cursorRulerPadding), 
					rectHeight = configs.fontSize * 2;
					//背景四角
			    	canvasVerticalLabelLayer2.beginPath();
					canvasVerticalLabelLayer2.fillStyle = configs.cursorRulerBackgroundColor;
					canvasVerticalLabelLayer2.strokeStyle = configs.cursorRulerBackgroundColor;
					canvasVerticalLabelLayer2.rect(
						cursorPosX - rectWidth / 2, 
						0, 
						rectWidth, 
						rectHeight 
					);
					canvasVerticalLabelLayer2.fill();
					//数値
					canvasVerticalLabelLayer2.font = configs.fontSize + 'px ' + configs.fontFamily;
					canvasVerticalLabelLayer2.fillStyle = configs.cursorRulerColor;
					//数値表記
					canvasVerticalLabelLayer2.fillText(
						varLocal.verticalLabel[verticalLabelPositionKey], 
						cursorPosX - (rectWidth / 2) + configs.cursorRulerPadding, 
						rectHeight / 2 + ((configs.fontSize * configs.canvasRatio) / 4) 
					);
					canvasVerticalLabelLayer2.stroke();
				}
			}
		}, 
		//canvasタグ初期化用関数
		funcClearCanvas = (arrLayer) => {
			if(typeof arrLayer === 'undefined')
			arrLayer = [1, 2];
			for(var i = 0, l = arrLayer.length;i < l;++i){
				let 
				elePlGraph = $('> .pl_graph_parent:eq(0) > canvas:nth-of-type(' + arrLayer[i] + ')', el), 
				elePlSideNumber = $('> .pl_graph_side_number_parent:eq(0) > canvas:nth-of-type(' + arrLayer[i] + ')', el), 
				elePlVerticalLabel = $('> .pl_graph_vertical_label_parent:eq(0) > canvas:nth-of-type(' + arrLayer[i] + ')', el);
				
				//グラフ
				if(elePlGraph.get(0).getContext){
					const 
					canvasGraph = elePlGraph.get(0).getContext('2d');
					canvasGraph.clearRect(
						0, 
						0, 
						varLocal.graphWidthRatio, 
						varLocal.graphHeightRatio 
					);
				}
				
				//サイド数値
				if(
					configs.sideNumberDisplay && 
					elePlSideNumber.get(0).getContext 
				){
					const 
					canvasSideNumber = elePlSideNumber.get(0).getContext('2d');
					canvasSideNumber.clearRect(
						0, 
						0, 
						varLocal.sideNumberWidthRatio, 
						varLocal.sideNumberHeightRatio 
					);
				}
				
				//ラベル
				if(
					configs.verticalLabelDisplay && 
					elePlVerticalLabel.get(0).getContext 
				){
					const 
					canvasVerticalLabel = elePlVerticalLabel.get(0).getContext('2d');
					canvasVerticalLabel.clearRect(
						0, 
						0, 
						varLocal.verticalLabelWidthRatio, 
						varLocal.verticalLabelHeightRatio 
					);
				}
			}
			//縦線
			if(
				$.inArray(
					1, 
					arrLayer 
				) !== -1 && 
				configs.verticalLineDisplay 
			){
				const 
				elePlVerticalLine = $('> .pl_graph_vertical_line_parent:eq(0) > canvas', el);
				if(elePlVerticalLine.get(0).getContext){
					const 
					canvasVerticalLine = elePlVerticalLine.get(0).getContext('2d');
					canvasVerticalLine.clearRect(
						0, 
						0, 
						varLocal.verticalLineWidthRatio, 
						varLocal.verticalLineHeightRatio 
					);
				}
			}
		}, 
		funcClearEvent = () => {
			const 
			elePlGraphEventTrigger = $(selectorRule.class + configs.graphEventTriggerClassName, el);
			elePlGraphEventTrigger.remove();
		}, 
		funcPutGraph = () => {
			const 
			elePlGraphParent = $('> .pl_graph_parent:eq(0)', el), 
			elePlGraph = $('> canvas', elePlGraphParent);
			if(!elePlGraph.get(0).getContext)
			return false;
			const 
			canvasGraph = elePlGraph.get(0).getContext('2d'), 
			graphDisplayRatioHeight = varLocal.graphInnerHeight / varLocal.itemsLimitValue.difference;
			for(var keyItems in configs.items){
				if($.inArray(
					keyItems, 
					varLocal.itemsHide 
				) !== -1)
				continue;
				
				//通常線
				let 
				flagMoveTo = false, 
				positionItemValue = {};
				if(typeof configs.items[keyItems].color === 'undefined'){
					canvasGraph.fillStyle = configs.defaultColor;
					canvasGraph.strokeStyle = configs.defaultColor;
				}else{
					canvasGraph.fillStyle = configs.items[keyItems].color;
					canvasGraph.strokeStyle = configs.items[keyItems].color;
				}
				if(typeof configs.items[keyItems].lineStyle !== 'undefined'){
					if(canvasGraph.setLineDash !== undefined){
						canvasGraph.setLineDash(configs.items[keyItems].lineStyle);
					}else
					if(canvasGraph.mozDash !== undefined){
						canvasGraph.mozDash = configs.items[keyItems].lineStyle;
					}
				}else{
					if(canvasGraph.setLineDash !== undefined){
						canvasGraph.setLineDash(varGlobal.defaultLineDash);
					}else
					if(canvasGraph.mozDash !== undefined){
						canvasGraph.mozDash = varGlobal.defaultLineDash;
					}
				}
				canvasGraph.lineWidth = typeof configs.items[keyItems].weight === 'undefined'?configs.defaultWeight:configs.items[keyItems].weight;
				canvasGraph.beginPath();
				for(var keyVerticalLabel in varLocal.verticalLabel){
					if(
						typeof configs.items[keyItems].values === 'undefined' || 
						typeof configs.items[keyItems].values[keyVerticalLabel] === 'undefined' 
					)
					continue;
					positionItemValue[keyVerticalLabel] = {
						x:varLocal.verticalLabelPosition[keyVerticalLabel], 
						y:(((varLocal.itemsLimitValue.max - configs.items[keyItems].values[keyVerticalLabel]) * graphDisplayRatioHeight) + varLocal.graphMarginTop) * configs.canvasRatio 
					};
					if(flagMoveTo === false){
						canvasGraph.moveTo(
							positionItemValue[keyVerticalLabel].x, 
							positionItemValue[keyVerticalLabel].y 
						);
						flagMoveTo = true;
					}else{
						canvasGraph.lineTo(
							positionItemValue[keyVerticalLabel].x, 
							positionItemValue[keyVerticalLabel].y 
						);
					}
				}
				canvasGraph.stroke();
				
				//強調線
				if(typeof configs.items[keyItems].strong !== 'undefined'){
					for(var keyVerticalLabel0 in configs.items[keyItems].strong){
						let 
						flagMoveTo = false;
						if(typeof configs.items[keyItems].strong[keyVerticalLabel0].color === 'undefined'){
							canvasGraph.fillStyle = configs.defaultStrongColor;
							canvasGraph.strokeStyle = configs.defaultStrongColor;
						}else{
							canvasGraph.fillStyle = configs.items[keyItems].strong[keyVerticalLabel0].color;
							canvasGraph.strokeStyle = configs.items[keyItems].strong[keyVerticalLabel0].color;
						}
						if(typeof configs.items[keyItems].strong[keyVerticalLabel0].lineStyle !== 'undefined'){
							if(canvasGraph.setLineDash !== undefined){
								canvasGraph.setLineDash(configs.items[keyItems].strong[keyVerticalLabel0].lineStyle);
							}else
							if(canvasGraph.mozDash !== undefined){
								canvasGraph.mozDash = configs.items[keyItems].strong[keyVerticalLabel0].lineStyle;
							}
						}else{
							if(canvasGraph.setLineDash !== undefined){
								canvasGraph.setLineDash(varGlobal.defaultLineDash);
							}else
							if(canvasGraph.mozDash !== undefined){
								canvasGraph.mozDash = varGlobal.defaultLineDash;
							}
						}
						canvasGraph.lineWidth = typeof configs.items[keyItems].strong[keyVerticalLabel0].weight === 'undefined'?configs.defaultStrongWeight:configs.items[keyItems].strong[keyVerticalLabel0].weight;
						canvasGraph.beginPath();
						for(var keyVerticalLabel1 in varLocal.verticalLabel){
							if(
								flagMoveTo === false && 
								keyVerticalLabel1 === keyVerticalLabel0 && 
								typeof positionItemValue[keyVerticalLabel1] !== 'undefined' 
							){
								if(keyVerticalLabel0 === configs.items[keyItems].strong[keyVerticalLabel0].end){
									canvasGraph
									.arc(
										positionItemValue[keyVerticalLabel1].x, 
										positionItemValue[keyVerticalLabel1].y, 
										configs.items[keyItems].strong[keyVerticalLabel0].weight / 2, 
										0, 
										2 * Math.PI, 
										false 
									);
									break;
								}
								canvasGraph.moveTo(
									positionItemValue[keyVerticalLabel1].x, 
									positionItemValue[keyVerticalLabel1].y 
								);
								flagMoveTo = true;
							}else 
							if(
								flagMoveTo && 
								typeof positionItemValue[keyVerticalLabel1] !== 'undefined' 
							){
								canvasGraph.lineTo(
									positionItemValue[keyVerticalLabel1].x, 
									positionItemValue[keyVerticalLabel1].y 
								);
								if(keyVerticalLabel1 === configs.items[keyItems].strong[keyVerticalLabel0].end.toString())
								break;
							}
						}
						canvasGraph.stroke();
					}
				}
				
				//イベント
				if(typeof configs.items[keyItems].event !== 'undefined'){
					for(var i = 0, l = configs.items[keyItems].event.length;i < l;++i){
						for(var keyVerticalLabel in varLocal.verticalLabel){
							if(keyVerticalLabel !== configs.items[keyItems].event[i].label.toString())
							continue;
							elePlGraphParent.append('<span class="' + configs.graphEventTriggerClassName + (configs.items[keyItems].eventTriggerClassName === 'undefined'?'':' ' + configs.items[keyItems].eventTriggerClassName) + '" />');
							let 
							elePlGraphEventTrigger = $(selectorRule.class + (configs.items[keyItems].eventTriggerClassName === 'undefined'?configs.graphEventTriggerClassName:configs.items[keyItems].eventTriggerClassName), el).last();
							elePlGraphEventTrigger
							.css({
								'top':(positionItemValue[keyVerticalLabel].y / configs.canvasRatio), 
								'left':(positionItemValue[keyVerticalLabel].x / configs.canvasRatio) 
							});
							for(var event in configs.items[keyItems].event[i].callback)
							elePlGraphEventTrigger
							.on(
								event, 
								{
									callback:configs.items[keyItems].event[i].callback[event], 
									args0:configs.items[keyItems].event[i].args, 
									args1:positionItemValue, 
									args2:keyItems, 
									args3:keyVerticalLabel, 
									args4:configs.items[keyItems].values[keyVerticalLabel] 
								}, 
								function(e){
									e.data.callback(
										e, 
										$(this), 
										e.data.args0, 
										e.data.args1, 
										e.data.args2, 
										e.data.args3, 
										e.data.args4 
									);
								} 
							);
						}
					}
				}
			}
		}, 
		funcPutMark = () => {
			const 
			elePlGraphSideNumber = $('> .pl_graph_side_number_parent:eq(0) > canvas', el), 
			elePlGraph = $('> .pl_graph_parent:eq(0) > canvas', el);
			if(
				!elePlGraphSideNumber.get(0).getContext || 
				!elePlGraph.get(0).getContext 
			)
			return false;
			const 
			canvasSideNumber = elePlGraphSideNumber.get(0).getContext('2d'), 
			canvasGraph = elePlGraph.get(0).getContext('2d');
			for(var keyMarks in configs.marks){
				if($.inArray(
					keyMarks, 
					varLocal.marksHide 
				) !== -1)
				continue;
				let 
				graphDisplayRatioHeight = varLocal.graphInnerHeight / varLocal.itemsLimitValue.difference, 
				markPosY = (((varLocal.itemsLimitValue.max - configs.marks[keyMarks].value) * graphDisplayRatioHeight) + varLocal.graphMarginTop) * configs.canvasRatio, 
				rectWidth = funcGetStrOuterWidth(funcGetStringByte(funcNumberFormat(configs.marks[keyMarks].value)), configs.cursorRulerPadding), 
				rectHeight = configs.fontSize * 2;
				//背景四角
		    	canvasSideNumber.beginPath();
				canvasSideNumber.fillStyle = configs.marks[keyMarks].backgroundColor;
				canvasSideNumber.strokeStyle = configs.marks[keyMarks].backgroundColor;
				canvasSideNumber.rect(
					0, 
					markPosY - rectHeight / 2, 
					rectWidth, 
					rectHeight 
				);
				canvasSideNumber.fill();
				//数値表記
				canvasSideNumber.beginPath();
				canvasSideNumber.font = configs.fontSize + 'px ' + configs.fontFamily;
				canvasSideNumber.fillStyle = configs.marks[keyMarks].color;
				canvasSideNumber.strokeStyle = configs.marks[keyMarks].color;
				canvasSideNumber.fillText(
					funcNumberFormat(configs.marks[keyMarks].value), 
					configs.sideNumberIndent, 
					markPosY + ((configs.fontSize * configs.canvasRatio) / 4) 
				);
				canvasSideNumber.stroke();
				//定規
				canvasGraph.fillStyle = configs.marks[keyMarks].borderColor;
				canvasGraph.strokeStyle = configs.marks[keyMarks].borderColor;
				canvasGraph.lineWidth = configs.marks[keyMarks].weight;
				if(canvasGraph.setLineDash !== undefined){
					canvasGraph.setLineDash(configs.marks[keyMarks].style);
				}else
				if(canvasGraph.mozDash !== undefined){
					canvasGraph.mozDash = configs.marks[keyMarks].style;
				}
				canvasGraph.beginPath();
				canvasGraph.moveTo(0, markPosY);
				canvasGraph.lineTo(varLocal.graphWidthRatio, markPosY);
				canvasGraph.stroke();
			}
			/*
			if(canvasGraph.setLineDash !== undefined){
				canvasGraph.setLineDash(varGlobal.defaultLineDash);
			}else
			if(canvasGraph.mozDash !== undefined){
				canvasGraph.mozDash = varGlobal.defaultLineDash;
			}
			*/
		}, 
		funcPutVerticalLine = () => {
			const 
			elePlGraphVerticalLine = $('> .pl_graph_vertical_line_parent:eq(0) > canvas', el), 
			elePlGraph = $('> .pl_graph_parent:eq(0) > canvas', el);
			if(
				!elePlGraphVerticalLine.get(0).getContext || 
				!elePlGraph.get(0).getContext 
			)
			return false;
			const 
			canvasVerticalLine = elePlGraphVerticalLine.get(0).getContext('2d'), 
			canvasGraph = elePlGraph.get(0).getContext('2d');
			for(var keyVerticalLine in configs.verticalLine){
				if(
					$.inArray(
						keyVerticalLine, 
						varLocal.verticalLineHide 
					) !== -1 || 
					typeof varLocal.verticalLabelPosition[keyVerticalLine] !== 'number' 
				)
				continue;
				let 
				verticalLinePosX = varLocal.verticalLabelPosition[keyVerticalLine], 
				rectWidth = funcGetStrOuterWidth(funcGetStringByte(funcNumberFormat(configs.verticalLine[keyVerticalLine].label)), configs.cursorRulerPadding), 
				rectHeight = configs.fontSize * 2;
				//背景四角
		    	canvasVerticalLine.beginPath();
				canvasVerticalLine.fillStyle = configs.verticalLine[keyVerticalLine].backgroundColor;
				canvasVerticalLine.strokeStyle = configs.verticalLine[keyVerticalLine].backgroundColor;
				canvasVerticalLine.rect(
					verticalLinePosX - rectWidth / 2, 
					0, 
					rectWidth, 
					rectHeight 
				);
				canvasVerticalLine.fill();
				//ラベル表記
				canvasVerticalLine.beginPath();
				canvasVerticalLine.font = configs.fontSize + 'px ' + configs.fontFamily;
				canvasVerticalLine.fillStyle = configs.verticalLine[keyVerticalLine].color;
				canvasVerticalLine.strokeStyle = configs.verticalLine[keyVerticalLine].color;
				canvasVerticalLine.fillText(
					funcNumberFormat(configs.verticalLine[keyVerticalLine].label), 
					verticalLinePosX - rectWidth / 2 + configs.cursorRulerPadding, 
					rectHeight / 2 + ((configs.fontSize * configs.canvasRatio) / 4) 
				);
				canvasVerticalLine.stroke();
				//縦線
				canvasGraph.fillStyle = configs.verticalLine[keyVerticalLine].borderColor;
				canvasGraph.strokeStyle = configs.verticalLine[keyVerticalLine].borderColor;
				canvasGraph.lineWidth = configs.verticalLine[keyVerticalLine].weight;
				if(canvasGraph.setLineDash !== undefined){
					canvasGraph.setLineDash(configs.verticalLine[keyVerticalLine].style);
				}else
				if(canvasGraph.mozDash !== undefined){
					canvasGraph.mozDash = configs.verticalLine[keyVerticalLine].style;
				}
				canvasGraph.beginPath();
				canvasGraph.moveTo(
					verticalLinePosX, 
					0 
				);
				canvasGraph.lineTo(
					verticalLinePosX, 
					varLocal.graphHeightRatio 
				);
				canvasGraph.stroke();
			}
			/*
			if(canvasGraph.setLineDash !== undefined){
				canvasGraph.setLineDash(varGlobal.defaultLineDash);
			}else
			if(canvasGraph.mozDash !== undefined){
				canvasGraph.mozDash = varGlobal.defaultLineDash;
			}
			*/
		};
		funcInit();
		return this;
	};
})(jQuery);