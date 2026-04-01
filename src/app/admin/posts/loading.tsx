import { Skeleton } from '@/components/atoms/Skeleton';
import { Card } from '@/components/atoms/Card';

export default function PostsLoading() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48 rounded-md" />
          <Skeleton className="h-5 w-64 rounded-md" />
        </div>
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>

      <Card className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between gap-4 bg-muted/20">
          <Skeleton className="h-10 w-full md:max-w-md rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-6 py-4 border-b border-border/50 child:last:border-0">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-full md:w-1/2 rounded-md" />
                <Skeleton className="h-4 w-1/3 rounded-md" />
              </div>
              <div className="hidden md:flex gap-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
