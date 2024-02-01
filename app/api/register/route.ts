import User from '../../models/user';
import connect from '../../utils/db';
import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";

export const POST = async (request: any) => {
    const {name, email, password} = await request.json();

    await connect();

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return new NextResponse('User already exists', {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        return new NextResponse('User created successfully', {status: 200});
    } catch (err: any) {
        return new NextResponse(err, {status: 500});
    }
}