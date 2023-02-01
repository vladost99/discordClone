const validatePassword = password => {
    return password.length > 6 && password.length < 12;
}

export const validateMail = mail => {
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "gm");
    return  emailRegex.test(mail)
}

const validateName = name => {
    return name.length > 2 && name.length < 13;
}

export const validateLoginForm = ({mail, password}) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
    
    return isMailValid && isPasswordValid;
}

export const validateFormRegister = ({mail, password, name}) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
    const isNameValid =  validateName(name);

    return isMailValid && isNameValid && isPasswordValid;
}