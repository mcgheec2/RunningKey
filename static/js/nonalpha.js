function checkValid(){
    var textarea = document.getElementById('cipher_enter');
    var cipher = textarea.value;
    cipher = cipher.toUpperCase();
    cipher = cipher.split(" ").join("");

    letter = /^[A-Z]+$/;

    if( !!!cipher.match(letter))
        alert("please enter only an alphabetic cipher");
}