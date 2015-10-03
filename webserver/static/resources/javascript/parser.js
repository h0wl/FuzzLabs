$( document ).ready(function() {

    var selection_start = -1;
    var selection_end = -1;

    var dHeight = $(document).height();
    $("div#parser_center_wrapper").height(dHeight - 350);

    var padding_select = $("#p_string_padding_byte").get(0);
    for (var rc = 0; rc < 256; rc++) {
        var so = document.createElement('option');
        so.value = rc;
        so.textContent = "0x" + fixHex(rc.toString(16)).toUpperCase()
        padding_select.appendChild(so);
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function createBlock(name, area, group, encoder, dep_on, dep_values, dep_compare) {
        var hexview = document.getElementById('parser_center_wrapper');
        var cNodes = hexview.childNodes;

        var block = document.createElement('div');
        $(block).addClass('unselectable');
        $(block).addClass('parser_block_cell');

        $(cNodes[area.start]).before(block);

        for (var cc = area.start + 1; cc < area.end + 2; cc++) {
            var item = cNodes[area.start + 1];
            $(item).removeClass('parser_hex_cell_select');
            block.appendChild(item);
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function changeValue(item) {
        $("#dialog_changevalue").dialog({
            "title": "Change Value",
            "closeText": "Cancel",
            buttons: [ { id:"b_change_value",
                         text: "Save",
                         click: function() {
                             var new_value = $("#p_new_hex_value").val();
                             new_value = parseInt("0x" + new_value, 16);
                             if (isNaN(new_value) || new_value > 255 || new_value < 0) return;

                             $(item).attr('dec', new_value);
                             $(item).attr('raw', String.fromCharCode(new_value));
                             $(item).attr('hex', fixHex(new_value.toString(16)).toUpperCase());
                             $(item).attr('value', fixHex(new_value.toString(16)).toUpperCase());
                             $(item).html(fixHex(new_value.toString(16)).toUpperCase());

                             $( this ).dialog( "close" ); }
                       } ]
        });
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function getPrimitiveItem(pItem, type, color, area, len, name) {
        $(pItem).removeClass('parser_hex_cell_ascii');
        $(pItem).removeClass('parser_hex_cell_select');

        $(pItem).addClass('unselectable');
        $(pItem).addClass('parser_primitive_cell');
        $(pItem).css("background-color", color);
        var minWidth = 30 * (Math.ceil(name.length / 2) - 1);
        if (minWidth < 30 * 2) minWidth = 30 * 2;
        $(pItem).css("min-width", minWidth);
        $(pItem).css("max-width", 30 * (Math.ceil(name.length / 2) - 1));
        $(pItem).css("color", "#FFFFFF");
        $(pItem).attr("offset_start", area.start);
        $(pItem).attr("offset_end", area.end);
        $(pItem).attr("p_type", type);
        $(pItem).attr("p_length", len);
        $(pItem).attr("p_name", name);
        name = name.toUpperCase().replace(" ", "_");
        $(pItem).text(name);
        return pItem;
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function selectionBinary(type, color, area, len, name) {
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        var data = "";

        iremove = area.end - area.start;

        for (var cc = 0; cc <= iremove; cc++) {
            if (cc == iremove) {
                data += $(cNodes[area.start]).attr('raw');
                getPrimitiveItem($(cNodes[area.start]), type, color, area, len, name);
                $(cNodes[area.start]).attr('p_data', data);
                break;
            }
            data += $(cNodes[area.start]).attr('raw');
            $(cNodes[area.start]).remove();
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function selectionString(type, color, area, len, name, fuzzable,
                             compression, encoder, size, padding) {

        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        var data = "";

        iremove = area.end - area.start;

        for (var cc = 0; cc <= iremove; cc++) {
            if (cc == iremove) {
                data += $(cNodes[area.start]).attr('raw');
                getPrimitiveItem($(cNodes[area.start]), type, color, area, len, name);
                $(cNodes[area.start]).attr('p_fuzzable', fuzzable);
                $(cNodes[area.start]).attr('p_compression', compression);
                $(cNodes[area.start]).attr('p_encoder', encoder);
                $(cNodes[area.start]).attr('p_size', size);
                $(cNodes[area.start]).attr('p_padding', padding);
                $(cNodes[area.start]).attr('p_data', data);
                break;
            }
            data += $(cNodes[area.start]).attr('raw');
            $(cNodes[area.start]).remove();
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function selectionDelimiter(type, color, area, len, name, fuzzable) {
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        var data = "";

        iremove = area.end - area.start;

        for (var cc = 0; cc <= iremove; cc++) {
            if (cc == iremove) {
                data += $(cNodes[area.start]).attr('raw');
                getPrimitiveItem($(cNodes[area.start]), type, color, area, len, name);
                $(cNodes[area.start]).attr('p_fuzzable', fuzzable);
                $(cNodes[area.start]).attr('p_data', data);
                break;
            }
            data += $(cNodes[area.start]).attr('raw');
            $(cNodes[area.start]).remove();
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function selectionNumeric(type, color, area, len, name, fuzzable,
                              endian, signed, format, full_range) {
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        var data = "";

        switch(len) {
            case 1:
                type = "byte";
                break;
            case 2:
                type = "word";
                break;
            case 4:
                type = "dword";
                break;
            case 8:
                type = "qword";
                break;
            default:
                alert("Not a byte, word, dword or qword.");
                return;
        }

        iremove = area.end - area.start;

        for (var cc = 0; cc <= iremove; cc++) {
            if (cc == iremove) {
                data += $(cNodes[area.start]).attr('raw');
                getPrimitiveItem($(cNodes[area.start]), type, color, area, len, name);
                $(cNodes[area.start]).attr('p_fuzzable', fuzzable);
                $(cNodes[area.start]).attr('p_data', data);
                $(cNodes[area.start]).attr('p_endian', endian);
                $(cNodes[area.start]).attr('p_signed', signed);
                $(cNodes[area.start]).attr('p_format', format);
                $(cNodes[area.start]).attr('p_full_range', full_range);
                break;
            }
            data += $(cNodes[area.start]).attr('raw');
            $(cNodes[area.start]).remove();
        }

    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function setSelection(type, color, area) {
        var length = area.end - area.start + 1;

        switch(type) {
            case "block":
                $("#dialog_block").dialog({
                    "title": "Block Properties",
                    "closeText": "Cancel",
                    buttons: [ { id:"b_parse_block",
                                 text: "Save",
                                 click: function() {
                                     var name = $("#parser_p_block_name").val();
                                     var group = $("#parser_p_block_group").val();
                                     var encoder = $("#parser_p_block_encoder").val();
                                     var dep_on = $("#parser_p_block_dep_on").val();
                                     var dep_values = $("#parser_p_block_dep_values").val();
                                     var dep_compare = $("#parser_p_block_dep_compare").val();
                                     createBlock(name, area, group, encoder,
                                                 dep_on, dep_values,
                                                 dep_compare);
                                     $( this ).dialog( "close" ); }
                               } ]
                });
                break;
            case "numeric":
                $("#dialog_numeric").dialog({
                    "title": "Numeric Primitive",
                    "closeText": "Cancel",
                    buttons: [ { id:"b_parse_numeric",
                                 text: "Save",
                                 click: function() {
                                     var name = $("#parser_p_numeric_name").val();
                                     var fuzzable = $("#p_numeric_fuzzable").val();
                                     var endian = $("#p_numeric_endian").val();
                                     var signed = $("#p_numeric_signed").val();
                                     var format = $("#p_numeric_format").val();
                                     var full_range = $("#p_numeric_full_range").val();

                                     selectionNumeric(type, color, area, length, name,
                                                      fuzzable, endian, signed, format,
                                                      full_range);
                                     $( this ).dialog( "close" ); }
                               } ]
                });
                break;
            case "string":
                $("#dialog_string").dialog({
                    "title": "String Primitive",
                    "closeText": "Cancel",
                    buttons: [ { id:"b_parse_string",
                                 text: "Save",
                                 click: function() {
                                     var name = $("#parser_p_string_name").val();
                                     var fuzzable = $("#p_string_fuzzable").val();
                                     var compression = $("#p_string_compression").val();
                                     var encoder = $("#p_string_encoder").val();
                                     var size = $("#p_string_size").val();
                                     var padding = $("#p_string_padding_byte").val();
                                     selectionString(type, color, area, length, name,
                                                     fuzzable, compression, encoder,
                                                     size, padding);
                                     $( this ).dialog( "close" ); }
                               } ]
                });
                break;
            case "binary":
                $("#dialog_static").dialog({
                    "title": "Binary Primitive",
                    "closeText": "Cancel",
                    buttons: [ { id:"b_parse_binary",
                                 text: "Save",
                                 click: function() {
                                     var name = $("#parser_p_static_name").val();
                                     selectionBinary(type, color, area, length, name);
                                     $( this ).dialog( "close" ); }
                               } ]
                });
                break;
            case "delimiter":
                $("#dialog_delimiter").dialog({
                    "title": "Delimiter Primitive",
                    "closeText": "Cancel",
                    buttons: [ { id:"b_parse_delimiter",
                                 text: "Save",
                                 click: function() {
                                     var name = $("#parser_p_delimiter_name").val();
                                     var fuzzable = $("#p_delimiter_fuzzable").val();
                                     selectionDelimiter(type, color, area, length, name,
                                                     fuzzable);
                                     $( this ).dialog( "close" ); }
                               } ]
                });
                break;
        }

    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function getSelection() {
        var start = -1;
        var stop = -1;
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            if (start == -1 && $(cNodes[cnc]).hasClass("parser_hex_cell_select") == true) {
                start = cnc;
            }
            if (start != -1 && $(cNodes[cnc]).hasClass("parser_hex_cell_select") == false) {
                stop = cnc - 1;
                break;
            }
        }
        return({"start": start, "end": stop});
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function setAllHex() {
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            if ($(cNodes[cnc]).hasClass('parser_primitive_cell') == false) toHex(cNodes[cnc]);
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function clearStringMarkings() {
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;
        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            $(cNodes[cnc]).removeClass("parser_hex_cell_ascii");
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function analyzeOffsetForString(cnodes, item) {
        strlen = parseInt($("input#pa_str_min_len").val());
        cno = parseInt(item.getAttribute('offset'));
        var string = 0;

        var cc = 0;
        var char = cnodes[cno + cc].getAttribute('raw').charCodeAt(0);
        while (char >= 32 && char <= 126) {
            if ($(cNodes[cno + cc]).hasClass('parser_primitive_cell') == true) break;
            cc++;
            char = cnodes[cno + cc].getAttribute('raw').charCodeAt(0);
        }

        if (cc < strlen) return 0;

        cc = 0;
        var char = cnodes[cno].getAttribute('raw').charCodeAt(0);
        while (char >= 32 && char <= 126) {
            toAscii(cnodes[cno + cc]);
            cc++;
            char = cnodes[cno + cc].getAttribute('raw').charCodeAt(0);
        }
        return cc;
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function findStrings() {
        clearStringMarkings();
        var hexview = document.getElementById('parser_center_wrapper');
        cNodes = hexview.childNodes;

        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            if ($(cNodes[cnc]).hasClass('parser_primitive_cell') == false) {
                cnc += analyzeOffsetForString(cNodes, cNodes[cnc]);
            }
        }

    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function breakPrimitive(item) {
        if ($(item).hasClass('parser_primitive_cell') == false) {
            alert("Error: Not a primitive.");
            return;
        }
        var hexview = document.getElementById('parser_center_wrapper');
        var file_data = window.localStorage.getItem('parser_file_content');

        var p_data = $(item).attr('p_data');
        var p_offset_start = $(item).attr('offset_start');

        for (var cnc = 0; cnc < p_data.length; cnc++) {
            var hvItem = hexViewByte(p_data[cnc], p_offset_start, true);
            $(item).before(hvItem);
            p_offset_start++;
        }
        $(item).remove();
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $(function(){
        $('#the-node').contextMenu({
            selector: 'div.parser_hex_cell', 
            callback: function(key, options) {
                if (key == "ascii") toAscii($(this));
                if (key == "hex") toHex($(this));
                if (key == "change") changeValue($(this));
                if (key == "break_primitive") breakPrimitive($(this));
            },
            items: {
                "hex": {name: "To Hex"},
                "ascii": {name: "To Ascii"},
                "change": {name: "Change Value"},
                "sep1": "--------",
                "break_primitive": {name: "Break Primitive"},
                "break_group": {name: "Break Group"},
            }
        });
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function toAscii(item) {
        $(item).removeClass('parser_hex_cell_ascii');
        var raw = $(item).attr('raw');
        $(item).text(raw);
        $(item).addClass('parser_hex_cell_ascii');
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function toHex(item) {
        $(item).removeClass('parser_hex_cell_ascii');
        var raw = $(item).attr('raw');
        $(item).text(fixHex(parseInt(raw.charCodeAt(0)).toString(16)).toUpperCase());
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function fixHex(val) {
        if (val.length % 2) return ("0" + val);
        return val;
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function selectBytes(i_parent, from, to) {
        if (i_parent === undefined) {
            i_parent = document.getElementById('parser_center_wrapper');
        }
        var cNodes = i_parent.childNodes;
        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            cno = parseInt(cNodes[cnc].getAttribute('offset'));
            if (cno >= from && cno <= to) {
                $(cNodes[cnc]).addClass("parser_hex_cell_select");
            }
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function clearAllSelection(i_parent) {
        selection_start = -1;
        selection_end = -1;

        var hexView = document.getElementById('parser_center_wrapper');
        if (i_parent !== false && i_parent !== undefined) hexView = i_parent;

        var cNodes = hexView.childNodes;
        for (var cnc = 0; cnc < cNodes.length; cnc++) {
            if ($(cNodes[cnc]).hasClass('parser_block_cell') == true) {
                clearAllSelection($(cNodes[cnc]).get(0));
            }
            $(cNodes[cnc]).removeClass("parser_hex_cell_select");
        }
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function hexViewByte(val, offset, all_hex) {
        var item = document.createElement('div');
        item.setAttribute('class', 'unselectable parser_hex_cell');
        item.setAttribute('raw', val);
        item.setAttribute('dec', val.charCodeAt(0));
        item.setAttribute('hex', fixHex(val.charCodeAt(0).toString(16)));
        item.setAttribute('offset', parseInt(offset));

        item.setAttribute('class', 'unselectable parser_hex_cell');
        val = val.charCodeAt(0).toString(16);
        item.setAttribute('value', fixHex(val));
        item.textContent = fixHex(val).toUpperCase();
        return item;
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    function processFile(all_hex) {
        var hexview = document.getElementById('parser_center_wrapper');
        var file_data = window.localStorage.getItem('parser_file_content');
        hexview.innerHTML = "";
        var bcnt = 0;

        for (bcnt = 0; bcnt < file_data.length; bcnt++) {
            var hvItem = hexViewByte(file_data[bcnt], bcnt, all_hex);
            hexview.appendChild(hvItem);
        }

        findStrings();
    }

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("body").on('mouseover', 'div.parser_hex_cell', function(evt) {
        $(evt.target).addClass("parser_hex_cell_mark");
        var offset_info = $("div#offset_info").get(0);
        var byte_info_hex = $("div#byte_info_hex").get(0);
        var byte_info_dec = $("div#byte_info_dec").get(0);
        var byte_info_raw = $("div#byte_info_raw").get(0);
        var raw = evt.target.getAttribute('raw');
        var offset = evt.target.getAttribute('offset');
        var offset_info = document.getElementById('offset_info');
        byte_info_raw.textContent = "Raw: " + raw;
        byte_info_dec.textContent = "Dec: " + raw.charCodeAt(0);
        byte_info_hex.textContent = "Hex: " + fixHex(raw.charCodeAt(0).toString(16)).toUpperCase();
        offset_info.textContent = "Offset: " + offset + 
                                  " (0x" + 
                                  fixHex(parseInt(offset).toString(16)).toUpperCase() + 
                                  ")";
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("body").on('mouseout', 'div.parser_hex_cell', function(evt) {
        $(evt.target).removeClass("parser_hex_cell_mark");
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("body").on('mousedown', 'div.parser_hex_cell', function(evt) {
        /*
            1 = Left   mouse button
            2 = Centre mouse button
            3 = Right  mouse button
        */
        clearAllSelection();
        if (evt.which === 1) {
            selection_start = parseInt($(evt.target).attr('offset'));
        }
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("button.parser_reset").click(function () {
        processFile(false);
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("li.type").click(function () {
        var p_type = $(this).attr('id').split("_")[1];
        var color = $(this).css('background-color');
        setSelection(p_type, color, getSelection());
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("input#pa_str_min_len").change(function() {
        setAllHex();
        findStrings();
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("body").on('mouseup', 'div.parser_hex_cell', function(evt) {
        selection_end = parseInt($(evt.target).attr('offset'));
        selectBytes(evt.target.parentNode, selection_start, selection_end);
    });

    // ------------------------------------------------------------------------
    //
    // ------------------------------------------------------------------------

    $("#parser_source_file").change(function() {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function(evt) {
            window.localStorage.setItem('parser_file', file);
            window.localStorage.setItem('parser_file_content', evt.target.result);
            processFile(false);
        };

        reader.readAsBinaryString(file);
    });

});

