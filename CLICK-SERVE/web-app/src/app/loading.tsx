export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    )
}
