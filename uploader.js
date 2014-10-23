function uploaderModule() {
	var
	uploadBtn = $('.btn-upload'),
	isImgExists =[false, false, false, false, false],
	inputElemContainer = [],
	btnEvtType = "click",
	imgLength = isImgExists.length;
	
	function exposeImage(idx, target){
		window.URL = window.URL || window.webkitURL;
		$("#fileList_"+idx).append("<img src='"+window.URL.createObjectURL(target)+"' alt='image_"+idx+"' width='100%' class='exposedImage_"+idx+"' />");
		attachImageRemoveButton(idx);
	}
	
	function attachImageRemoveButton(idx) {
		$("#fileList_"+idx).find("img.upload-remove-btn").removeClass("invisible");
		updateStatus(idx, true);
	}
	
	function updateStatus(idx, flag) {
		if(isImgExists[idx] == true)
			document.myApplication.talkImage[idx].value = "";
		isImgExists[idx] = flag;
		movePosButton(500, 100);
	}
	
	function removeImage(target){
		$(target).parent().find("img")[0].addClass("invisible");
		$(target).parent().find("img")[1].remove();
		
		updateStatus($(target).attr("alt").split("_")[1], false);
	}
	
	function imgCount() {
		var count = 0;
		for(var i = 0; i < imgLength; i++){
			if(isImgExists[i] == true){
				count++;
			}
		}
		return count;
	}
	
	function movePosButton(speed, time) {
		setTimeout(function() {
			$('html, body').animate({scrollTop : $('.btn-upload').offset().top + 50}, speed);
		}, time);
	}

	return {
		init : function () {
			for(var j = 0; j < isImgExists.length; j++){
				inputElemContainer[j] = $("#fileElem_" + j);
			}

			uploadBtn.bind(btnEvtType ,function () {
				if(imgCount() < imgLength) {
					for(var i = 0; i < isImgExists.length;i++){
						if(isImgExists[i] == false) {
							inputElemContainer[i].trigger(btnEvtType);
							break;
						}
					}
				}else if(imgCount() >= imgLength) {
					layerPopDialogue("이미지는 5장을 이상 업로드하실 수 없습니다.", null);
				}
			});
		},
		
		handleFiles : function(target) {
			exposeImage(target.id.split("_")[1], target.files[0]);
		},
		
		removeImage : function (target){
			$(target).parent().find("img").eq(0).addClass("invisible");
			$(target).parent().find("img").eq(1).remove();
			updateStatus($(target).attr("alt").split("_")[1], false);
		}
	};
		
}


var obj = uploaderModule();
obj.init();


