import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';
import { comparePassword } from '../../../utils/hashPassword';

// Handle POST request for sign-in
export async function POST(req) {
    const { email, password } = await req.json();  // Get email and password from the request body
  
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
      }
  
      // Compare the provided password with the stored password
      const isValid = await comparePassword(password, user.password);
  
      if (!isValid) {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return the token in the response
      return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Something went wrong', error: error.message }),
        { status: 500 }
      );
    }
  }