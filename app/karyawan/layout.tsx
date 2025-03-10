import EmployeeTemplate from "@/components/EmployeeTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Access by KAI",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <EmployeeTemplate>
            {children}
        </EmployeeTemplate>
    );
}
