import { Skeleton } from '@/components/atoms/Skeleton';
import { Card } from '@/components/atoms/Card';

export default function EditPostLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md mb-2" />
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>

            <div className="pt-4 flex justify-between">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-12 w-40 rounded-xl" />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="glass" className="p-5 space-y-6">
            <Skeleton className="h-5 w-24 rounded-md mb-4" />
            <Skeleton className="h-12 w-full rounded-xl mb-4" />
            <Skeleton className="h-12 w-full rounded-xl mb-6" />

            <Skeleton className="h-5 w-32 rounded-md mb-4 mt-6" />
            <Skeleton className="h-32 w-full rounded-xl mb-4" />
            <Skeleton className="h-12 w-full rounded-xl mb-4" />
          </Card>
        </div>
      </div>
    </div>
  );
}
