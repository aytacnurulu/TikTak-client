import PromoBanner from '@/shared/components/PromoBanner';
import { Metadata } from 'next';
import { getCategories } from '@/shared/lib/api/categories';
import Link from 'next/link';
import CategoryCard from '@/features/category/components/CategoryCard';
import Grid from '@/shared/components/Grid'
import { getSafeImageSrc } from '@/shared/lib/getSafeImageSrc'

export const metadata: Metadata = {
    title: 'Category Page',
    description:
        "Tik Tak-da bütün kateqoriyalara baxın və istədiyiniz məhsulları 15 dəqiqəyə qapınıza sifariş edin.",
    openGraph: {
        title: "Kateqoriyalar — Tik Tak",
        description:
            "Tik Tak-da bütün kateqoriyalara baxın və istədiyiniz məhsulları 15 dəqiqəyə qapınıza sifariş edin.",
    },
};

export default async function CategoryPage() {
    const categories = await getCategories();
    return  <section
      aria-label="Aksiyalar və kateqoriyalar"
      className="py-6 flex flex-col lg:flex-row gap-4 items-start"
    >
      <PromoBanner
        bgColor="#76CB4F"
        eyebrow="ONLİNE SİFARİŞ ET"
        number="15"
        badgeText="DƏQİQƏYƏ QAPINDA"
        image="/image/homebanner.svg"
        imageAlt="Çiyələk və süd"
        className="w-full lg:w-[330px] shrink-0"
      />

      <Grid ariaLabel="Kateqoriyalar" columns={6}>
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <CategoryCard image={getSafeImageSrc(category.img_url)} label={category.name} />
          </Link>
        ))}
      </Grid>
    </section>
}
