import "@/app/globals.css";
// import { jost, poppins } from "@/utils/fonts";
import { Providers } from "@/reduxToolkit/provider";
import CustomerLayout from "@/components/layout/CustomerLayout";

export default function HomeLayout({ children }) {
  return (
    <>
      {/* <html lang="en">
       <body className={`${jost.variable} ${poppins.variable} antialiased`}> */}
      <Providers>
        <CustomerLayout>{children}</CustomerLayout>
      </Providers>
      {/* </body>
    </html> */}
    </>
  );
}
