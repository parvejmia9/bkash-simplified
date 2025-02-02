function NormalizePhoneNumber(phone: string): string {
    if (phone.startsWith("+880")) {
        return phone.slice(4); // Remove "+880"
    } else if (phone.startsWith("880")) {
        return phone.slice(3); // Remove "880"
    }
    return phone;
}

function ValidateBDPhoneNumber(phone: string): boolean {
    if(phone[0]>='0' && phone[0]<='9' && phone[0]!='2' && (phone.length==11||phone.length==12)&& !isNaN(Number(phone))){
        return true;
    }
    return false;
    //return /^(\+)?(88)?01[0-9]{9}$/.test(phone);
}