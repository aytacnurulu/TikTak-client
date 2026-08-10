import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

interface CategorySidebarProps {
  categories: Category[];
  currentCategoryId: number;
  className?: string;
  variant?: 'plain' | 'card';
}

export default function CategorySidebar({
  categories,
  currentCategoryId,
  className = '',
  variant = 'plain',
}: CategorySidebarProps) {
  const isCard = variant === 'card';

  return (
    <aside
      className={`${
        isCard ? 'bg-white rounded-[10px] border border-gray-100 shadow-sm p-6' : ''
      } ${className}`}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Kateqoriyalar
      </h2>
      <nav aria-label="Kateqoriyalar naviqasiyası">
        <ul
          className={`flex flex-col gap-2 ${
            isCard ? '' : 'rounded-xl bg-white p-3'
          }`}
        >
          {categories.map((category) => {
            const isActive = category.id === currentCategoryId;

            return (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
