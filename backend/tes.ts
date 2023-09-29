let phonenumber = "6281234567890";

if (phonenumber.startsWith("0")) phonenumber = "62" + phonenumber.substring(1);
if (phonenumber.startsWith("+")) phonenumber = phonenumber.substring(1);

console.log(phonenumber);
