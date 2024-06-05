function formatPhoneNumber(phoneNumber) {
    // Remove all non-digit characters from the string
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Format the phone number
    const formattedPhoneNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;

    return formattedPhoneNumber;
}