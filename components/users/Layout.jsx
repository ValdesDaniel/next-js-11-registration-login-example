export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4 bg-white">
            <div className="container d-flex flex-column justify-content-center align-items-center gap-3 text-center">
                {children}
            </div>
        </div>
    );
}