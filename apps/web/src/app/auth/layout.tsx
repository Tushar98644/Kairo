import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";

interface Props {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <MaxWidthWrapper>
            <main className="mx-auto w-full relative">
                {children}
            </main>
        </MaxWidthWrapper>
    );
};

export default AuthLayout;