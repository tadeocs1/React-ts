import { Link } from "react-router-dom";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Sutues</title>
            <main>{children}</main>
        </>
    );
}