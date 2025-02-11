const bcrypt = require('bcryptjs');

async function hashPassword() {
    const password = 'test@123';
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    console.log("Hashed Password:", hashedPassword); // Print the hashed password
}

hashPassword();
