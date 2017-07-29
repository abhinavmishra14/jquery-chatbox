function ajaxRequest(actionName, formData, callback, options) {
		var optionsLocal = {
			"showSpinner" : options
		};

		optionsLocal = $.extend(optionsLocal, options);

		$.ajax({
			url : actionName,
			type : "POST",
			cache : false,
			data : JSON.stringify(formData),
			dataType : "json",
			contentType : "application/json",
			success : function(data) {
				if(callback) {
					renderChat(data, options)
				}
			},
			beforeSend : function() {
				if (optionsLocal.showSpinner == true) {
					$('#ajaxImage').show();
					$('#ajaxBackground').show();
				}
			},
			complete : function() {
				if (optionsLocal.showSpinner == true) {
					$('#ajaxImage').hide();
					$('#ajaxBackground').hide();
				}
			},
			error : function() {
				//Hide the spinner div
				$('#ajaxImage').hide();
				$('#ajaxBackground').hide();
			}
		});
	};
	
	function getFormData (formData) {
		var chatFormObject = {};
		$.each(formData, function(i, v) {
			chatFormObject[v.name] = v.value;
		});
		return chatFormObject;
	}

	function validateForm(formName, skipFields) {
		var validationError = {};
	    var formData = $('form[name="'+formName+'"').serializeArray();
	    for (var eachField = 0; eachField < formData.length; eachField ++) {
	    	var eachFieldVal = formData[eachField]["value"].trim();
	    	var eachFieldName = formData[eachField]["name"];
			if (skipFields.indexOf(eachFieldName) ==-1 && (eachFieldVal == null || eachFieldVal == "")) {
				validationError[eachFieldName] = eachFieldName+ " must not be null!"; 
			}
		}
	    return validationError;
	}