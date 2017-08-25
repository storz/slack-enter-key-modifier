'use strict';

document.body.appendChild(function(){
    var code = function() {
        function isEnabled() {
            var checkbox = document.getElementById('checkbox_enter_key_to_send_message');
            if (!checkbox) {
                return true;
            }
            return !checkbox.checked;
        }

        TS.utility.contenteditable.isCursorInPreBlock = function() {
            if (TS.model.prefs) {
                TS.model.prefs.enter_is_special_in_tbt = true
            } else {
                TS.prefs.setPref('enter_is_special_in_tbt', true)
            }
            return isEnabled()
        }
    };
    
    var elm = document.createElement('script');
    elm.type = 'text/javascript';
    elm.text = '(' + code.toString() + ')()';
    return elm;
}());
