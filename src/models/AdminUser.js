import mongoose, { Schema } from "mongoose";

const AdminUserSchema = new Schema(
    {
        username: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "",
            enum: ["staff", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"],
        },
    },
    {
        timestamps: true,
    }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema, "admin");

export default AdminUser;
