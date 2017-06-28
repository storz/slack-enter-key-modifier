'use strict';

var i18Get = chrome.i18n.getMessage;
function getTooltipText(isChecked) {
    return i18Get('enterKeyToSendMessage') + (isChecked ? i18Get('on') : i18Get('off'));
}

function updateParts(isChecked) {
    Array.prototype.forEach.call(document.getElementsByClassName('enter_add_newline'), function(tooltip) {
        tooltip.innerText = getTooltipText(isChecked);
    });
    Array.prototype.forEach.call(document.getElementsByClassName('file_comment_tip'), function(span) {
        span.innerText = isChecked ? 'shift+enter to add a new line' : 'enter to add a new line';
    });
}

document.getElementById('msg_form').appendChild(function() {
    var label = document.createElement('label');
    label.id = 'label_enter_key_to_send_message';
    label.className = 'checkbox normal mini ts_tip ts_tip_top ts_tip_float ts_tip_delay_500 ts_tip_hidden';
    label.htmlFor = 'checkbox_enter_key_to_send_message';

    var tc = document.createElement('span');
    tc.className = 'ts_tip_tip enter_add_newline';
    tc.innerText = getTooltipText(!false);

    var check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'checkbox_enter_key_to_send_message';
    check.checked = false;
    check.onclick = function () {
        var checkbox = document.getElementById('checkbox_enter_key_to_send_message');
        var isChecked = checkbox.checked;
        chrome.storage.sync.set({
            'slack_enter_key_modifier_is_enabled': !isChecked
        });
        updateParts(isChecked);
    };

    label.appendChild(check);
    label.appendChild(tc);
    label.appendChild(document.createTextNode('\u23CE'));
    return label;
}());

chrome.storage.sync.get('slack_enter_key_modifier_is_enabled', function(v) {
    var isEnabled = v.slack_enter_key_modifier_is_enabled;
    if (isEnabled == null) {
        isEnabled = true;
    }
    var checkbox = document.getElementById('checkbox_enter_key_to_send_message');
    checkbox.checked = !isEnabled;
    updateParts(checkbox.checked);
});
