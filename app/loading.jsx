import Skeleton from "@/shared/components/Skeleton";
import Card from "@/shared/components/Card";
import Container from "@/shared/components/Container";

export default function Loading() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5">
          <Skeleton variant="text" width={120} height={32} />
          <Skeleton variant="rounded" width={110} height={36} className="rounded-full" />
        </div>
      </header>

      <main>
        <Container>
          <div className="py-8 space-y-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Skeleton variant="rounded" width="100%" height={320} className="min-h-[160px] sm:min-h-[320px]" />
              <Skeleton variant="rounded" width="100%" height={320} className="min-h-[160px] sm:min-h-[320px]" />
            </div>

            <section>
              <Skeleton variant="text" width={220} height={24} className="mb-1" />
              <Skeleton variant="text" width={320} height={16} className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton variant="rounded" width="100%" height={320} className="min-h-[200px] sm:min-h-[320px]" />
                <Skeleton variant="rounded" width="100%" height={320} className="min-h-[200px] sm:min-h-[320px]" />
              </div>
            </section>

            <section>
              <Skeleton variant="text" width={180} height={20} className="mb-1" />
              <Skeleton variant="text" width={400} height={16} className="mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card
                    key={i}
                    className="p-4 sm:p-6 flex flex-col justify-between min-h-[160px] sm:min-h-[250px]"
                  >
                    <Skeleton variant="text" width={60} height={40} />
                    <div className="flex items-end justify-between mt-4 gap-2">
                      <Skeleton variant="text" width={70} height={16} />
                      <Skeleton variant="circular" width={28} height={28} />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>

      <footer className="w-full bg-white border-t border-gray-100 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <Skeleton variant="rounded" width="100%" height={120} />
        </div>
      </footer>
    </>
  );
}   
