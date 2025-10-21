import Image from "next/image"

export function Loading() {
  return (
    <div className="min-h-screen bg-accent grain-bg flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-pulse">
          <Image src="/logo.png" alt="Flexirent" width={200} height={80} className="h-20 w-auto opacity-80" />
        </div>
        <div className="w-16 h-1 bg-primary/30 rounded-full overflow-hidden">
          <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
