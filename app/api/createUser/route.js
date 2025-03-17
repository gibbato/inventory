import { hashPassword } from '../../../utils/hashPassword';  // Ensure the correct path
import prisma from '../../../lib/prisma';  // Ensure the correct path

export async function POST(req) {
  try {
    const { email, password, name, role } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User with this email already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name, role },
    });

    return new Response(
      JSON.stringify({ message: "User created successfully", user: { email: newUser.email, role: newUser.role } }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
