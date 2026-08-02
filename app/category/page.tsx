import PromoBanner from '@/shared/components/PromoBanner';
import { Metadata } from 'next';
import Header from '@/shared/components/Header';
import { getCategories } from '@/shared/lib/api/categories';
import Link from 'next/link';
import CategoryCard from '@/features/category/components/CategoryCard';
import Grid from '@/shared/components/Grid'

export const metadata: Metadata = {
    title: 'Category Page',
    //   description: '...',
};

export default async function CategoryPage() {
    const categories = await getCategories();
    return <div>
        <Header />
        <section aria-label="Aksiyalar və kateqoriyalar" className="max-w-7xl mx-auto px-4 py-6 flex gap-4 items-start">
            <PromoBanner
                bgColor="#76CB4F"
                eyebrow="ONLİNE SİFARİŞ ET"
                number="15"
                badgeText="DƏQİQƏYƏ QAPINDA"
                image="/image/homebanner.svg"
                imageAlt="Çiyələk və süd"
                className="w-[330px]"
            />
            <Grid ariaLabel="Kateqoriyalar" columns={6}>
                {categories.map((category) => (
                    <Link key={category.id} href={`/category/${category.id}`}>
                        <CategoryCard
                            image={category.img_url}
                            label={category.name}
                        />
                    </Link>
                ))}
            </Grid>
        </section>
    </div>
}
