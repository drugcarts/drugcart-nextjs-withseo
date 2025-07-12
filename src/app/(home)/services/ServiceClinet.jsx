"use client"
import { IMAGES } from "@/components/common/images";
import { GetServicesService } from "@/services/drugService";
import { Box, Pagination, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Services = ({ pageNo: initialPage, serviceData, pagination }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Number(initialPage) || 1);
    const [categories, setCategories] = useState(serviceData || []); // For storing the fetched categories
    const [totalItems, setTotalItems] = useState(pagination.totalItems || 0); // Total items count
    const [totalPages, setTotalPages] = useState(pagination.totalPages || 1); // Total pages count
    const [limit, setLimit] = useState(12); // Set limit per page, adjust as needed

    useEffect(() => {
        router.replace(`/services?page=${currentPage}`)
    }, [])
    // Sync state with URL params whenever they change (including browser back/forward)
    useEffect(() => {
        const pageParam = parseInt(searchParams.get("page") || "1", 10);

        // Only update the state if the params change
        if (pageParam !== currentPage) setCurrentPage(pageParam);
    }, [searchParams]); // Only depend on `searchParams` for updates

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(
                    `/api/service?page=${currentPage}&limit=${limit}`
                );
                const data = await res.json();
                if (data) {
                    setCategories(data.services || []);
                    setTotalItems(data.pagination?.totalItems || 0);
                    setTotalPages(data.pagination?.totalPages || 1);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchServices();
    }, [currentPage, limit]);

    const handlePageChange = (_, value) => {
        setCurrentPage(value);
        router.push(`/services?page=${value}`, { scroll: false });
    };

    const serviceClick = (service_url) => {
        router.push(`/${service_url}`)
    }
    console.log('categories', categories);

    return (
        <>
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pb-20">
                    {categories &&
                        categories?.map((service, i) => (
                            <div
                                className="bg-bgshop rounded-lg p-4 cursor-pointer"
                                key={i}
                                onClick={() => serviceClick(service?.url)}
                            >
                                <p className="text-center">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={service?.image ? `https://assets3.drugcarts.com/admincolor/${service?.image}` : IMAGES.NO_IMAGE}
                                        alt={service?.title}
                                        className={`mb-3 mx-auto object-cover ${service?.image ? "bg-bgcancer" : null} rounded-full p-2`}
                                    />
                                    <span>{service?.title}</span>
                                </p>
                            </div>
                        ))}
                </div>
                <Box sx={{ mb: 2, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontFamily={"Poppins"}>
                        Showing {((currentPage - 1) * limit) + 1}–{Math.min(currentPage * limit, totalItems)} of {totalItems || 0} entries
                    </Typography>
                    <Pagination
                        size="large"
                        count={totalPages || 1}
                        page={currentPage}
                        color="secondary"
                        onChange={handlePageChange}
                    />
                </Box>
            </section>
        </>
    );
};

export default Services;
