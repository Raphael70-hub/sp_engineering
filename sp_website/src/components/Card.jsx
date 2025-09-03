function Card({ children, className }) {
    return (
        <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
            {children}
        </div>
    );
}

function CardContent({ children, className }) {
    return <div className={className}>{children}</div>;
}

export { Card, CardContent };
