// api/auth/createuser.js

import { hashPassword } from '../../utils/auth';  // Assuming hashPassword function exists to hash the password
import prisma from '../../lib/prisma';  // Assuming prisma instance is set up properly

export async function POST(req) {
  const { email, password, role } = await req.json();  // Get email, password, and role from the request body

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User with this email already exists' }),
        { status: 400 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,  // Assuming role is included in the request body (e.g., admin, user)
      },
    });

    // Return success response with the new user details
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: { email: newUser.email, role: newUser.role } }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Something went wrong', error: error.message }),
      { status: 500 }
    );
  }
}
