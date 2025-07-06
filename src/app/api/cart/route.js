import { authenticateUser } from '../../../utils/middleware';
import Cart from '../../../models/Cart';
import { NextResponse } from 'next/server';

export async function POST(request) {

    const { success, user, message } = await authenticateUser();
    console.log(success);

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 })
    }

    const {
        quantity,
        cat_name,
        subcat_name,
        generices,
        product_code,
        product_name,
        url,
        genericname,
        brand,
        manufactuer,
        manufactueraddress,
        tabscount,
        strength,
        packageName,
        price,
        packing,
        product_img,
        description,
        disclaimer,
        stock,
        saleprice,
        percentage,
        rexrequired,
        orgin,
        storage,
        temperature,
        timestamp,
        writebyid,
        reviewbyid,
        faq,
        reference,
        metatitle,
        metakeyword,
        metadesc,
        varient,
        imagealt,
        vedio,
        vedioalt,
        userupdate,
        updatetimestamp,
        userid,
        date,
        referwebsite,
        keybenefits,
        keyingredients,
        expires,
        usesofmeds,
        useofbenefits,
        indicat,
        indication,
        mechanism,
        medicinework,
        contraindications,
        sideeffects,
        faqs,
        pregnancy,
        breastfeeding,
        kidneyproblem,
        liverdisease,
        heartdisease,
        asthma,
        takemedicine,
        adult,
        childrenmed,
        elderlymed,
        alcohol,
        driving,
        warnings,
        talkdoctor,
        instructions,
        druginteraction,
        drugfood,
        drugdiease,
        fooditems,
        overdose,
        misseddose,
        disposal,
        fasttag,
        refer,
        ingredients,
        direction,
        dosages,
        precaution,
        prostatus,
        paymenttype,
        retunpolicy,
        gst,
        hsn,
    } = await request.json();

    const isCart = await Cart.findOne({ product_name });
    if (isCart) {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: user?._id, product_name },
            { $inc: { quantity: 1 } },
            { new: true, upsert: false }
        );
        return NextResponse.json(updatedCart, { status: 200 })
    }

    try {
        // const existingItem = await Cart.find((item) => item.productId.toString() === productId);

        const mycart = new Cart({
            userId: user?._id,
            quantity,
            cat_name,
            subcat_name,
            generices,
            product_code,
            product_name,
            url,
            genericname,
            brand,
            manufactuer,
            manufactueraddress,
            tabscount,
            strength,
            packageName,
            price,
            packing,
            product_img,
            description,
            disclaimer,
            stock,
            saleprice,
            percentage,
            rexrequired,
            orgin,
            storage,
            temperature,
            timestamp,
            writebyid,
            reviewbyid,
            faq,
            reference,
            metatitle,
            metakeyword,
            metadesc,
            varient,
            imagealt,
            vedio,
            vedioalt,
            userupdate,
            updatetimestamp,
            userid,
            date,
            referwebsite,
            keybenefits,
            keyingredients,
            expires,
            usesofmeds,
            useofbenefits,
            indicat,
            indication,
            mechanism,
            medicinework,
            contraindications,
            sideeffects,
            faqs,
            pregnancy,
            breastfeeding,
            kidneyproblem,
            liverdisease,
            heartdisease,
            asthma,
            takemedicine,
            adult,
            childrenmed,
            elderlymed,
            alcohol,
            driving,
            warnings,
            talkdoctor,
            instructions,
            druginteraction,
            drugfood,
            drugdiease,
            fooditems,
            overdose,
            misseddose,
            disposal,
            fasttag,
            refer,
            ingredients,
            direction,
            dosages,
            precaution,
            prostatus,
            paymenttype,
            retunpolicy,
            gst,
            hsn,
        });


        await mycart.save();
        return NextResponse.json(mycart, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {
    const { success, user, message } = await authenticateUser();

    if (!success) {
        return NextResponse.json({ error: message }, { status: 401 })
    }

    const userWithCart = await Cart.find({ userId: user?._id });

    console.log(userWithCart);
    return NextResponse.json(userWithCart, { status: 200 })
    // if (!success) {
    //     return res.status(401).json({ message });
    // }

    // res.status(200).json({ cart: user.cart });
}