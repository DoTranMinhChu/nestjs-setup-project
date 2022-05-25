const PASSWORD_REGEX = {
  regex: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
  msg: 'Password require minimum six characters, at least one upper letter and one number',
};

const PHONE_REGEX = {
  regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  msg: 'Phone does not match',
};

export { PASSWORD_REGEX, PHONE_REGEX };
