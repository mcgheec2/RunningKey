function clicked(id){
    var clickedBtn = document.getElementById(id);
    var idArr = [];
    var temp = "";
    var corrId = "";
    var corrBtn;
    var corrArr = [];

    if(window.getComputedStyle(clickedBtn).getPropertyValue('background-color') != "rgb(0, 0, 0)" &&
        window.getComputedStyle(clickedBtn).getPropertyValue('background-color') != "rgb(55, 55, 55)") {
        temp = id.replace("(", "");
        temp = temp.replace(")", "");
        idArr = temp.split(", ");
        whiteToBlack(id, idArr, clickedBtn);
        if(idArr[0] == 0)
            corrId = "(" + 1 + ", " + idArr[1] + ", " + idArr[2]  +  ")";
        else
            corrId = "(" + 0 + ", " + idArr[1] + ", " + idArr[2]  +  ")";
        corrBtn = document.getElementById(corrId);
        //alert(window.getComputedStyle(clickedBtn))
        if(window.getComputedStyle(clickedBtn).getPropertyValue('background-color') == "rgb(0, 0, 0)" &&
            window.getComputedStyle(corrBtn).getPropertyValue('background-color') != "rgb(0, 0, 0)"){
            corrBtn.click();
        }
    }

    else{
        temp = id.replace("(", "");
        temp = temp.replace(")", "");
        idArr = temp.split(", ");
        corrArr = idArr
        if(idArr[0] == 0) {
            corrId = "(" + 1 + ", " + idArr[1] + ", " + idArr[2] + ")";
            corrArr[0] = 1;
        }
        else {
            corrId = "(" + 0 + ", " + idArr[1] + ", " + idArr[2] + ")";
            corrArr[0] = 0;
        }
        corrBtn = document.getElementById(corrId);
        //alert(window.getComputedStyle(clickedBtn))
        if(window.getComputedStyle(clickedBtn).getPropertyValue('background-color') == "rgb(0, 0, 0)" &&
            window.getComputedStyle(corrBtn).getPropertyValue('background-color') == "rgb(55, 55, 55)"){
            blackToWhite(corrId, corrArr, corrBtn);
        }

        blackToWhite(id, idArr, clickedBtn);
    }

}

function whiteToBlack(clickedId, idArr, button){
    var checkId = "";
    var checkBtn;
    button.className = "clicked_button";
    messageAdd(clickedId, button);
    for(i = 0; i < 28; i++){
        checkId = "(" + idArr[0] + ", " + i + ", " + idArr[2]  +  ")";
        try {
            checkBtn = document.getElementById(checkId);
            if(checkBtn.nodeName == "BUTTON"){
                if(window.getComputedStyle(checkBtn).getPropertyValue('background-color') == "rgb(55, 55, 55)" && checkId != clickedId){
                    checkBtn.className = "prob_button";
                    break;
                }
            }
        }
        catch (e){
            break;
        }

    }
}

function blackToWhite(clickedId, idArr, button){
    button.className = "prob_button";
    messageDelete(clickedId);
}

function messageAdd(id, button){
    // var messageTopBox = document.getElementById("top_holder");
    // var messageTop = messageTopBox.value;
    var messageTopBox;
    var messageTop;
    var tempTop = id;
    //var messageTopArr = messageTop.split("");
    var messageTopArr = [];
    var idTopArr = [];
    tempTop = tempTop.replace("(", "");
    tempTop = tempTop.replace(")", "");
    idTopArr = tempTop.split(", ");
    //alert(id)
    if(idTopArr[0] == 0)
        messageTopBox = document.getElementById("top_holder");
    else
        messageTopBox = document.getElementById("bottom_holder");

    messageTop = messageTopBox.value;
    messageTopArr = messageTop.split("");

    messageTopArr[idTopArr[2]] = button.childNodes[0].nodeValue;
    //alert(messageTopArr)
    messageTop = "";

    for(i = 0; i < messageTopArr.length; i++){
        if(messageTopArr[i] == " ")
            messageTop += "\u00a0";
        else
            messageTop += messageTopArr[i];
    }

    messageTopBox.value = messageTop;
    if(idTopArr[0] == 0)
        document.getElementById('top_text').value = formatMessage(messageTop);
    else
        document.getElementById('bottom_text').value = formatMessage(messageTop);
}

function messageDelete(id){
    var messageTopBox;
    var messageTop;
    var tempTop = id;
    var idTopArr = [];

    tempTop = tempTop.replace("(", "");
    tempTop = tempTop.replace(")", "");
    idTopArr = tempTop.split(", ");

    if(idTopArr[0] == 0)
        messageTopBox = document.getElementById("top_holder");

    else
        messageTopBox = document.getElementById("bottom_holder");
    messageTop = messageTopBox.value;
    messageTopArr = messageTop.split("");
    messageTopArr[idTopArr[2]] = " ";
    messageTop = "";

    for(i = 0; i < messageTopArr.length; i++){
        messageTop += messageTopArr[i];
    }

    messageTopBox.value = messageTop;
   if(idTopArr[0] == 0)
        document.getElementById('top_text').value = formatMessage(messageTop);
    else
        document.getElementById('bottom_text').value = formatMessage(messageTop);
}

function formatMessage(message){
    var newMessage = "";
    var count = 0;
    //message = message.split(" ").join("");

    for(var i = 0; i < message.length; i++){
        if(message[i] != ' '){
            newMessage += message[i];
            count++;
        }
        // newMessage = message[i];
        if((i-4) % 5 == 0 && message[i] != ' ') {
            newMessage += " ";
        }
    }

    return newMessage;
}

function inputClick(id){
    // var inputString = "";
    // var btn;
    // var input = document.getElementById(id);
    // var invInput;
    // var invString = "";
    // inputString = input.value;
    // var holder = "";
    // var charDiff = '';
    // var count = 0;
    //
    // for(i = 0; i < inputString.length; i++){
    //     if(inputString[i] != "!")
    //         holder += inputString[i];
    //     else
    //         count++;
    // }
    //
    // holder = holder.split(" ").join("")
    //
    // if(id == "top_text"){
    //     invInput = document.getElementById("top_holder");
    //     invString = invInput.value;
    //
    //     for(var i = 0; i < holder.length; i++){
    //         if(holder[i] != invString[i]){
    //
    //             for(var j = 0; j < 28; j++){
    //                 var corrId = "(" + 0 + ", " + j + ", " + (i+count)  +  ")";
    //                 var corrId2 = "(" + 1 + ", " + j + ", " + (i+count)  +  ")"
    //                 try{
    //                     btn = document.getElementById(corrId)
    //                     //alert(btn.value + " " + holder.toUpperCase())
    //                     if(btn.childNodes[0].nodeValue == holder[i].toUpperCase()) {
    //                         btn.click()
    //                         document.getElementById(corrId2).click()
    //                         break;
    //                     }
    //                 }
    //                 catch (e){
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //
    //     }
    // }


    var input = document.getElementById(id);
    var entry = input.value;
    var hidden;
    var hidden2;
    var hiddenEntry;

    var input2;
    var entry2;

    var start;
    var start2;

    var hiddenEntry2;

    if(id == "top_text"){
        hidden = document.getElementById("top_holder");
        hiddenEntry = hidden.value;

        hidden2 = document.getElementById("bottom_holder");
        hiddenEntry2 = hidden2.value;

        input2 = document.getElementById("bottom_text");
        entry2 = input2.value;

        start = 0;
        start2 = 1;
    }

    else{
        hidden = document.getElementById("bottom_holder");
        hiddenEntry = hidden.value;

        hidden2 = document.getElementById("top_holder");
        hiddenEntry2 = hidden2.value;

        input2 = document.getElementById("top_text");
        entry2 = input2.value;

        start = 1;
        start2 = 0;
    }

    entry = entry.split(" ").join("");
    entry2 = entry2.split(" ").join("");

    for(var i = 0; i < entry.length; i++){
        if(entry[i] == '!') {
            // hiddenEntry = hiddenEntry + " ";
            // hiddenEntry2 = hiddenEntry + " ";
            //
            // entry[i] = "!";
            // entry2[i] = "!";
            // hidden.value = hidden.value + " ";
            // hidden2.value = hidden.value;
            //
            // // input.value = input.value + "!";
            // input2.value = input.value;

            hiddenEntry = hiddenEntry + " ";
            hiddenEntry2 = hiddenEntry + " ";
            entry[i] = "\u00a0";
            entry2[i] = "\u00a0";
            input.value = entry;
            input2.value = entry2;
        }

        else if(this.isAlpha(entry[i].toUpperCase()) && entry[i].toUpperCase() != hiddenEntry[i].toUpperCase() && entry.length > entry2.length){
            for(var j = 0; j < 28; j++){
                var corrId = "(" + start + ", " + j + ", " + i  +  ")";
                var tempBtn = document.getElementById(corrId);

                if(tempBtn.className == "prob_button" && tempBtn.childNodes[0].nodeValue == entry[i].toUpperCase()){
                    tempBtn.click();
                    document.getElementById("(" + start2 + ", " + j + ", " + i  +  ")").click();
                    break;
                }
            }

        }


    }

    if(entry2.length > entry.length){
        for(var i = 0; i < entry2.length; i++){
            var breakCheck = false;
            for(var j = 0; j < 28; j++){
                var corrId = "(" + start2 + ", " + j + ", " + i  +  ")";
                var tempBtn = document.getElementById(corrId);
                var test = tempBtn.childNodes[0].nodeValue == entry2[i].toUpperCase();

                //alert(tempBtn.className)
                //alert(entry2[i].toUpperCase()+" "+tempBtn.childNodes[0].nodeValue+" "+(tempBtn.childNodes[0].nodeValue == entry2[i].toUpperCase()))
                if(tempBtn.className == "clicked_button" && (tempBtn.childNodes[0].nodeValue == entry2[i].toUpperCase()) &&
                    entry2[i] != hiddenEntry2[i] ){
                    tempBtn.click();
                    document.getElementById("(" + start + ", " + j + ", " + i  +  ")").click();
                    breakCheck = true;
                    break;
                }
            }
            if(breakCheck)
                break;
        }
    }


}

// var isAlpha = function(ch){
//   return /^[A-Z]$/i.test(ch);
// }

function isAlpha(ch){
    var bool = false;
    if(/^[A-Z]$/i.test(ch))
        bool = true;
    else if(ch == "!")
        bool = true;
    return bool
}