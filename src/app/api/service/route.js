import { authenticateUser, adminAuthorization } from '../../../utils/middleware';
import Service from '../../../models/Service';
import { NextResponse } from 'next/server';
import connnectionToDatabase from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// export async function POST(request) {
//     try {
//         await connnectionToDatabase();
//         const { success, user, message } = await adminAuthorization();

//         if (!success) {
//             return NextResponse.json({ error: message }, { status: 401 })
//         }

//         const {
//             title,
//             image,
//             url,
//             orderno,
//             metatitle,
//             metadesc,
//             metakeyboard,
//         } = await request.json();

//         const isService = await Service.findOne({ title });
//         if (isService) {
//             return NextResponse.json({ error: 'Title already exist' }, { status: 401 })
//         }

//         const addService = new Service({
//             title,
//             image,
//             url,
//             orderno,
//             metatitle,
//             metadesc,
//             metakeyboard,
//         });

//         await addService.save();
//         return NextResponse.json(addService, { status: 200 })
//     } catch (error) {
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
//     }
// }

export async function GET(req) {
    try {
        await connnectionToDatabase();

        const ServiceItems = await Service.find({})
        return NextResponse.json(ServiceItems, { status: 200 });
    } catch (error) {
        console.error("Error fetching Service items:", error);
        return NextResponse.json(
            { error: "Failed to fetch Service items" },
            { status: 500 }
        );
    }
}