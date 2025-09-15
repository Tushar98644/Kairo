import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import { Toaster } from "@/components/ui/sonner";

interface Props {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper>
            <Toaster richColors theme="dark" position="top-right" />
            <main className="mx-auto w-full relative">
                {children}
            </main>
        </MaxWidthWrapper>
    );
};

export default AuthLayout;