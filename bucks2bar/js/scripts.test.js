// bucks2bar/js/scripts.test.js
describe('Username Validation Regex', () => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

  test('Valid username with all criteria met', () => {
    expect(regex.test('Password1!')).toBe(true);
    expect(regex.test('StrongPass@123')).toBe(true);
    expect(regex.test('Valid#2023')).toBe(true);
  });

  test('Invalid username missing uppercase letter', () => {
    expect(regex.test('password1!')).toBe(false);
    expect(regex.test('weakpass@123')).toBe(false);
  });

  test('Invalid username missing special character', () => {
    expect(regex.test('Password123')).toBe(false);
    expect(regex.test('StrongPass2023')).toBe(false);
  });

  test('Invalid username missing number', () => {
    expect(regex.test('Password!')).toBe(false);
    expect(regex.test('StrongPass@')).toBe(false);
  });

  test('Invalid username less than 8 characters', () => {
    expect(regex.test('Pass1!')).toBe(false);
    expect(regex.test('P@1')).toBe(false);
  });
});